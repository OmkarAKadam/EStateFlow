package com.estateflow.estateflowbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterResponseDTO {

    private Long id;
    private String fullName;
    private String email;
    private String role;

}