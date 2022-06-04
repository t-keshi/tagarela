package com.example.usecase.`interface`

import com.example.usecase.models.requestModels.CreateTopicInput
import com.example.usecase.models.requestModels.IncrementLikesInput
import com.example.usecase.models.responseModels.GetTopicsOutput

interface ITopicUseCase {
    fun getTopics(): List<GetTopicsOutput>
    fun createTopic(input: CreateTopicInput)
    fun incrementLikes(input: IncrementLikesInput)
}