package com.petadoption.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AdoptionApplicationDTO {
    private Long id;
    private Long petId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String housingType;
    private String hasYard;
    private String rentOrOwn;
    private String landlordContact;
    private String hasPets;
    private String currentPets;
    private String previousPets;
    private String veterinarianContact;
    private String hoursAway;
    private String exercise;
    private String activities;
    private Boolean agreeToHome;
    private Boolean agreeToFollow;
    private Boolean agreeToFinancial;
    private LocalDateTime submittedAt;
} 