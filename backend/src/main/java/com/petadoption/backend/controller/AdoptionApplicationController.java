package com.petadoption.backend.controller;

import com.petadoption.backend.dto.AdoptionApplicationDTO;
import com.petadoption.backend.service.AdoptionApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adoptions")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://pet-adoptionf.vercel.app")
public class AdoptionApplicationController {
    private final AdoptionApplicationService service;

    @PostMapping
    public ResponseEntity<AdoptionApplicationDTO> submit(@RequestBody AdoptionApplicationDTO dto) {
        return ResponseEntity.ok(service.save(dto));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AdoptionApplicationDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
} 