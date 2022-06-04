package com.example.database.`interface`

import com.example.domain.model.Topic

interface ITopicRepository {
    fun getTopics(): List<Topic>
    fun createTopic(content: String)
    fun incrementLikes(id: Int)
}