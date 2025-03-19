package com.openclassrooms.mddapi.articles.adapter.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.articles.adapter.mapper.ArticleDomainToArticleEntity;
import com.openclassrooms.mddapi.articles.adapter.mapper.ArticleEntityToArticleDomain;
import com.openclassrooms.mddapi.articles.domain.Article;
import com.openclassrooms.mddapi.articles.domain.ArticleRepository;

@Repository
public class ArticlePersistenceAdapter implements ArticleRepository {

    private final ArticleJpaRepository articleJpaRepository;
    private final ArticleEntityToArticleDomain articleEntityToArticleDomain;
    private final ArticleDomainToArticleEntity articleDomainToArticleEntity;

    public ArticlePersistenceAdapter(ArticleJpaRepository articleJpaRepository,
            ArticleEntityToArticleDomain articleEntityToArticleDomain,
            ArticleDomainToArticleEntity articleDomainToArticleEntity) {
        this.articleJpaRepository = articleJpaRepository;
        this.articleEntityToArticleDomain = articleEntityToArticleDomain;
        this.articleDomainToArticleEntity = articleDomainToArticleEntity;
    }

    @Override
    public List<Article> findAll(Boolean ascending) {
        Sort sort = Boolean.TRUE.equals(ascending) ? Sort.by("dateCreated").ascending()
                : Sort.by("dateCreated").descending();

        return articleJpaRepository.findAll(sort).stream()
                .map(articleEntityToArticleDomain)
                .toList();
    }

    @Override
    public Optional<Article> findById(Long id) {
        return articleJpaRepository.findById(id)
                .map(articleEntityToArticleDomain);
    }

    @Override
    public Article save(Article article) {
        return articleEntityToArticleDomain
                .apply(articleJpaRepository.save(articleDomainToArticleEntity.apply(article)));
    }
}
