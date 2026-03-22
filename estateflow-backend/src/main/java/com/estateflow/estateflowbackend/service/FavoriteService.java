package com.estateflow.estateflowbackend.service;

import com.estateflow.estateflowbackend.dto.FavoriteResponseDTO;
import com.estateflow.estateflowbackend.entity.Favorite;
import com.estateflow.estateflowbackend.entity.Property;
import com.estateflow.estateflowbackend.entity.User;
import com.estateflow.estateflowbackend.repository.FavoriteRepository;
import com.estateflow.estateflowbackend.repository.PropertyRepository;
import com.estateflow.estateflowbackend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    public FavoriteService(FavoriteRepository favoriteRepository,
                           PropertyRepository propertyRepository,
                           UserRepository userRepository) {
        this.favoriteRepository = favoriteRepository;
        this.propertyRepository = propertyRepository;
        this.userRepository = userRepository;
    }

    public Favorite addFavorite(Long propertyId) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        return favoriteRepository
                .findByUserAndProperty(user, property)
                .orElseGet(() -> {
                    Favorite favorite = new Favorite();
                    favorite.setUser(user);
                    favorite.setProperty(property);
                    return favoriteRepository.save(favorite);
                });
    }

    public List<FavoriteResponseDTO> getMyFavorites() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Favorite not found"));

        List<Favorite> favorites = favoriteRepository.findByUser(user);

        return favorites.stream().map(favorite -> {

            Property property = favorite.getProperty();

            FavoriteResponseDTO response = new FavoriteResponseDTO();

            response.setFavoriteId(favorite.getId());
            response.setPropertyId(property.getId());
            response.setTitle(property.getTitle());
            response.setLocation(property.getLocation());
            response.setPrice(property.getPrice());
            response.setPropertyType(
                    property.getPropertyType() != null
                            ? property.getPropertyType().name()
                            : null
            );
            response.setOwnerEmail(property.getOwner().getEmail());

            return response;

        }).toList();
    }

    public void removeFavorite(Long id) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        Favorite favorite = favoriteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Favorite not found"));

        if (!favorite.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }

        favoriteRepository.delete(favorite);
    }
}
