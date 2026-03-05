package com.estateflow.estateflowbackend.auth;

import com.estateflow.estateflowbackend.dto.LoginRequestDTO;
import com.estateflow.estateflowbackend.dto.LoginResponseDTO;
import com.estateflow.estateflowbackend.dto.RegisterRequestDTO;
import com.estateflow.estateflowbackend.dto.RegisterResponseDTO;
import com.estateflow.estateflowbackend.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request) {

        String token = userService.login(
                request.getEmail(),
                request.getPassword()
        );

        return new LoginResponseDTO(token);
    }

    @PostMapping("/register")
    public RegisterResponseDTO register(@RequestBody RegisterRequestDTO request) {
        return userService.registerUser(request);
    }
}