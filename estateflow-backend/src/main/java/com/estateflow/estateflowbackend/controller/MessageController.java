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
}