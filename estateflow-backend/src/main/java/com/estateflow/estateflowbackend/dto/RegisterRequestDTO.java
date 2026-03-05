package com.estateflow.estateflowbackend.dto;

import com.estateflow.estateflowbackend.entity.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDTO {

    private String fullName;
    private String email;
    private String password;
    private UserRole role;

}