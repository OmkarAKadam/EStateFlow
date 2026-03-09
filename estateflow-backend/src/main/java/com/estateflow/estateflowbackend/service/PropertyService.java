package com.estateflow.estateflowbackend.service;

import com.estateflow.estateflowbackend.dto.PropertyRequestDTO;
import com.estateflow.estateflowbackend.dto.PropertyResponseDTO;
import com.estateflow.estateflowbackend.entity.Property;
import com.estateflow.estateflowbackend.entity.User;
import com.estateflow.estateflowbackend.repository.PropertyRepository;
import com.estateflow.estateflowbackend.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    public PropertyService(PropertyRepository propertyRepository,
                           UserRepository userRepository) {
        this.propertyRepository = propertyRepository;
        this.userRepository = userRepository;
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

        PropertyResponseDTO response = new PropertyResponseDTO();
        response.setId(saved.getId());
        response.setTitle(saved.getTitle());
        response.setDescription(saved.getDescription());
        response.setPrice(saved.getPrice());
        response.setLocation(saved.getLocation());
        response.setPropertyType(saved.getPropertyType());
        response.setBedrooms(saved.getBedrooms());
        response.setBathrooms(saved.getBathrooms());
        response.setOwnerEmail(owner.getEmail());

        return response;
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
        property.setPrice(request.getPrice());
        property.setLocation(request.getLocation());
        property.setPropertyType(request.getPropertyType());
        property.setBedrooms(request.getBedrooms());
        property.setBathrooms(request.getBathrooms());

        Property updated = propertyRepository.save(property);

        PropertyResponseDTO response = new PropertyResponseDTO();

        response.setId(updated.getId());
        response.setTitle(updated.getTitle());
        response.setDescription(updated.getDescription());
        response.setPrice(updated.getPrice());
        response.setLocation(updated.getLocation());
        response.setPropertyType(updated.getPropertyType());
        response.setBedrooms(updated.getBedrooms());
        response.setBathrooms(updated.getBathrooms());
        response.setOwnerEmail(updated.getOwner().getEmail());

        return response;
    }

    public Page<PropertyResponseDTO> getAllProperties(Pageable pageable) {

        Page<Property> properties = propertyRepository.findAll(pageable);

        return properties.map(property -> {

            PropertyResponseDTO response = new PropertyResponseDTO();

            response.setId(property.getId());
            response.setTitle(property.getTitle());
            response.setDescription(property.getDescription());
            response.setPrice(property.getPrice());
            response.setLocation(property.getLocation());
            response.setPropertyType(property.getPropertyType());
            response.setBedrooms(property.getBedrooms());
            response.setBathrooms(property.getBathrooms());
            response.setOwnerEmail(property.getOwner().getEmail());

            return response;
        });
    }

    public List<PropertyResponseDTO> getMyProperties() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Property> properties = propertyRepository.findByOwner(owner);

        return properties.stream().map(property -> {

            PropertyResponseDTO response = new PropertyResponseDTO();

            response.setId(property.getId());
            response.setTitle(property.getTitle());
            response.setDescription(property.getDescription());
            response.setPrice(property.getPrice());
            response.setLocation(property.getLocation());
            response.setPropertyType(property.getPropertyType());
            response.setBedrooms(property.getBedrooms());
            response.setBathrooms(property.getBathrooms());
            response.setOwnerEmail(owner.getEmail());

            return response;

        }).toList();
    }

    public PropertyResponseDTO getPropertyById(Long id) {

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        PropertyResponseDTO response = new PropertyResponseDTO();

        response.setId(property.getId());
        response.setTitle(property.getTitle());
        response.setDescription(property.getDescription());
        response.setPrice(property.getPrice());
        response.setLocation(property.getLocation());
        response.setPropertyType(property.getPropertyType());
        response.setBedrooms(property.getBedrooms());
        response.setBathrooms(property.getBathrooms());
        response.setOwnerEmail(property.getOwner().getEmail());

        return response;
    }

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

        propertyRepository.delete(property);
    }
}