package com.estateflow.estateflowbackend.repository;

import com.estateflow.estateflowbackend.entity.Message;
import com.estateflow.estateflowbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByReceiver(User receiver);

    List<Message> findBySender(User sender);

    @Query("""
    SELECT m FROM Message m
    WHERE (
        (m.sender.id = :userId AND m.receiver.id = :otherUserId)
        OR
        (m.sender.id = :otherUserId AND m.receiver.id = :userId)
    )
    AND m.property.id = :propertyId
    ORDER BY m.createdAt ASC
    """)
    List<Message> findConversation(Long userId, Long otherUserId, Long propertyId);

    @Query("""
    SELECT m FROM Message m
    WHERE m.sender.id = :userId OR m.receiver.id = :userId
    ORDER BY m.createdAt DESC
    """)
    List<Message> findAllUserMessages(Long userId);
}