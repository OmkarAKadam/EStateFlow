package com.estateflow.estateflowbackend.controller;

import com.estateflow.estateflowbackend.dto.PropertyRequestDTO;
import com.estateflow.estateflowbackend.dto.PropertyResponseDTO;
import com.estateflow.estateflowbackend.entity.Property;
import com.estateflow.estateflowbackend.entity.PropertyType;
import com.estateflow.estateflowbackend.service.PropertyService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @PostMapping
    public PropertyResponseDTO createProperty(
            @Valid @RequestBody PropertyRequestDTO request) {
        return propertyService.createProperty(request);
    }

    @PutMapping("/{id}")
    public PropertyResponseDTO updateProperty(
            @PathVariable Long id,
            @Valid @RequestBody PropertyRequestDTO request) {

        return propertyService.updateProperty(id, request);
    }

    @GetMapping
    public Page<PropertyResponseDTO> getAllProperties(Pageable pageable) {
        return propertyService.getAllProperties(pageable);
    }

    @GetMapping("/my-properties")
    public List<PropertyResponseDTO> getMyProperties() {
        return propertyService.getMyProperties();
    }

    @GetMapping("/{id}")
    public PropertyResponseDTO getPropertyById(@PathVariable Long id) {
        return propertyService.getPropertyById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
    }

    @GetMapping("/search/location")
    public List<PropertyResponseDTO> searchByLocation(@RequestParam String location) {
        return propertyService.searchByLocation(location);
    }

    @GetMapping("/search/price")
    public List<PropertyResponseDTO> searchByPrice(
            @RequestParam BigDecimal min,
            @RequestParam BigDecimal max) {
        return propertyService.searchByPriceRange(min, max);
    }

    @GetMapping("/search/type")
    public List<PropertyResponseDTO> searchByType(@RequestParam PropertyType type) {
        return propertyService.searchByType(type);
    }
}