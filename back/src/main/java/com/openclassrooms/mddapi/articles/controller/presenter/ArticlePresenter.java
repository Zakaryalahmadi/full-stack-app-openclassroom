package com.openclassrooms.mddapi.articles.controller.presenter;

import java.time.LocalDateTime;

import com.openclassrooms.mddapi.articles.domain.Article;

import lombok.Builder;

@Builder
public record ArticlePresenter(Long id, String title, String content, Long relatedTopicId, String author,
        LocalDateTime dateCreated, LocalDateTime dateUpdated) {
    public static ArticlePresenter fromDomain(Article article) {

        return ArticlePresenter.builder()
                .id(article.getId())
                .title(article.getTitle())
                .content(article.getContent())
                .relatedTopicId(article.getRelatedTopic().getId())
                .author(article.getAuthor())
                .dateCreated(article.getDateCreated())
                .dateUpdated(article.getDateUpdated())
                .build();
    }
}
