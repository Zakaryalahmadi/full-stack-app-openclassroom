package com.openclassrooms.mddapi.articles.adapter.mapper;

import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.articles.adapter.persistence.ArticleEntity;
import com.openclassrooms.mddapi.articles.domain.Article;
import com.openclassrooms.mddapi.topic.adapter.mapper.TopicEntityMapper;

import java.util.function.Function;

@Component
public class ArticleDomainToArticleEntity implements Function<Article, ArticleEntity> {

    private final TopicEntityMapper topicEntityMapper;

    public ArticleDomainToArticleEntity(TopicEntityMapper topicEntityMapper) {
        this.topicEntityMapper = topicEntityMapper;
    }

    @Override
    public ArticleEntity apply(Article article) {
        return ArticleEntity.builder()
                .id(article.getId())
                .title(article.getTitle())
                .content(article.getContent())
                .relatedTopic(topicEntityMapper.toEntity(article.getRelatedTopic()))
                .author(article.getAuthor())
                .dateCreated(article.getDateCreated())
                .dateUpdated(article.getDateUpdated())
                .build();
    }
}