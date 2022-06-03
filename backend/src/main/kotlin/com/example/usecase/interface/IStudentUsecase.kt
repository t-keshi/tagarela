package com.example.usecase.`interface`

import com.example.domain.Student

interface IStudentUseCase{
    fun create(student: Student)
    fun get(): String
}