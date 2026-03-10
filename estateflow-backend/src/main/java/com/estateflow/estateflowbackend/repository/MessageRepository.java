package com.estateflow.estateflowbackend.repository;

import com.estateflow.estateflowbackend.entity.Message;
import com.estateflow.estateflowbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByReceiver(User receiver);

    List<Message> findBySender(User sender);
}