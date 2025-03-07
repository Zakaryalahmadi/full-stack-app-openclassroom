package com.openclassrooms.mddapi.topic.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class TopicNotFound extends RuntimeException {
    public TopicNotFound(Long id) {
        super("Le topic avec l'id: " + id + " n'existe pas");
    }
}
