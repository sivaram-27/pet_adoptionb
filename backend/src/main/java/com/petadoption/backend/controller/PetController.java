package com.petadoption.backend.controller;

import com.petadoption.backend.dto.PetDTO;
import com.petadoption.backend.service.PetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://pet-adoptionf.vercel.app")
public class PetController {
    private final PetService petService;
    private static final Logger logger = LoggerFactory.getLogger(PetController.class);

    @GetMapping
    public ResponseEntity<List<PetDTO>> getAllPets() {
        return ResponseEntity.ok(petService.getAllPets());
    }

    @GetMapping("/search")
    public ResponseEntity<List<PetDTO>> searchPets(@RequestParam String query) {
        return ResponseEntity.ok(petService.searchPets(query));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetDTO> getPetById(@PathVariable Long id) {
        return ResponseEntity.ok(petService.getPetById(id));
    }

    @PostMapping
    public ResponseEntity<PetDTO> createPet(
            @Valid @RequestBody PetDTO petDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        logger.info("POST /api/pets called by user: {}", userDetails != null ? userDetails.getUsername() : "null");
        logger.info("Received PetDTO: {}", petDTO);
        return ResponseEntity.ok(petService.createPet(petDTO, userDetails.getUsername()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetDTO> updatePet(
            @PathVariable Long id,
            @Valid @RequestBody PetDTO petDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(petService.updatePet(id, petDTO, userDetails.getUsername()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        petService.deletePet(id, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        String imageUrl = petService.handleImageUpload(file);
        return ResponseEntity.ok(imageUrl);
    }

    @GetMapping("/mine")
    public ResponseEntity<List<PetDTO>> getMyPets(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(petService.getPetsBySeller(userDetails.getUsername()));
    }
} 