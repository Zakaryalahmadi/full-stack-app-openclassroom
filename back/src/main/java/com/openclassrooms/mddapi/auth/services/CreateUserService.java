package com.openclassrooms.mddapi.auth.services;

import com.openclassrooms.mddapi.auth.adapter.security.JWTService;
import com.openclassrooms.mddapi.auth.controller.dtos.CreateUpdateUserDto;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.domain.UserRepository;
import com.openclassrooms.mddapi.auth.domain.UserWithToken;
import com.openclassrooms.mddapi.auth.exceptions.UserAlreadyExist;
import com.openclassrooms.mddapi.auth.services.common.UserValidationService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CreateUserService {
    private final UserRepository userRepository;

    private final UserValidationService userValidationService;

    private final JWTService jwtService;

    private final PasswordEncoder passwordEncoder;

    public CreateUserService(UserRepository userRepository,
                             UserValidationService userValidationService,
                             JWTService jwtService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userValidationService = userValidationService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }


    public UserWithToken handle(CreateUpdateUserDto createUserDto){

        userValidationService.validateEmailUniqueness(createUserDto.email());

        userValidationService.validateUsernameUniqueness(createUserDto.username());

        User newUser = User.builder()
                .username(createUserDto.username())
                .password(passwordEncoder.encode(createUserDto.password()))
                .email(createUserDto.email())
                .dateCreated(LocalDateTime.now())
                .build();

        User savedUser = this.userRepository.save(newUser);

        String token = jwtService.generateToken(newUser);

        return new UserWithToken(savedUser, token);
    }
}
