package com.estateflow.estateflowbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageResponseDTO {

    private Long id;
    private String content;

    private String senderEmail;
    private String receiverEmail;

    private Long propertyId;

    private Boolean isRead;
}