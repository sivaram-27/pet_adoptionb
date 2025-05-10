package com.petadoption.backend.service;

import com.petadoption.backend.dto.PetDTO;
import com.petadoption.backend.model.Pet;
import com.petadoption.backend.model.User;
import com.petadoption.backend.model.Role;
import com.petadoption.backend.dto.UserDTO;
import com.petadoption.backend.repository.PetRepository;
import com.petadoption.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PetService {
    private final PetRepository petRepository;
    private final UserRepository userRepository;

    @Transactional
    public PetDTO createPet(PetDTO petDTO, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Pet pet = new Pet();
        updatePetFromDTO(pet, petDTO);
        pet.setAddedBy(user);
        
        Pet savedPet = petRepository.save(pet);
        return convertToDTO(savedPet);
    }

    public List<PetDTO> getAllPets() {
        return petRepository.findByIsAvailableTrue().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public List<PetDTO> searchPets(String query) {
        return petRepository.searchPets(query).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public PetDTO getPetById(Long id) {
        Pet pet = petRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pet not found"));
        return convertToDTO(pet);
    }

    @Transactional
    public PetDTO updatePet(Long id, PetDTO petDTO, String userEmail) {
        Pet pet = petRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pet not found"));

        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (!pet.getAddedBy().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new RuntimeException("Not authorized to update this pet");
        }

        updatePetFromDTO(pet, petDTO);
        Pet updatedPet = petRepository.save(pet);
        return convertToDTO(updatedPet);
    }

    @Transactional
    public void deletePet(Long id, String userEmail) {
        Pet pet = petRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pet not found"));

        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (!pet.getAddedBy().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new RuntimeException("Not authorized to delete this pet");
        }

        petRepository.delete(pet);
    }

    public String handleImageUpload(MultipartFile file) {
        try {
            return Base64.getEncoder().encodeToString(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Failed to process image upload", e);
        }
    }

    private void updatePetFromDTO(Pet pet, PetDTO dto) {
        pet.setName(dto.getName());
        pet.setSpecies(dto.getSpecies());
        pet.setBreed(dto.getBreed());
        pet.setAge(dto.getAge());
        pet.setGender(dto.getGender());
        pet.setDescription(dto.getDescription());
        pet.setImage(dto.getImage());
        pet.setSize(dto.getSize());
        pet.setHealthStatus(dto.getHealthStatus());
        pet.setTemperament(dto.getTemperament());
        pet.setSpecialNeeds(dto.getSpecialNeeds());
        pet.setAdoptionFee(dto.getAdoptionFee());
        pet.setTags(dto.getTags());
        pet.setIsAvailable(dto.getIsAvailable());
    }

    private PetDTO convertToDTO(Pet pet) {
        PetDTO dto = new PetDTO();
        dto.setId(pet.getId());
        dto.setName(pet.getName());
        dto.setSpecies(pet.getSpecies());
        dto.setBreed(pet.getBreed());
        dto.setAge(pet.getAge());
        dto.setGender(pet.getGender());
        dto.setDescription(pet.getDescription());
        dto.setImage(pet.getImage());
        dto.setSize(pet.getSize());
        dto.setHealthStatus(pet.getHealthStatus());
        dto.setTemperament(pet.getTemperament());
        dto.setSpecialNeeds(pet.getSpecialNeeds());
        dto.setAdoptionFee(pet.getAdoptionFee());
        dto.setTags(pet.getTags());
        dto.setIsAvailable(pet.getIsAvailable());
        dto.setCreatedAt(pet.getCreatedAt());
        dto.setUpdatedAt(pet.getUpdatedAt());
        
        if (pet.getAddedBy() != null) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(pet.getAddedBy().getId());
            userDTO.setEmail(pet.getAddedBy().getEmail());
            userDTO.setFullName(pet.getAddedBy().getFirstName() + " " + pet.getAddedBy().getLastName());
            dto.setAddedBy(userDTO);
        }
        
        return dto;
    }

    public List<PetDTO> getPetsBySeller(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return petRepository.findByAddedById(user.getId()).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
} 