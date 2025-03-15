package com.openclassrooms.mddapi.auth.services;

import com.openclassrooms.mddapi.auth.adapter.security.JWTService;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.domain.UserRepository;
import com.openclassrooms.mddapi.auth.exceptions.UserNotFound;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class GetCurrentUserServiceViaToken {
    private final UserRepository userRepository;

    private final JWTService jwtService;

    public GetCurrentUserServiceViaToken(UserRepository userRepository, JWTService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }


    public User handle(String token){
        Jwt jwt = jwtService.decodeToken(token);

        Long userId = jwt.getClaim("userId");

        return this.userRepository.findUserById(userId).orElseThrow(() -> new UserNotFound(userId));
    }
}
