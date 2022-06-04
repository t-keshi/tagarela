package com.example.usecase.models.responseModels

import kotlinx.serialization.Serializable

@Serializable
data class GetStudentOutput(
    val id: Int,
    val name: String,
    val password: String,
    val email: String
)