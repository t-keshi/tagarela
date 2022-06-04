package com.example.usecase.interactor

import com.example.database.`interface`.IStudentRepository
import com.example.database.repository.StudentRepository
import com.example.domain.model.Student
import com.example.usecase.`interface`.IStudentUseCase
import org.kodein.di.DI
import org.kodein.di.bind
import org.kodein.di.instance
import org.kodein.di.provider

private val injector = DI {
    bind<IStudentRepository> { provider { StudentRepository() }}
}
private val studentRepository by injector.instance<IStudentRepository>()

class StudentUsecase: IStudentUseCase {
    override fun create(student: Student) {
        println("hello from kotlin")
    }
    override fun get():String {
        println("# usecase #")
        val student = studentRepository.getStudent()
        return student.name
    }
}
