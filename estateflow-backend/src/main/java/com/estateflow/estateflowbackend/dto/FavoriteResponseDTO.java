package com.estateflow.estateflowbackend.dto;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class FavoriteResponseDTO {

    private Long favoriteId;

    private Long propertyId;
    private String title;
    private String location;
    private BigDecimal price;
    private String propertyType;

    private String ownerEmail;

}