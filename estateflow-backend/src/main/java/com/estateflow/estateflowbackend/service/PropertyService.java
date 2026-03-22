package com.estateflow.estateflowbackend.service;

import com.estateflow.estateflowbackend.dto.PropertyRequestDTO;
import com.estateflow.estateflowbackend.dto.PropertyResponseDTO;
import com.estateflow.estateflowbackend.entity.Property;
import com.estateflow.estateflowbackend.entity.PropertyType;
import com.estateflow.estateflowbackend.entity.User;
import com.estateflow.estateflowbackend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final FavoriteRepository favoriteRepository;
    private final MessageRepository messageRepository;
    private final PropertyImageRepository propertyImageRepository;

    public PropertyService(PropertyRepository propertyRepository,
                           UserRepository userRepository, FavoriteRepository favoriteRepository, MessageRepository messageRepository, PropertyImageRepository propertyImageRepository) {
        this.propertyRepository = propertyRepository;
        this.userRepository = userRepository;
        this.favoriteRepository = favoriteRepository;
        this.messageRepository = messageRepository;
        this.propertyImageRepository = propertyImageRepository;
    }

    public PropertyResponseDTO createProperty(PropertyRequestDTO request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Property property = new Property();

        property.setTitle(request.getTitle());
        property.setDescription(request.getDescription());
        property.setPrice(request.getPrice());
        property.setLocation(request.getLocation());
        property.setPropertyType(request.getPropertyType());
        property.setBedrooms(request.getBedrooms());
        property.setBathrooms(request.getBathrooms());
        property.setOwner(owner);

        Property saved = propertyRepository.save(property);

        return mapToResponse(saved);
    }

    public PropertyResponseDTO updateProperty(Long id, PropertyRequestDTO request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        if (!property.getOwner().getEmail().equals(email)) {
            throw new RuntimeException("You are not allowed to update this property");
        }

        property.setTitle(request.getTitle());
        property.setDescription(request.getDescription());
        property.setPropertyType(request.getPropertyType());
        property.setPrice(request.getPrice());
        property.setLocation(request.getLocation());
        property.setPropertyType(request.getPropertyType());
        property.setBedrooms(request.getBedrooms());
        property.setBathrooms(request.getBathrooms());

        Property updated = propertyRepository.save(property);

        return mapToResponse(updated);
    }

    public Page<PropertyResponseDTO> getAllProperties(Pageable pageable) {

        Page<Property> properties = propertyRepository.findAll(pageable);

        return properties.map(this::mapToResponse);
    }

    public List<PropertyResponseDTO> getMyProperties() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        List<Property> properties = propertyRepository.findByOwner(owner);

        return properties.stream()
                .map(this::mapToResponse)
                .toList();
    }

    public PropertyResponseDTO getPropertyById(Long id) {

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        return mapToResponse(property);
    }

    @Transactional
    public void deleteProperty(Long id) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        if (!property.getOwner().getEmail().equals(email)) {
            throw new RuntimeException("You are not allowed to delete this property");
        }

        favoriteRepository.deleteByProperty(property);
        messageRepository.deleteByProperty(property);
        propertyImageRepository.deleteByProperty(property);
        propertyRepository.delete(property);
    }

    public List<PropertyResponseDTO> searchByLocation(String location) {

        return propertyRepository
                .findByLocationContainingIgnoreCase(location)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<PropertyResponseDTO> searchByPriceRange(BigDecimal min, BigDecimal max) {

        return propertyRepository
                .findByPriceBetween(min, max)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<PropertyResponseDTO> searchByType(PropertyType type) {

        return propertyRepository
                .findByPropertyType(type)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private PropertyResponseDTO mapToResponse(Property property) {

        PropertyResponseDTO response = new PropertyResponseDTO();

        response.setId(property.getId());
        response.setTitle(property.getTitle());
        response.setDescription(property.getDescription());
        response.setPrice(property.getPrice());
        response.setLocation(property.getLocation());
        response.setPropertyType(
                property.getPropertyType() != null
                        ? property.getPropertyType()
                        : PropertyType.FLAT
        );
        response.setBedrooms(property.getBedrooms());
        response.setBathrooms(property.getBathrooms());
        response.setOwnerId(property.getOwner().getId());
        response.setOwnerEmail(property.getOwner().getEmail());

        return response;
    }
}