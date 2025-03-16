package com.openclassrooms.mddapi.articles.adapter.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.articles.adapter.persistence.ArticleEntity;
import com.openclassrooms.mddapi.articles.domain.Article;
import com.openclassrooms.mddapi.topic.adapter.mapper.TopicEntityMapper;

@Component
public class ArticleEntityToArticleDomain implements Function<ArticleEntity, Article> {
    private final TopicEntityMapper topicEntityMapper;

    public ArticleEntityToArticleDomain(TopicEntityMapper topicEntityMapper) {
        this.topicEntityMapper = topicEntityMapper;
    }

    @Override
    public Article apply(ArticleEntity articleEntity) {
        return Article.builder()
                .id(articleEntity.getId())
                .title(articleEntity.getTitle())
                .content(articleEntity.getContent())
                .author(articleEntity.getAuthor())
                .relatedTopic(topicEntityMapper.toDomain(articleEntity.getRelatedTopic()))
                .dateCreated(articleEntity.getDateCreated())
                .dateUpdated(articleEntity.getDateUpdated())
                .build();
    }
}
