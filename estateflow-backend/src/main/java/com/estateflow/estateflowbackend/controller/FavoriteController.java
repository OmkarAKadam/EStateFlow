package com.estateflow.estateflowbackend.controller;

import com.estateflow.estateflowbackend.dto.FavoriteResponseDTO;
import com.estateflow.estateflowbackend.service.FavoriteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping("/{propertyId}")
    public FavoriteResponseDTO addFavorite(@PathVariable Long propertyId) {
        return favoriteService.addFavorite(propertyId);
    }

    @GetMapping
    public List<FavoriteResponseDTO> getMyFavorites() {
        return favoriteService.getMyFavorites();
    }

    @DeleteMapping("/{id}")
    public void removeFavorite(@PathVariable Long id) {
        favoriteService.removeFavorite(id);
    }
}