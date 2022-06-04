package com.example.controller

import com.example.share.Logger
import com.example.usecase.`interface`.ITopicUseCase
import com.example.usecase.interactor.TopicUsecase
import com.example.usecase.models.requestModels.CreateTopicInput
import com.example.usecase.models.requestModels.IncrementLikesInput
import com.example.usecase.models.responseModels.GetTopicsOutput
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.locations.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.Route
import kotlinx.serialization.Serializable
import org.kodein.di.DI
import org.kodein.di.bind
import org.kodein.di.instance
import org.kodein.di.provider

@Location("/api/topics")
class TopicApi {
    @Location("")
    class TopicsGet

    @Location("")
    class TopicCreate

    @Location("/{topicId}/likes")
    class IncrementLikes(val topicId: Int)
}

private val injector = DI {
    bind<ITopicUseCase> { provider { TopicUsecase() } }
}
private val topicUsecase by injector.instance<ITopicUseCase>()

fun Route.topics() {
    get<TopicApi.TopicsGet> {
        Logger().log("### controller ###", "info")

        val topicsOutput: List<GetTopicsOutput> = topicUsecase.getTopics()
        call.response.status(HttpStatusCode.OK)
        call.respond(topicsOutput)
    }

    post<TopicApi.TopicCreate> {
        Logger().log("### controller ###", "info")

        val reqBody = call.receive<TopicReqBody>()
        topicUsecase.createTopic(
            CreateTopicInput(
                content = reqBody.content
            )
        )
        call.respond(HttpStatusCode.OK)
    }

    post<TopicApi.IncrementLikes> {
        Logger().log("### controller ###", "info")

        topicUsecase.incrementLikes(
            IncrementLikesInput(
                id = it.topicId
            )
        )
        call.respond(HttpStatusCode.OK)
    }
}

@Serializable
private data class TopicReqBody(
    val content: String,
)