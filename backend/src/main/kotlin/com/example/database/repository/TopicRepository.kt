package com.example.database.repository

import com.example.database.DatabaseManager
import com.example.database.`interface`.ITopicRepository
import com.example.domain.model.Topic
import com.example.share.Logger
import org.ktorm.dsl.eq
import org.ktorm.dsl.insert
import org.ktorm.dsl.plus
import org.ktorm.dsl.update
import org.ktorm.entity.Entity
import org.ktorm.entity.map
import org.ktorm.entity.sequenceOf
import org.ktorm.schema.Table
import org.ktorm.schema.int
import org.ktorm.schema.varchar

interface TopicEntity : Entity<TopicEntity> {
    companion object : Entity.Factory<TopicEntity>()

    val id: Int
    val content: String
    val likes: Int
}

object TopicsTable : Table<TopicEntity>("topics") {
    val id = int("id").primaryKey().bindTo { it.id }
    val content = varchar("content").bindTo { it.content }
    val likes = int("likes").bindTo { it.likes }
}

class TopicRepository : ITopicRepository {
    private val db = DatabaseManager().dbInstance

    override fun getTopics(): List<Topic> {
        Logger().log("### database ###", "info")

        try {
            return db.sequenceOf(TopicsTable).map { Topic(it.id, it.content, it.likes) }
        } catch (e: Exception) {
            throw IllegalStateException("failed to get student")
        }
    }

    override fun createTopic(content: String) {
        Logger().log("### database ###", "info")

        try {
            db.insert(TopicsTable) {
                set(it.content, content)
                set(it.likes, 0)
            }
        } catch (e: Exception) {
            Logger().log("content: $content")
            throw IllegalStateException("failed to create student")
        }
    }

    override fun incrementLikes(id: Int) {
        Logger().log("### database ###", "info")

        try {
            db.update(TopicsTable) {
                set(it.likes, it.likes + 1)
                where {
                    it.id eq id
                }
            }
        } catch (e: Exception) {
            Logger().log("id: $id")
            throw IllegalStateException("failed to create student")
        }
    }
}

