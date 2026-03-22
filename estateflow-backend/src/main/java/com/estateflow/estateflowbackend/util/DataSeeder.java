package com.estateflow.estateflowbackend.util;

import com.estateflow.estateflowbackend.entity.*;
import com.estateflow.estateflowbackend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final FavoriteRepository favoriteRepository;
    private final MessageRepository messageRepository;
    private final PropertyImageRepository propertyImageRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (userRepository.count() > 0) return;

        Random random = new Random();

        String[] names = {
                "Rahul Sharma", "Priya Patel", "Amit Verma", "Neha Singh",
                "Karan Mehta", "Sneha Joshi", "Arjun Kapoor", "Pooja Desai",
                "Vikram Shah", "Anjali Gupta", "Rohit Agarwal", "Meera Iyer",
                "Suresh Reddy", "Kavita Nair", "Manish Jain", "Deepak Yadav",
                "Swati Kulkarni", "Nikhil Bansal", "Ritu Malhotra", "Aditya Roy"
        };

        List<User> users = new ArrayList<>();

        for (int i = 1; i <= 50; i++) {
            User user = new User();
            user.setFullName(names[random.nextInt(names.length)]);
            String name = user.getFullName().toLowerCase().replace(" ", "_");
            user.setEmail(name + i + "@gmail.com");
            user.setPassword(passwordEncoder.encode("password" + i));
            user.setRole(i % 3 == 0 ? UserRole.OWNER : UserRole.TENANT);
            users.add(user);
        }

        userRepository.saveAll(users);

        String[] titles = {
                "Luxury Apartment", "Modern Flat", "Spacious Villa", "Cozy Studio",
                "Premium Penthouse", "Affordable Apartment", "Elegant Home",
                "Family Villa", "Urban Flat", "Compact Studio",
                "Executive Apartment", "Sea View Apartment", "Garden Villa",
                "Fully Furnished Flat", "Budget Home", "New Launch Apartment",
                "Smart Home Apartment", "Classic Villa", "Duplex Apartment",
                "City Center Flat", "High-Rise Apartment", "Independent House",
                "Lake View Villa", "Studio Loft", "Corner Apartment"
        };

        String[] locations = {
                "Mumbai - Andheri", "Mumbai - Bandra", "Delhi - Rohini",
                "Delhi - Saket", "Bangalore - Whitefield", "Bangalore - Indiranagar",
                "Pune - Hinjewadi", "Pune - Wakad", "Ahmedabad - Satellite",
                "Ahmedabad - Navrangpura", "Hyderabad - Gachibowli",
                "Chennai - OMR", "Kolkata - Salt Lake", "Noida - Sector 62",
                "Gurgaon - DLF Phase 2"
        };

        String[] descriptions = {
                "Spacious apartment with modern amenities.",
                "Prime location with excellent connectivity.",
                "Perfect for families with nearby schools.",
                "Newly renovated property with parking.",
                "Affordable and well-maintained home.",
                "Beautifully designed interiors with natural light.",
                "Located in a peaceful and secure neighborhood.",
                "Close to metro station and shopping centers.",
                "Ideal for working professionals and families.",
                "Fully furnished with modern appliances.",
                "Ready-to-move-in property with premium features.",
                "Gated society with 24/7 security.",
                "Great investment opportunity.",
                "Well-ventilated and spacious rooms.",
                "Close to IT hubs and business centers.",
                "Luxury living with top-class amenities.",
                "Perfect blend of comfort and convenience.",
                "High-rise apartment with scenic views.",
                "Low maintenance and budget-friendly option.",
                "Modern architecture with stylish interiors.",
                "Near schools, hospitals, and malls.",
                "Peaceful environment away from city noise.",
                "Spacious layout with ample storage space.",
                "Premium property in a prime locality.",
                "Recently constructed with latest design trends."
        };

        String[] messages = {
                "Is this property still available?",
                "Can I schedule a visit?",
                "Is the price negotiable?",
                "Does it have parking?",
                "What is the exact location?",
                "Is this fully furnished?",
                "Can you share more photos?",
                "What are the maintenance charges?",
                "Is this available for rent or sale?",
                "How old is the property?",
                "Is there a lift in the building?",
                "Are pets allowed?",
                "Is there a power backup?",
                "Can I visit this weekend?",
                "Is brokerage applicable?",
                "What is the carpet area?",
                "Is water supply available 24/7?",
                "How far is the nearest metro?",
                "Is there a security system?",
                "Can I book this immediately?",
                "What is the final price?",
                "Is parking included in the price?",
                "Any nearby schools or hospitals?",
                "Is the property east-facing?",
                "Is there a gym or clubhouse?",
                "Can I negotiate the rent?",
                "Is it suitable for families?",
                "Is this newly constructed?",
                "What documents are required?",
                "Can I get a virtual tour?"
        };

        List<User> owners = users.stream()
                .filter(u -> u.getRole() == UserRole.OWNER)
                .toList();

        List<Property> properties = new ArrayList<>();

        for (int i = 1; i <= 120; i++) {
            Property property = new Property();
            property.setTitle(titles[random.nextInt(titles.length)] + " " + i);
            property.setLocation(locations[random.nextInt(locations.length)]);
            property.setPrice(BigDecimal.valueOf(20000 + random.nextInt(80000)));
            PropertyType[] types = PropertyType.values();
            property.setPropertyType(types[random.nextInt(types.length)]);
            property.setDescription(descriptions[random.nextInt(descriptions.length)]);
            property.setOwner(owners.get(random.nextInt(owners.size())));
            properties.add(property);
        }

        propertyRepository.saveAll(properties);

        for (int i = 0; i < properties.size(); i++) {
            Property property = properties.get(i);
            PropertyImage image = new PropertyImage();
            String imageUrl;

            String[] flatImages = {
                    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1560448075-bb0c3e1c9b9f?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1560449752-8c5d3d41f4c2?auto=format&fit=crop&w=800&q=80"
            };

            String[] houseImages = {
                    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1600607687644-c7f34c1c1e6b?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80"
            };

            String[] roomImages = {
                    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"
            };

            if (property.getPropertyType() == PropertyType.FLAT) {
                imageUrl = flatImages[random.nextInt(flatImages.length)];
            } else if (property.getPropertyType() == PropertyType.HOUSE) {
                imageUrl = houseImages[random.nextInt(houseImages.length)];
            } else {
                imageUrl = roomImages[random.nextInt(roomImages.length)];
            }

            image.setImageUrl(imageUrl);
            image.setProperty(property);
            propertyImageRepository.save(image);
        }

        for (User user : users) {
            if (user.getRole() == UserRole.TENANT) {
                for (int i = 0; i < 3; i++) {
                    Property property = properties.get(random.nextInt(properties.size()));
                    Favorite fav = new Favorite();
                    fav.setUser(user);
                    fav.setProperty(property);
                    favoriteRepository.save(fav);
                }
            }
        }

        for (int i = 0; i < 40; i++) {
            User sender = users.get(random.nextInt(users.size()));
            User receiver = users.get(random.nextInt(users.size()));
            Property property = properties.get(random.nextInt(properties.size()));

            if (sender.equals(receiver)) continue;

            Message msg = new Message();
            msg.setSender(sender);
            msg.setReceiver(receiver);
            msg.setProperty(property);
            msg.setContent(messages[random.nextInt(messages.length)]);
            msg.setIsRead(random.nextBoolean());

            messageRepository.save(msg);
        }

        System.out.println("✅ Database Seeded Successfully");
    }
}
