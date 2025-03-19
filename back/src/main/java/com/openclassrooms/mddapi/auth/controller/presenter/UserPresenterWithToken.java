package com.openclassrooms.mddapi.auth.controller.presenter;

import com.openclassrooms.mddapi.auth.domain.UserWithToken;

import lombok.Builder;

@Builder
public record UserPresenterWithToken(Long id, String username, String email, String token, String dateCreated,
        String dateUpdated) {
    public static UserPresenterWithToken fromDomain(UserWithToken userWithToken) {
        String dateUpdated = userWithToken.user().getDateUpdated() != null
                ? userWithToken.user().getDateUpdated().toString()
                : null;

        return UserPresenterWithToken.builder()
                .id(userWithToken.user().getId())
                .username(userWithToken.user().getUsername())
                .email(userWithToken.user().getEmail())
                .token(userWithToken.token())
                .dateCreated(userWithToken.user().getDateCreated().toString())
                .dateUpdated(dateUpdated)
                .build();
    }
}
