package com.example.usecase.`interface`

import com.example.usecase.models.requestModels.CreateStudentInput
import com.example.usecase.models.responseModels.GetStudentOutput

interface IStudentUseCase{
    fun getStudent(): GetStudentOutput
    fun createStudent(studentInput: CreateStudentInput)
}