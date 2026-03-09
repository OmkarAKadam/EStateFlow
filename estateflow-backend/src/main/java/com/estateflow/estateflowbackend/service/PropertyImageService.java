package com.estateflow.estateflowbackend.service;

import com.estateflow.estateflowbackend.dto.PropertyImageResponseDTO;
import com.estateflow.estateflowbackend.entity.Property;
import com.estateflow.estateflowbackend.entity.PropertyImage;
import com.estateflow.estateflowbackend.repository.PropertyImageRepository;
import com.estateflow.estateflowbackend.repository.PropertyRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class PropertyImageService {

    private final PropertyImageRepository imageRepository;
    private final PropertyRepository propertyRepository;

    public PropertyImageService(PropertyImageRepository imageRepository,
                                PropertyRepository propertyRepository) {
        this.imageRepository = imageRepository;
        this.propertyRepository = propertyRepository;
    }

    public PropertyImageResponseDTO uploadPropertyImage(Long propertyId, MultipartFile file) throws IOException {

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        String uploadDir = System.getProperty("user.dir") + "/uploads/";

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String filePath = uploadDir + file.getOriginalFilename();
        file.transferTo(new File(filePath));

        PropertyImage image = new PropertyImage();
        image.setImageUrl(file.getOriginalFilename());
        image.setProperty(property);

        PropertyImage saved = imageRepository.save(image);

        PropertyImageResponseDTO response = new PropertyImageResponseDTO();
        response.setId(saved.getId());
        response.setImageUrl("/images/" + saved.getImageUrl());
        response.setPropertyId(property.getId());
        response.setPropertyTitle(property.getTitle());

        return response;
    }

    public List<PropertyImageResponseDTO> getImagesByProperty(Long propertyId) {

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        return imageRepository.findByProperty(property)
                .stream()
                .map(image -> {
                    PropertyImageResponseDTO dto = new PropertyImageResponseDTO();
                    dto.setId(image.getId());
                    dto.setImageUrl("/images/" + image.getImageUrl());
                    dto.setPropertyId(property.getId());
                    dto.setPropertyTitle(property.getTitle());
                    return dto;
                })
                .toList();
    }
}