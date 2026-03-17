package com.estateflow.estateflowbackend.controller;

import com.estateflow.estateflowbackend.dto.MessageRequestDTO;
import com.estateflow.estateflowbackend.dto.MessageResponseDTO;
import com.estateflow.estateflowbackend.service.MessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public MessageResponseDTO sendMessage(@RequestBody MessageRequestDTO request) {
        return messageService.sendMessage(request);
    }

    @GetMapping("/all")
    public List<MessageResponseDTO> getAllUserMessages() {
        return messageService.getAllUserMessages();
    }

    @GetMapping("/inbox")
    public List<MessageResponseDTO> getInbox() {
        return messageService.getInbox();
    }

    @GetMapping("/sent")
    public List<MessageResponseDTO> getSent() {
        return messageService.getSent();
    }

    @PutMapping("/{id}/read")
    public void markAsRead(@PathVariable Long id) {
        messageService.markAsRead(id);
    }

    @GetMapping("/conversation")
    public List<MessageResponseDTO> getConversation(
            @RequestParam Long userId,
            @RequestParam Long propertyId) {

        return messageService.getConversation(userId, propertyId);
    }
}