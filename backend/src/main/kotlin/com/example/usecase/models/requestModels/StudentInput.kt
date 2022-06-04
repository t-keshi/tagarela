package com.example.usecase.models.requestModels

data class CreateStudentInput(
    val name: String,
    val password: String,
    val email: String
)
