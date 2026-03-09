package com.estateflow.estateflowbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PropertyImageResponseDTO {

    private Long id;
    private String imageUrl;

    private Long propertyId;
    private String propertyTitle;
}