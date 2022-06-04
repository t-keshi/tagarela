package com.example.usecase.models.requestModels

data class CreateTopicInput(
    val content: String
)

data class IncrementLikesInput(
    val id: Int
)
