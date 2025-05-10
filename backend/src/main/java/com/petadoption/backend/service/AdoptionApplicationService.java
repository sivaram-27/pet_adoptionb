package com.petadoption.backend.service;

import com.petadoption.backend.dto.AdoptionApplicationDTO;
import com.petadoption.backend.model.AdoptionApplication;
import com.petadoption.backend.repository.AdoptionApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdoptionApplicationService {
    private final AdoptionApplicationRepository repository;

    public AdoptionApplicationDTO save(AdoptionApplicationDTO dto) {
        AdoptionApplication entity = toEntity(dto);
        AdoptionApplication saved = repository.save(entity);
        return toDTO(saved);
    }

    public List<AdoptionApplicationDTO> getAll() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    private AdoptionApplicationDTO toDTO(AdoptionApplication entity) {
        AdoptionApplicationDTO dto = new AdoptionApplicationDTO();
        dto.setId(entity.getId());
        dto.setPetId(entity.getPetId());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setEmail(entity.getEmail());
        dto.setPhone(entity.getPhone());
        dto.setAddress(entity.getAddress());
        dto.setCity(entity.getCity());
        dto.setState(entity.getState());
        dto.setZipCode(entity.getZipCode());
        dto.setHousingType(entity.getHousingType());
        dto.setHasYard(entity.getHasYard());
        dto.setRentOrOwn(entity.getRentOrOwn());
        dto.setLandlordContact(entity.getLandlordContact());
        dto.setHasPets(entity.getHasPets());
        dto.setCurrentPets(entity.getCurrentPets());
        dto.setPreviousPets(entity.getPreviousPets());
        dto.setVeterinarianContact(entity.getVeterinarianContact());
        dto.setHoursAway(entity.getHoursAway());
        dto.setExercise(entity.getExercise());
        dto.setActivities(entity.getActivities());
        dto.setAgreeToHome(entity.getAgreeToHome());
        dto.setAgreeToFollow(entity.getAgreeToFollow());
        dto.setAgreeToFinancial(entity.getAgreeToFinancial());
        dto.setSubmittedAt(entity.getSubmittedAt());
        return dto;
    }

    private AdoptionApplication toEntity(AdoptionApplicationDTO dto) {
        AdoptionApplication entity = new AdoptionApplication();
        entity.setId(dto.getId());
        entity.setPetId(dto.getPetId());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setAddress(dto.getAddress());
        entity.setCity(dto.getCity());
        entity.setState(dto.getState());
        entity.setZipCode(dto.getZipCode());
        entity.setHousingType(dto.getHousingType());
        entity.setHasYard(dto.getHasYard());
        entity.setRentOrOwn(dto.getRentOrOwn());
        entity.setLandlordContact(dto.getLandlordContact());
        entity.setHasPets(dto.getHasPets());
        entity.setCurrentPets(dto.getCurrentPets());
        entity.setPreviousPets(dto.getPreviousPets());
        entity.setVeterinarianContact(dto.getVeterinarianContact());
        entity.setHoursAway(dto.getHoursAway());
        entity.setExercise(dto.getExercise());
        entity.setActivities(dto.getActivities());
        entity.setAgreeToHome(dto.getAgreeToHome());
        entity.setAgreeToFollow(dto.getAgreeToFollow());
        entity.setAgreeToFinancial(dto.getAgreeToFinancial());
        entity.setSubmittedAt(dto.getSubmittedAt());
        return entity;
    }
} 