package com.openclassrooms.mddapi.articles.domain;

import java.time.LocalDateTime;

import com.openclassrooms.mddapi.auth.domain.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArticleComment {
    private Long id;
    private String content;
    private Article article;
    private User author;
    private LocalDateTime dateCreated;
}
