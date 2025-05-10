package com.petadoption.backend.repository;

import com.petadoption.backend.model.AdoptionApplication;
import org.springframework.data.jpa.repository.JpaRepository;
 
public interface AdoptionApplicationRepository extends JpaRepository<AdoptionApplication, Long> {
} 