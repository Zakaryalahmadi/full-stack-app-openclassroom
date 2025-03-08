package com.openclassrooms.mddapi.auth.domain;

public record UserWithToken(User user, String token) {}
