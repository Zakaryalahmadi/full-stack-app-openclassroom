package com.openclassrooms.mddapi.auth.services;

import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.domain.UserRepository;
import com.openclassrooms.mddapi.auth.exceptions.UserNotFound;

import java.util.Optional;

public class GetCurrentUserService {
    private final UserRepository userRepository;

    public GetCurrentUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public User handle(Long userId){
        return this.userRepository.findUserById(userId).orElseThrow(() -> new UserNotFound(userId));
    }
}
