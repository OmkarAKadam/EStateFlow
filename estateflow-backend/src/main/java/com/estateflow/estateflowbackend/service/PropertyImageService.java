package com.estateflow.estateflowbackend.service;

import com.estateflow.estateflowbackend.dto.PropertyImageResponseDTO;
import com.estateflow.estateflowbackend.entity.Property;
import com.estateflow.estateflowbackend.entity.PropertyImage;
import com.estateflow.estateflowbackend.exception.ResourceNotFoundException;
import com.estateflow.estateflowbackend.repository.PropertyImageRepository;
import com.estateflow.estateflowbackend.repository.PropertyRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class PropertyImageService {

    private final PropertyImageRepository imageRepository;
    private final PropertyRepository propertyRepository;

    private final String uploadDir = System.getProperty("user.dir") + "/uploads/";

    public PropertyImageService(PropertyImageRepository imageRepository,
                                PropertyRepository propertyRepository) {
        this.imageRepository = imageRepository;
        this.propertyRepository = propertyRepository;
    }

    public PropertyImageResponseDTO uploadPropertyImage(Long propertyId, MultipartFile file) throws IOException {

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        validateFile(file);

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String extension = getFileExtension(file.getOriginalFilename());
        String fileName = UUID.randomUUID() + "." + extension;

        String filePath = uploadDir + fileName;

        file.transferTo(new File(filePath));

        PropertyImage image = new PropertyImage();
        image.setImageUrl("/uploads/" + fileName);
        image.setProperty(property);

        return mapToDTO(imageRepository.save(image));
    }

    public List<PropertyImageResponseDTO> getImagesByProperty(Long propertyId) {

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        return imageRepository.findByProperty(property)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public void deleteImage(Long id) {

        PropertyImage image = imageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Image not found"));

        String filePath = uploadDir + extractFileName(image.getImageUrl());

        File file = new File(filePath);

        if (file.exists()) {
            file.delete();
        }

        imageRepository.delete(image);
    }

    private void validateFile(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        String contentType = file.getContentType();

        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed");
        }

        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("File size exceeds 5MB");
        }
    }

    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            throw new IllegalArgumentException("Invalid file name");
        }
        return filename.substring(filename.lastIndexOf('.') + 1);
    }

    private String extractFileName(String imageUrl) {
        return imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    }

    private PropertyImageResponseDTO mapToDTO(PropertyImage image) {

        Property property = image.getProperty();

        PropertyImageResponseDTO dto = new PropertyImageResponseDTO();

        dto.setId(image.getId());
        dto.setImageUrl(image.getImageUrl());
        dto.setPropertyId(property.getId());
        dto.setPropertyTitle(property.getTitle());

        return dto;
    }
}