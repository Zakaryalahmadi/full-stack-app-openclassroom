package com.openclassrooms.mddapi.articles.adapter.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.articles.adapter.persistence.ArticleCommentEntity;
import com.openclassrooms.mddapi.articles.domain.ArticleComment;
import com.openclassrooms.mddapi.auth.adapter.mapper.UserDomainToUserEntityMapper;

@Component
public class ArticleCommentDomainToArticleCommentEntity implements Function<ArticleComment, ArticleCommentEntity> {

    private final ArticleDomainToArticleEntity articleDomainToArticleEntity;

    private final UserDomainToUserEntityMapper userDomainToUserEntity;

    public ArticleCommentDomainToArticleCommentEntity(ArticleDomainToArticleEntity articleDomainToArticleEntity,
            UserDomainToUserEntityMapper userDomainToUserEntity) {
        this.articleDomainToArticleEntity = articleDomainToArticleEntity;
        this.userDomainToUserEntity = userDomainToUserEntity;
    }

    @Override
    public ArticleCommentEntity apply(ArticleComment articleComment) {
        return ArticleCommentEntity.builder()
                .id(articleComment.getId())
                .content(articleComment.getContent())
                .article(articleDomainToArticleEntity.apply(articleComment.getArticle()))
                .author(userDomainToUserEntity.apply(articleComment.getAuthor()))
                .dateCreated(articleComment.getDateCreated())
                .build();
    }
}
