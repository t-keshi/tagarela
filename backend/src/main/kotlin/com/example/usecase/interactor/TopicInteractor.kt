package com.example.usecase.interactor

import com.example.database.`interface`.ITopicRepository
import com.example.database.repository.TopicRepository
import com.example.share.Logger
import com.example.usecase.`interface`.ITopicUseCase
import com.example.usecase.models.requestModels.CreateTopicInput
import com.example.usecase.models.requestModels.IncrementLikesInput
import com.example.usecase.models.responseModels.GetTopicsOutput
import org.kodein.di.DI
import org.kodein.di.bind
import org.kodein.di.instance
import org.kodein.di.provider

private val injector = DI {
    bind<ITopicRepository> { provider { TopicRepository() } }
}
private val topicRepository by injector.instance<ITopicRepository>()

class TopicUsecase : ITopicUseCase {
    override fun getTopics(): List<GetTopicsOutput> {
        Logger().log("### usecase ###", "info")

        val topics = topicRepository.getTopics()
        return topics.map { GetTopicsOutput(it.id, it.content, it.likes) }
    }

    override fun createTopic(input: CreateTopicInput) {
        Logger().log("### usecase ###", "info")

        topicRepository.createTopic(input.content)
    }

    override fun incrementLikes(input: IncrementLikesInput) {
        Logger().log("### usecase ###", "info")

        topicRepository.incrementLikes(input.id)
    }
}
