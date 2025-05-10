package com.petadoption.backend.service;

import com.petadoption.backend.dto.PetDTO;
import com.petadoption.backend.model.Pet;
import com.petadoption.backend.model.User;
import com.petadoption.backend.repository.PetRepository;
import com.petadoption.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class PetServiceTest {

    @Mock
    private PetRepository petRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private PetService petService;

    private User testUser;
    private Pet testPet;
    private PetDTO testPetDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Setup test user
        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
        testUser.setFirstName("Test");
        testUser.setLastName("User");

        // Setup test pet
        testPet = new Pet();
        testPet.setId(1L);
        testPet.setName("Test Pet");
        testPet.setSpecies("Dog");
        testPet.setBreed("Labrador");
        testPet.setAge(2);
        testPet.setGender("Male");
        testPet.setDescription("A friendly dog");
        testPet.setAddedBy(testUser);

        // Setup test pet DTO
        testPetDTO = new PetDTO();
        testPetDTO.setName("Test Pet");
        testPetDTO.setSpecies("Dog");
        testPetDTO.setBreed("Labrador");
        testPetDTO.setAge(2);
        testPetDTO.setGender("Male");
        testPetDTO.setDescription("A friendly dog");
    }

    @Test
    void createPet_Success() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(testUser));
        when(petRepository.save(any(Pet.class))).thenReturn(testPet);

        PetDTO result = petService.createPet(testPetDTO, "test@example.com");

        assertNotNull(result);
        assertEquals(testPetDTO.getName(), result.getName());
        assertEquals(testPetDTO.getSpecies(), result.getSpecies());
        verify(petRepository, times(1)).save(any(Pet.class));
    }

    @Test
    void getPetById_Success() {
        when(petRepository.findById(anyLong())).thenReturn(Optional.of(testPet));

        PetDTO result = petService.getPetById(1L);

        assertNotNull(result);
        assertEquals(testPet.getName(), result.getName());
        assertEquals(testPet.getSpecies(), result.getSpecies());
    }

    @Test
    void getPetById_NotFound() {
        when(petRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> petService.getPetById(1L));
    }
} 