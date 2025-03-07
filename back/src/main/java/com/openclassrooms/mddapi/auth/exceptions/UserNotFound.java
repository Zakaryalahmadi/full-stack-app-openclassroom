package com.openclassrooms.mddapi.auth.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFound extends RuntimeException {
    public UserNotFound(Long id) {
        super("L'utilisateur avec l'id: " + id + " n'existe pas");
    }
}
