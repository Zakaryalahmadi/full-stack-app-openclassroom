package com.openclassrooms.mddapi.auth.services;

import com.openclassrooms.mddapi.auth.controller.dtos.CreateUpdateUserDto;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.domain.UserRepository;
import com.openclassrooms.mddapi.auth.exceptions.UserAlreadyExist;
import com.openclassrooms.mddapi.auth.services.common.UserValidationService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CreateUserService {
    private final UserRepository userRepository;

    private final UserValidationService userValidationService;

    public CreateUserService(UserRepository userRepository, UserValidationService userValidationService) {
        this.userRepository = userRepository;
        this.userValidationService = userValidationService;
    }


    public User handle(CreateUpdateUserDto createUserDto){

        userValidationService.validateEmailUniqueness(createUserDto.email());

        userValidationService.validateUsernameUniqueness(createUserDto.username());

        User newUser = User.builder()
                .username(createUserDto.username())
                .password(createUserDto.password())
                .email(createUserDto.email())
                .dateCreated(LocalDateTime.now())
                .build();

        return this.userRepository.save(newUser);
    }
}
