package com.openclassrooms.mddapi.articles.adapter.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.articles.adapter.persistence.ArticleCommentEntity;
import com.openclassrooms.mddapi.articles.domain.ArticleComment;
import com.openclassrooms.mddapi.auth.adapter.mapper.UserEntityToUserDomainMapper;

@Component
public class ArticleCommentEntityToArticleCommentDomain implements Function<ArticleCommentEntity, ArticleComment> {

    private final ArticleEntityToArticleDomain articleEntityToArticleDomain;

    private final UserEntityToUserDomainMapper userEntityToUserDomain;

    public ArticleCommentEntityToArticleCommentDomain(ArticleEntityToArticleDomain articleEntityToArticleDomain,
            UserEntityToUserDomainMapper userEntityToUserDomain) {
        this.articleEntityToArticleDomain = articleEntityToArticleDomain;
        this.userEntityToUserDomain = userEntityToUserDomain;
    }

    @Override
    public ArticleComment apply(ArticleCommentEntity articleCommentEntity) {
        return ArticleComment.builder()
                .id(articleCommentEntity.getId())
                .content(articleCommentEntity.getContent())
                .article(articleEntityToArticleDomain.apply(articleCommentEntity.getArticle()))
                .author(userEntityToUserDomain.apply(articleCommentEntity.getAuthor()))
                .dateCreated(articleCommentEntity.getDateCreated())
                .build();
    }
}
