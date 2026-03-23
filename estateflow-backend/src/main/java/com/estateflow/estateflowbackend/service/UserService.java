package com.estateflow.estateflowbackend.service;

import com.estateflow.estateflowbackend.dto.*;
import com.estateflow.estateflowbackend.entity.User;
import com.estateflow.estateflowbackend.entity.UserRole;
import com.estateflow.estateflowbackend.exception.ResourceNotFoundException;
import com.estateflow.estateflowbackend.repository.UserRepository;
import com.estateflow.estateflowbackend.security.JwtService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public RegisterResponseDTO registerUser(RegisterRequestDTO request) {

        validateEmailNotExists(request.getEmail());

        User user = buildUser(
                request.getFullName(),
                request.getEmail(),
                request.getPassword(),
                request.getRole()
        );

        return mapToRegisterResponse(userRepository.save(user));
    }

    public String login(String email, String password) {

        User user = userRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtService.generateToken(user.getEmail(), user.getRole().name());
    }

    public UserResponseDTO createUser(UserRequestDTO request) {

        validateEmailNotExists(request.getEmail());

        User user = buildUser(
                request.getFullName(),
                request.getEmail(),
                request.getPassword(),
                request.getRole()
        );

        return mapToResponse(userRepository.save(user));
    }

    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public UserResponseDTO getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return mapToResponse(user);
    }

    private User buildUser(String name, String email, String password, UserRole role) {

        User user = new User();

        user.setFullName(name.trim());
        user.setEmail(email.trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);

        return user;
    }

    private void validateEmailNotExists(String email) {

        String normalizedEmail = email.trim().toLowerCase();

        if (userRepository.findByEmail(normalizedEmail).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
    }

    private RegisterResponseDTO mapToRegisterResponse(User user) {

        RegisterResponseDTO response = new RegisterResponseDTO();

        response.setId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().name());

        return response;
    }

    private UserResponseDTO mapToResponse(User user) {

        UserResponseDTO response = new UserResponseDTO();

        response.setId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());

        return response;
    }
}