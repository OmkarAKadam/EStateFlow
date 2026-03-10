package com.estateflow.estateflowbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageRequestDTO {

    private Long propertyId;
    private Long receiverId;
    private String content;

}