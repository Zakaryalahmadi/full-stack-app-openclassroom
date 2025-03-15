package com.openclassrooms.mddapi.auth.controller.presenter;

import lombok.Builder;

@Builder
public record UserPresenterWithToken (Long id, String username, String email,String token,String dateCreated, String dateUpdated) { }
