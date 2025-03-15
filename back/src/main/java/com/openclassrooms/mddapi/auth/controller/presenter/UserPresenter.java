package com.openclassrooms.mddapi.auth.controller.presenter;

import lombok.Builder;

@Builder
public record UserPresenter(Long id, String username, String email,String dateCreated, String dateUpdated) { }
