package com.openclassrooms.mddapi.exception;

import com.openclassrooms.mddapi.articles.exceptions.ArticleNotFoundException;
import com.openclassrooms.mddapi.auth.exceptions.AuthenticationException;
import com.openclassrooms.mddapi.auth.exceptions.UserAlreadyExist;
import com.openclassrooms.mddapi.auth.exceptions.UserNotFound;
import com.openclassrooms.mddapi.topic.exception.TopicNotFound;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExist.class)
    public ResponseEntity<ApiError> handleUserAldreadyExist(UserAlreadyExist ex, HttpServletRequest request) {
        ApiError apiError = ApiError.builder()
                .timestamp(LocalDateTime.now())
                .message(Collections.singletonList(ex.getMessage()))
                .path(request.getRequestURI())
                .status(HttpStatus.CONFLICT.value())
                .build();

        return new ResponseEntity<>(apiError, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserNotFound.class)
    public ResponseEntity<ApiError> handleUserNotFound(UserNotFound ex, HttpServletRequest request) {
        ApiError apiError = ApiError.builder()
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .message(Collections.singletonList(ex.getMessage()))
                .status(HttpStatus.NOT_FOUND.value())
                .build();

        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(TopicNotFound.class)
    public ResponseEntity<ApiError> handleTopicNotFound(TopicNotFound ex, HttpServletRequest request) {
        ApiError apiError = ApiError.builder()
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .message(Collections.singletonList(ex.getMessage()))
                .status(HttpStatus.NOT_FOUND.value())
                .build();

        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationExceptions(MethodArgumentNotValidException ex,
            HttpServletRequest request) {

        List<String> errors = ex
                .getBindingResult()
                .getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .toList();

        ApiError apiError = ApiError.builder()
                .path(request.getRequestURI())
                .status(HttpStatus.BAD_REQUEST.value())
                .timestamp(LocalDateTime.now())
                .message(errors)
                .build();

        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiError> handleAuthenticationException(AuthenticationException ex,
            HttpServletRequest request) {
        ApiError apiError = ApiError.builder()
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .message(Collections.singletonList(ex.getMessage()))
                .status(HttpStatus.BAD_REQUEST.value())
                .build();

        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ArticleNotFoundException.class)
    public ResponseEntity<ApiError> handleArticleNotFoundException(ArticleNotFoundException ex,
            HttpServletRequest request) {
        ApiError apiError = ApiError.builder()
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .message(Collections.singletonList(ex.getMessage()))
                .status(HttpStatus.NOT_FOUND.value())
                .build();

        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }
}
