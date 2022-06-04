package com.example.usecase.models.responseModels

import kotlinx.serialization.Serializable

@Serializable
data class GetTopicsOutput(
    val id: Int,
    val content: String,
    val likes: Int
)