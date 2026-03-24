package com.estateflow.estateflowbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequestDTO {

    private String fullName;
    private String password;

}