package com.example.controller

import com.example.domain.model.Student
import com.example.usecase.`interface`.IStudentUseCase
import com.example.usecase.interactor.StudentUsecase
import io.ktor.server.routing.Route
import io.ktor.server.locations.*
import io.ktor.server.application.*
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import org.kodein.di.*

@Location("/api/student")
class StudentApi {
    @Location("")
    class StudentGet
    class StudentCreate
}

private val injector = DI {
    bind<IStudentUseCase> { provider { StudentUsecase() }}
}
private val studentUsecase by injector.instance<IStudentUseCase>()

fun Route.students() {
    get<StudentApi.StudentGet> {
        println("# controller #")
        val message = studentUsecase.get()
        call.respondText(message)
        call.response.status(HttpStatusCode.OK)
    }
    post<StudentApi.StudentCreate> {
        val requestBody = call.receive<Student>()
        val res = studentUsecase.create(requestBody)
        call.response.status(HttpStatusCode.OK)
    }
}
