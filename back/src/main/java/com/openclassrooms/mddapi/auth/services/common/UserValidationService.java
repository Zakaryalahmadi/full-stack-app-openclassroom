package com.openclassrooms.mddapi.auth.services.common;

import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.domain.UserRepository;
import com.openclassrooms.mddapi.auth.exceptions.UserAlreadyExist;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserValidationService {
    private final UserRepository userRepository;

    public UserValidationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void validateEmailUniqueness(String email){
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            throw new UserAlreadyExist(
                    "L'utilisateur avec l'email " + email + " existe déjà"
            );
        }
    }

    public void validateUsernameUniqueness(String username){
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent()) {
            throw new UserAlreadyExist(
                    "L'utilisateur avec le username " + username + " existe déjà"
            );
        }
    }
}
