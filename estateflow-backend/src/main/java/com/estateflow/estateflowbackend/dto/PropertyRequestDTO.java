package com.estateflow.estateflowbackend.dto;

import com.estateflow.estateflowbackend.entity.PropertyType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PropertyRequestDTO {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    @Positive
    private BigDecimal price;

    @NotBlank
    private String location;

    private PropertyType propertyType;
    private Integer bedrooms;
    private Integer bathrooms;

}