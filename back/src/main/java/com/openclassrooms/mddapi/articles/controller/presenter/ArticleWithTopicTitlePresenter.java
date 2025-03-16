package com.openclassrooms.mddapi.articles.controller.presenter;

import java.time.LocalDateTime;

import com.openclassrooms.mddapi.articles.domain.Article;

import lombok.Builder;

@Builder
public record ArticleWithTopicTitlePresenter(Long id, String title, String topicTitle, String content, String author,
        LocalDateTime dateCreated, LocalDateTime dateUpdated) {
    public static ArticleWithTopicTitlePresenter fromDomain(Article article) {
        return ArticleWithTopicTitlePresenter.builder()
                .id(article.getId())
                .title(article.getTitle())
                .topicTitle(article.getRelatedTopic().getTitle())
                .content(article.getContent())
                .author(article.getAuthor())
                .dateCreated(article.getDateCreated())
                .dateUpdated(article.getDateUpdated())
                .build();
    }
}
