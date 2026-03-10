package com.estateflow.estateflowbackend.controller;

import com.estateflow.estateflowbackend.dto.PropertyImageResponseDTO;
import com.estateflow.estateflowbackend.entity.PropertyImage;
import com.estateflow.estateflowbackend.service.PropertyImageService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/property-images")
public class PropertyImageController {

    private final PropertyImageService imageService;

    public PropertyImageController(PropertyImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/{propertyId}")
    public PropertyImageResponseDTO uploadPropertyImage(
            @PathVariable Long propertyId,
            @RequestParam("file") MultipartFile file) throws IOException {

        return imageService.uploadPropertyImage(propertyId, file);
    }

    @GetMapping("/property/{propertyId}")
    public List<PropertyImageResponseDTO> getImagesByProperty(@PathVariable Long propertyId) {
        return imageService.getImagesByProperty(propertyId);
    }

    @DeleteMapping("/{id}")
    public void deleteImage(@PathVariable Long id) {
        imageService.deleteImage(id);
    }
}