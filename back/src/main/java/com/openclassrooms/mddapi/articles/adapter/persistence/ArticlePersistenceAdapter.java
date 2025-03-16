package com.openclassrooms.mddapi.articles.adapter.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.articles.adapter.mapper.ArticleDomainToArticleEntity;
import com.openclassrooms.mddapi.articles.adapter.mapper.ArticleEntityToArticleDomain;
import com.openclassrooms.mddapi.articles.domain.Article;
import com.openclassrooms.mddapi.articles.domain.ArticleRepository;
import com.openclassrooms.mddapi.articles.exceptions.ArticleNotFoundException;

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
    public List<Article> findAll() {
        return articleJpaRepository.findAll().stream()
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