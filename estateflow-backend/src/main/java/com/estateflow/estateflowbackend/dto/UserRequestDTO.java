package com.estateflow.estateflowbackend.dto;

import com.estateflow.estateflowbackend.entity.UserRole;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserRequestDTO {

    private String fullName;
    private String email;
    private String password;
    private UserRole role;

}