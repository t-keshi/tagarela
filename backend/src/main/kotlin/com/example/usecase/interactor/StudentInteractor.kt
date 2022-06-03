package com.example.usecase.interactor

import com.example.domain.Student
import com.example.usecase.`interface`.IStudentUseCase

class StudentUsecase: IStudentUseCase {
    override fun create(student: Student) {
        println("hello from kotlin")
    }
    override fun get():String {
        return "Hello from Kotlin!!!"
    }
}
