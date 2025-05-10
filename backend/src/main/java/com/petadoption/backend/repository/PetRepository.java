package com.petadoption.backend.repository;

import com.petadoption.backend.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByIsAvailableTrue();
    
    @Query("SELECT p FROM Pet p WHERE " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.species) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.breed) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Pet> searchPets(@Param("query") String query);
    
    List<Pet> findByAddedById(Long userId);
} 