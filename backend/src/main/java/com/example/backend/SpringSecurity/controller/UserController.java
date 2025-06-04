package com.example.backend.SpringSecurity.controller;

import com.example.backend.SpringSecurity.dto.UpdateUserRequest;
import com.example.backend.SpringSecurity.dto.UserResponse;
import com.example.backend.SpringSecurity.exception.ResourceNotFoundException;
import com.example.backend.SpringSecurity.model.User;
import com.example.backend.SpringSecurity.repository.UserRepository;
import com.example.backend.SpringSecurity.security.CustomUserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

//    @GetMapping("/me")
//    public UserResponse getCurrentUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
//        User user = userRepository.findById(userDetails.getId())
//                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
//
//        return mapToUserResponse(user);
//    }

    @GetMapping("/test")
    public String testEndpoint() {
        return "Test endpoint is working!";
    }

//    @GetMapping("/{id}")
//    public UserResponse getUserById(@PathVariable String id) {
//        User user = userRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
//
//        return mapToUserResponse(user);
//    }

//    @PutMapping("/me")
//    public UserResponse updateCurrentUser(
//            @AuthenticationPrincipal CustomUserDetails userDetails,
//            @RequestBody UpdateUserRequest updateRequest) {
//
//        User user = userRepository.findById(userDetails.getId())
//                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
//
//        // Update allowed fields
//        if (updateRequest.getUsername() != null) {
//            user.setUsername(updateRequest.getUsername());
//        }
//        if (updateRequest.getEmail() != null) {
//            user.setEmail(updateRequest.getEmail());
//        }
//
//        User updatedUser = userRepository.save(user);
//        return mapToUserResponse(updatedUser);
//    }

//    @DeleteMapping("/me")
//    public void deleteCurrentUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
//        userRepository.deleteById(userDetails.getId());
//    }
//
//    private UserResponse mapToUserResponse(User user) {
//        return new UserResponse(
//                user.getId(),
//                user.getUsername(),
//                user.getEmail(),
//                user.getCreatedAt()
//        );
//    }
}