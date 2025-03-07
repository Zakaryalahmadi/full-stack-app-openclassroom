package com.openclassrooms.mddapi.auth.services;

import com.openclassrooms.mddapi.auth.adapter.mapper.UserEntityToUserDomainMapper;
import com.openclassrooms.mddapi.auth.controller.dtos.CreateUpdateUserDto;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.domain.UserRepository;
import com.openclassrooms.mddapi.auth.exceptions.UserAlreadyExist;
import com.openclassrooms.mddapi.auth.exceptions.UserNotFound;
import com.openclassrooms.mddapi.auth.services.common.UserValidationService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UpdateUserService {
    private final UserRepository userRepository;

    private final UserValidationService userValidationService;

    public UpdateUserService(UserRepository userRepository, UserValidationService userValidationService) {
        this.userRepository = userRepository;
        this.userValidationService = userValidationService;
    }

    public User handle(Long id, CreateUpdateUserDto updateUserDto){
        User existingUser = this.userRepository.findUserById(id)
                .orElseThrow(() -> new UserNotFound(id));

        userValidationService.validateEmailUniqueness(updateUserDto.email());

        userValidationService.validateUsernameUniqueness(updateUserDto.username());

        existingUser.setEmail(updateUserDto.email());
        existingUser.setUsername(updateUserDto.username());
        existingUser.setPassword(updateUserDto.password());
        existingUser.setDateUpdated(LocalDateTime.now());

        return this.userRepository.save(existingUser);
    }

}
