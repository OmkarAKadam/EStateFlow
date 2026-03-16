package com.estateflow.estateflowbackend.service;

import com.estateflow.estateflowbackend.dto.MessageRequestDTO;
import com.estateflow.estateflowbackend.dto.MessageResponseDTO;
import com.estateflow.estateflowbackend.entity.Message;
import com.estateflow.estateflowbackend.entity.Property;
import com.estateflow.estateflowbackend.entity.User;
import com.estateflow.estateflowbackend.repository.MessageRepository;
import com.estateflow.estateflowbackend.repository.PropertyRepository;
import com.estateflow.estateflowbackend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;

    public MessageService(MessageRepository messageRepository,
                          UserRepository userRepository,
                          PropertyRepository propertyRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.propertyRepository = propertyRepository;
    }

    public MessageResponseDTO sendMessage(MessageRequestDTO request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User sender = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        User receiver = userRepository.findById(request.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found"));

        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setProperty(property);
        message.setContent(request.getContent());

        Message saved = messageRepository.save(message);

        return mapToResponse(saved);
    }

    public List<MessageResponseDTO> getInbox() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User receiver = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return messageRepository.findByReceiver(receiver)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<MessageResponseDTO> getSent() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User sender = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return messageRepository.findBySender(sender)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public void markAsRead(Long id) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        if (!message.getReceiver().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }

        message.setIsRead(true);

        messageRepository.save(message);
    }

    private MessageResponseDTO mapToResponse(Message message) {

        MessageResponseDTO dto = new MessageResponseDTO();

        dto.setId(message.getId());
        dto.setContent(message.getContent());
        dto.setSenderEmail(message.getSender().getEmail());
        dto.setReceiverEmail(message.getReceiver().getEmail());
        dto.setPropertyId(message.getProperty().getId());
        dto.setSenderId(message.getSender().getId());
        dto.setReceiverId(message.getReceiver().getId());
        dto.setIsRead(message.getIsRead());
        dto.setCreatedAt(message.getCreatedAt());

        return dto;
    }

    public List<MessageResponseDTO> getConversation(Long otherUserId, Long propertyId) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return messageRepository
                .findConversation(currentUser.getId(), otherUserId, propertyId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
}