package com.example.controller

import com.example.share.Logger
import com.example.usecase.`interface`.IStudentUseCase
import com.example.usecase.interactor.StudentUsecase
import com.example.usecase.models.requestModels.CreateStudentInput
import com.example.usecase.models.responseModels.GetStudentOutput
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

@Location("/api/student")
class StudentApi {
    @Location("")
    class StudentGet

    @Location("")
    class StudentCreate
}

private val injector = DI {
    bind<IStudentUseCase> { provider { StudentUsecase() } }
}
private val studentUsecase by injector.instance<IStudentUseCase>()

fun Route.students() {
    get<StudentApi.StudentGet> {
        Logger().log("### controller ###", "info")

        val studentOutput: GetStudentOutput = studentUsecase.getStudent()
        call.response.status(HttpStatusCode.OK)
        call.respond(studentOutput)
    }

    post<StudentApi.StudentCreate> {
        Logger().log("### controller ###", "info")

        val reqBody = call.receive<StudentReqBody>()
        studentUsecase.createStudent(
            CreateStudentInput(
                name = reqBody.name,
                password = reqBody.password,
                email = reqBody.email
            )
        )
        call.respond(HttpStatusCode.OK)
    }
}

@Serializable
private data class StudentReqBody(
    val name: String,
    val password: String,
    val email: String
)