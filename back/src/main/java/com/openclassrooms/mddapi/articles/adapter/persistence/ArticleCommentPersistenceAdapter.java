package com.openclassrooms.mddapi.articles.adapter.persistence;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.articles.adapter.mapper.ArticleCommentDomainToArticleCommentEntity;
import com.openclassrooms.mddapi.articles.adapter.mapper.ArticleCommentEntityToArticleCommentDomain;
import com.openclassrooms.mddapi.articles.domain.ArticleComment;
import com.openclassrooms.mddapi.articles.domain.ArticleCommentRepository;

@Component
public class ArticleCommentPersistenceAdapter implements ArticleCommentRepository {

    private final ArticleCommentJpaRepository articleCommentJpaRepository;

    private final ArticleCommentEntityToArticleCommentDomain articleCommentEntityToArticleCommentDomain;

    private final ArticleCommentDomainToArticleCommentEntity articleCommentDomainToArticleCommentEntity;

    public ArticleCommentPersistenceAdapter(ArticleCommentJpaRepository articleCommentJpaRepository,
            ArticleCommentEntityToArticleCommentDomain articleCommentEntityToArticleCommentDomain,
            ArticleCommentDomainToArticleCommentEntity articleCommentDomainToArticleCommentEntity) {
        this.articleCommentJpaRepository = articleCommentJpaRepository;
        this.articleCommentEntityToArticleCommentDomain = articleCommentEntityToArticleCommentDomain;
        this.articleCommentDomainToArticleCommentEntity = articleCommentDomainToArticleCommentEntity;
    }

    @Override
    public List<ArticleComment> findAll() {
        return articleCommentJpaRepository.findAll().stream()
                .map(articleCommentEntityToArticleCommentDomain)
                .collect(Collectors.toList());
    }

    @Override
    public ArticleComment save(ArticleComment articleComment) {
        return articleCommentEntityToArticleCommentDomain.apply(
                articleCommentJpaRepository.save(articleCommentDomainToArticleCommentEntity.apply(articleComment)));
    }
}
