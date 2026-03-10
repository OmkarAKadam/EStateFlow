package com.estateflow.estateflowbackend.repository;

import com.estateflow.estateflowbackend.entity.Property;
import com.estateflow.estateflowbackend.entity.PropertyType;
import com.estateflow.estateflowbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByOwner(User owner);
    List<Property> findByLocationContainingIgnoreCase(String location);

    List<Property> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    List<Property> findByPropertyType(PropertyType propertyType);
}

