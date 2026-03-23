package com.estateflow.estateflowbackend.service;

import com.estateflow.estateflowbackend.dto.FavoriteResponseDTO;
import com.estateflow.estateflowbackend.entity.Favorite;
import com.estateflow.estateflowbackend.entity.Property;
import com.estateflow.estateflowbackend.entity.User;
import com.estateflow.estateflowbackend.exception.ResourceNotFoundException;
import com.estateflow.estateflowbackend.exception.UnauthorizedException;
import com.estateflow.estateflowbackend.repository.FavoriteRepository;
import com.estateflow.estateflowbackend.repository.PropertyRepository;
import com.estateflow.estateflowbackend.repository.UserRepository;
import com.estateflow.estateflowbackend.util.AuthUtil;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final AuthUtil authUtil;

    public FavoriteService(FavoriteRepository favoriteRepository,
                           PropertyRepository propertyRepository,
                           UserRepository userRepository,
                           AuthUtil authUtil) {
        this.favoriteRepository = favoriteRepository;
        this.propertyRepository = propertyRepository;
        this.userRepository = userRepository;
        this.authUtil = authUtil;
    }

    public FavoriteResponseDTO addFavorite(Long propertyId) {

        User user = getCurrentUser();

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        Favorite favorite = favoriteRepository
                .findByUserAndProperty(user, property)
                .orElseGet(() -> {
                    Favorite fav = new Favorite();
                    fav.setUser(user);
                    fav.setProperty(property);
                    return favoriteRepository.save(fav);
                });

        return mapToDTO(favorite);
    }

    public List<FavoriteResponseDTO> getMyFavorites() {

        User user = getCurrentUser();

        return favoriteRepository.findByUser(user)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public void removeFavorite(Long id) {

        User currentUser = getCurrentUser();

        Favorite favorite = favoriteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Favorite not found"));

        if (!favorite.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("Not allowed to remove this favorite");
        }

        favoriteRepository.delete(favorite);
    }

    private User getCurrentUser() {

        String email = authUtil.getCurrentUserEmail();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private FavoriteResponseDTO mapToDTO(Favorite favorite) {

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
    }
}