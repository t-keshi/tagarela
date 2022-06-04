package com.example.usecase.interactor

import com.example.database.`interface`.IStudentRepository
import com.example.database.repository.StudentRepository
import com.example.domain.model.Student
import com.example.share.Logger
import com.example.usecase.`interface`.IStudentUseCase
import com.example.usecase.models.requestModels.CreateStudentInput
import com.example.usecase.models.responseModels.GetStudentOutput
import org.kodein.di.DI
import org.kodein.di.bind
import org.kodein.di.instance
import org.kodein.di.provider

private val injector = DI {
    bind<IStudentRepository> { provider { StudentRepository() } }
}
private val studentRepository by injector.instance<IStudentRepository>()

class StudentUsecase : IStudentUseCase {
    override fun getStudent(): GetStudentOutput {
        Logger().log("### usecase ###", "info")

        val student: Student = studentRepository.getStudent()
        return GetStudentOutput(
            id = student.id,
            name = student.name,
            password = student.password,
            email = student.email
        )
    }


    override fun createStudent(input: CreateStudentInput) {
        Logger().log("### usecase ###", "info")

        studentRepository.createStudent(
            name = input.name,
            password = input.password,
            email = input.email
        )
    }
}
