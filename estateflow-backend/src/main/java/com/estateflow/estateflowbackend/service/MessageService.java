package com.estateflow.estateflowbackend.service;

import com.estateflow.estateflowbackend.dto.MessageRequestDTO;
import com.estateflow.estateflowbackend.dto.MessageResponseDTO;
import com.estateflow.estateflowbackend.entity.Message;
import com.estateflow.estateflowbackend.entity.Property;
import com.estateflow.estateflowbackend.entity.User;
import com.estateflow.estateflowbackend.exception.ResourceNotFoundException;
import com.estateflow.estateflowbackend.exception.UnauthorizedException;
import com.estateflow.estateflowbackend.repository.MessageRepository;
import com.estateflow.estateflowbackend.repository.PropertyRepository;
import com.estateflow.estateflowbackend.repository.UserRepository;
import com.estateflow.estateflowbackend.util.AuthUtil;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final AuthUtil authUtil;

    public MessageService(MessageRepository messageRepository,
                          UserRepository userRepository,
                          PropertyRepository propertyRepository,
                          AuthUtil authUtil) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.propertyRepository = propertyRepository;
        this.authUtil = authUtil;
    }

    public MessageResponseDTO sendMessage(MessageRequestDTO request) {

        User sender = getCurrentUser();

        User receiver = userRepository.findById(request.getReceiverId())
                .orElseThrow(() -> new ResourceNotFoundException("Receiver not found"));

        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setProperty(property);
        message.setContent(request.getContent());

        return mapToResponse(messageRepository.save(message));
    }

    public List<MessageResponseDTO> getInbox() {

        User receiver = getCurrentUser();

        return messageRepository.findByReceiver(receiver)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<MessageResponseDTO> getSent() {

        User sender = getCurrentUser();

        return messageRepository.findBySender(sender)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<MessageResponseDTO> getAllUserMessages() {

        User user = getCurrentUser();

        return messageRepository
                .findAllUserMessages(user.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public void markAsRead(Long id) {

        User currentUser = getCurrentUser();

        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found"));

        if (!message.getReceiver().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("Not allowed to mark this message");
        }

        message.setIsRead(true);
        messageRepository.save(message);
    }

    public List<MessageResponseDTO> getConversation(Long otherUserId, Long propertyId) {

        User currentUser = getCurrentUser();

        return messageRepository
                .findConversation(currentUser.getId(), otherUserId, propertyId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private User getCurrentUser() {

        String email = authUtil.getCurrentUserEmail();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private MessageResponseDTO mapToResponse(Message message) {

        MessageResponseDTO dto = new MessageResponseDTO();

        dto.setId(message.getId());
        dto.setContent(message.getContent());
        dto.setSenderEmail(message.getSender().getEmail());
        dto.setReceiverEmail(message.getReceiver().getEmail());
        dto.setSenderName(message.getSender().getFullName());
        dto.setReceiverName(message.getReceiver().getFullName());
        dto.setPropertyId(message.getProperty().getId());
        dto.setPropertyTitle(message.getProperty().getTitle());
        dto.setSenderId(message.getSender().getId());
        dto.setReceiverId(message.getReceiver().getId());
        dto.setIsRead(message.getIsRead());
        dto.setCreatedAt(message.getCreatedAt());

        return dto;
    }
}