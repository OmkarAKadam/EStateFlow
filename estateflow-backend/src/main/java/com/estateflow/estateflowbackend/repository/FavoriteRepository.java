package com.estateflow.estateflowbackend.repository;

import com.estateflow.estateflowbackend.entity.Favorite;
import com.estateflow.estateflowbackend.entity.Property;
import com.estateflow.estateflowbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUser(User user);

    Optional<Favorite> findByUserAndProperty(User user, Property property);

}