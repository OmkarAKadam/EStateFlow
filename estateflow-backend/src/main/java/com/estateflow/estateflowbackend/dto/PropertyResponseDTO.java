package com.estateflow.estateflowbackend.dto;

import com.estateflow.estateflowbackend.entity.PropertyType;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class PropertyResponseDTO {

    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private String location;
    private PropertyType propertyType;
    private Integer bedrooms;
    private Integer bathrooms;
    private Long ownerId;
    private String ownerEmail;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
