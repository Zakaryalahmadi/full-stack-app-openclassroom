package com.openclassrooms.mddapi.articles.controller.dtos;

import jakarta.validation.constraints.NotBlank;

public record CreateArticleDto(@NotBlank(message = "Topic is required") String topicId,
        @NotBlank(message = "Title is required") String title,
        @NotBlank(message = "Content is required") String content) {
}
