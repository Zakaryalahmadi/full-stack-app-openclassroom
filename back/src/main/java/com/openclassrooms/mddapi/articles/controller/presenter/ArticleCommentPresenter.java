package com.openclassrooms.mddapi.articles.controller.presenter;

import java.time.LocalDateTime;

import com.openclassrooms.mddapi.articles.domain.ArticleComment;

import lombok.Builder;

@Builder
public record ArticleCommentPresenter(Long id, String content, Long authorId, String authorName, Long articleId,
        String dateCreated) {

    public static ArticleCommentPresenter fromDomain(ArticleComment articleComment) {

        return ArticleCommentPresenter.builder()
                .id(articleComment.getId())
                .content(articleComment.getContent())
                .authorId(articleComment.getAuthor().getId())
                .authorName(articleComment.getAuthor().getUsername())
                .articleId(articleComment.getArticle().getId())
                .dateCreated(articleComment.getDateCreated().toString())
                .build();
    }
}
