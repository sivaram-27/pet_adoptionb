package com.petadoption.backend.service;

import com.petadoption.backend.dto.AuthResponse;
import com.petadoption.backend.dto.LoginRequest;
import com.petadoption.backend.dto.RegisterRequest;
import com.petadoption.backend.dto.UserDTO;
import com.petadoption.backend.model.Role;
import com.petadoption.backend.model.User;
import com.petadoption.backend.repository.UserRepository;
import com.petadoption.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        var user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        if (request.getRole() != null && request.getRole().equalsIgnoreCase("SELLER")) {
            user.setRole(Role.SELLER);
        } else {
            user.setRole(Role.USER);
        }

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return new AuthResponse(jwtToken, convertToDTO(user));
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        var user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

        var jwtToken = jwtService.generateToken(user);
        return new AuthResponse(jwtToken, convertToDTO(user));
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFirstName() + " " + user.getLastName());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setAddress(user.getAddress());
        dto.setRole(user.getRole().name());
        return dto;
    }
} 
 