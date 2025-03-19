package com.openclassrooms.mddapi.auth.controller.presenter;

import com.openclassrooms.mddapi.auth.domain.User;

import lombok.Builder;

@Builder
public record UserPresenter(Long id, String username, String email, String dateCreated, String dateUpdated) {
    public static UserPresenter fromDomain(User user) {
        String dateUpdated = user.getDateUpdated() != null ? user.getDateUpdated().toString() : null;

        return UserPresenter.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .dateCreated(user.getDateCreated().toString())
                .dateUpdated(dateUpdated)
                .build();
    }
}
