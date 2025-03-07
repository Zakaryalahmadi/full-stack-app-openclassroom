package com.openclassrooms.mddapi.exception;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record ApiError(String path, List<String> message, int status, LocalDateTime timestamp) { }
