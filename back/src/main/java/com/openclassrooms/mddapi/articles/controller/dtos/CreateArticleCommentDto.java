package com.openclassrooms.mddapi.articles.controller.dtos;

import jakarta.validation.constraints.NotBlank;

public record CreateArticleCommentDto(@NotBlank String content) {
}