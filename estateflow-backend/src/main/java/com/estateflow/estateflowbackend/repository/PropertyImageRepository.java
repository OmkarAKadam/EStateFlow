package com.estateflow.estateflowbackend.repository;

import com.estateflow.estateflowbackend.entity.Property;
import com.estateflow.estateflowbackend.entity.PropertyImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyImageRepository extends JpaRepository<PropertyImage, Long> {

    List<PropertyImage> findByProperty(Property property);

}