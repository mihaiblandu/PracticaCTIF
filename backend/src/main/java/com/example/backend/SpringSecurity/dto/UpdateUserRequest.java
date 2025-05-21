package com.example.backend.SpringSecurity.dto;


import lombok.Data;

@Data
public class UpdateUserRequest {
    private String username;
    private String email;
}