package com.petadoption.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class PetDTO {
    private Long id;
    
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Species is required")
    private String species;
    
    @NotBlank(message = "Breed is required")
    private String breed;
    
    @NotNull(message = "Age is required")
    private Integer age;
    
    @NotBlank(message = "Gender is required")
    private String gender;
    
    private String description;
    private String image;
    
    private String size;
    private String healthStatus;
    private String temperament;
    private String specialNeeds;
    private Double adoptionFee;
    private List<String> tags;
    private Boolean isAvailable = true;
    private UserDTO addedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 