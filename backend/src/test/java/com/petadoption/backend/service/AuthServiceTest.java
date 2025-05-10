package com.petadoption.backend.service;

import com.petadoption.backend.dto.AuthResponse;
import com.petadoption.backend.dto.LoginRequest;
import com.petadoption.backend.dto.RegisterRequest;
import com.petadoption.backend.model.Role;
import com.petadoption.backend.model.User;
import com.petadoption.backend.repository.UserRepository;
import com.petadoption.backend.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthService authService;

    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;
    private User testUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Setup register request
        registerRequest = new RegisterRequest();
        registerRequest.setEmail("test@example.com");
        registerRequest.setPassword("password123");
        registerRequest.setConfirmPassword("password123");
        registerRequest.setFirstName("Test");
        registerRequest.setLastName("User");

        // Setup login request
        loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password123");

        // Setup test user
        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
        testUser.setFirstName("Test");
        testUser.setLastName("User");
        testUser.setRole(Role.USER);
    }

    @Test
    void register_Success() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        when(jwtService.generateToken(any(User.class))).thenReturn("testToken");

        AuthResponse response = authService.register(registerRequest);

        assertNotNull(response);
        assertEquals("testToken", response.getToken());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void register_EmailExists() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(testUser));

        assertThrows(RuntimeException.class, () -> authService.register(registerRequest));
    }

    @Test
    void login_Success() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(testUser));
        when(jwtService.generateToken(any(User.class))).thenReturn("testToken");

        AuthResponse response = authService.login(loginRequest);

        assertNotNull(response);
        assertEquals("testToken", response.getToken());
        verify(authenticationManager, times(1)).authenticate(any());
    }
} 