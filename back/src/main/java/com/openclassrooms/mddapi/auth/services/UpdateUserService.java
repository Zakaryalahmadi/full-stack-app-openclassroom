package com.openclassrooms.mddapi.auth.services;

import com.openclassrooms.mddapi.auth.adapter.security.JWTService;
import com.openclassrooms.mddapi.auth.controller.dtos.CreateUserDto;
import com.openclassrooms.mddapi.auth.controller.dtos.UpdateUserDto;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.domain.UserRepository;
import com.openclassrooms.mddapi.auth.exceptions.UserNotFound;
import com.openclassrooms.mddapi.auth.services.common.UserValidationService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UpdateUserService {
    private final UserRepository userRepository;

    private final UserValidationService userValidationService;

    private final JWTService jwtService;

    private final PasswordEncoder passwordEncoder;

    public UpdateUserService(UserRepository userRepository, UserValidationService userValidationService,
                             JWTService jwtService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userValidationService = userValidationService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public User handle(String token, UpdateUserDto updateUserDto) {

        Jwt jwt = jwtService.decodeToken(token);

        Long userId = jwt.getClaim("userId");

        User existingUser = this.userRepository.findUserById(userId)
                .orElseThrow(() -> new UserNotFound(userId));


        boolean isValidEmail = updateUserDto.email() != null && !updateUserDto.email().isEmpty() && !updateUserDto.email().equals(existingUser.getEmail());

        boolean isValidUsername = updateUserDto.username() != null && !updateUserDto.username().isEmpty() && !updateUserDto.username().equals(existingUser.getUsername());

        boolean isValidPassword = updateUserDto.password() != null && !updateUserDto.password().isEmpty();

        if (isValidEmail) {
            userValidationService.validateEmailUniqueness(updateUserDto.email());
            existingUser.setEmail(updateUserDto.email());
        }

        if (isValidUsername) {
            userValidationService.validateUsernameUniqueness(updateUserDto.username());
            existingUser.setUsername(updateUserDto.username());
        }

        if (isValidPassword) {
            existingUser.setPassword(passwordEncoder.encode(updateUserDto.password()));
        }

        existingUser.setDateUpdated(LocalDateTime.now());
        return this.userRepository.save(existingUser);
    }

}
