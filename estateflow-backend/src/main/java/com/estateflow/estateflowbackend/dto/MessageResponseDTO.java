package com.estateflow.estateflowbackend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MessageResponseDTO {

    private Long id;
    private String content;

    private String senderName;
    private String receiverName;


    private String senderEmail;
    private String receiverEmail;

    private Long propertyId;
    private String propertyTitle;
    private Long senderId;
    private Long receiverId;
    private Boolean isRead;
    private LocalDateTime createdAt;
}