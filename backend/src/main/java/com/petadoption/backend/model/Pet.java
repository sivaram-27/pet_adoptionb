package com.petadoption.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "pets")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String species;

    @NotBlank
    private String breed;

    @NotNull
    private Integer age;

    @NotBlank
    private String gender;

    @Column(length = 1000)
    private String description;

    @Column(columnDefinition = "TEXT")
    private String image;

    private String size;
    private String healthStatus;
    private String temperament;
    private String specialNeeds;
    private Double adoptionFee;

    @ElementCollection
    @CollectionTable(name = "pet_tags", joinColumns = @JoinColumn(name = "pet_id"))
    @Column(name = "tag")
    private List<String> tags;

    @NotNull
    private Boolean isAvailable = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "added_by")
    private User addedBy;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
} 