package com.openclassrooms.mddapi.auth.controller.dtos;

public record LoginDto(String identifier, // Can be either email or username
                       String password) { }
