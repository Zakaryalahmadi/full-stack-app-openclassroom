package com.openclassrooms.mddapi.auth.services;

import com.openclassrooms.mddapi.auth.adapter.security.JWTService;
import com.openclassrooms.mddapi.auth.controller.dtos.LoginDto;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.domain.UserRepository;
import com.openclassrooms.mddapi.auth.domain.UserWithToken;
import com.openclassrooms.mddapi.auth.exceptions.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    public LoginService(UserRepository userRepository, PasswordEncoder passwordEncoder, JWTService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public UserWithToken handle(LoginDto loginDto){
        User user = this.findUserByIdentifier(loginDto.identifier()).orElseThrow(() -> new AuthenticationException("Invalid credentials"));

        if (!passwordEncoder.matches(loginDto.password(), user.getPassword())) {
            throw new AuthenticationException("Invalid credentials");
        }

        String token = this.jwtService.generateToken(user);

        return new UserWithToken(user, token);
    }

    private Optional<User> findUserByIdentifier(String identifier){
        Optional<User> user = this.userRepository.findByEmail(identifier);

        if(user.isPresent()){
            return user;
        }

        return this.userRepository.findByUsername(identifier);
    }
}
