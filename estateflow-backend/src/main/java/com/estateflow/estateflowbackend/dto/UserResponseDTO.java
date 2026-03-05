package com.estateflow.estateflowbackend.dto;

import com.estateflow.estateflowbackend.entity.UserRole;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserResponseDTO {

    private Long id;
    private String fullName;
    private String email;
    private UserRole role;

}