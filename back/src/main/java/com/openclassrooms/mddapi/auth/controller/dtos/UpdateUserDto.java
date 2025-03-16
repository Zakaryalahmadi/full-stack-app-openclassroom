package com.openclassrooms.mddapi.auth.controller.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateUserDto(
        String username,

        String password,

        @Email(message = "L'email doit être valide")
        String email
) {}