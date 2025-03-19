package com.openclassrooms.mddapi.articles.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.articles.domain.Article;
import com.openclassrooms.mddapi.articles.domain.ArticleRepository;

@Service
public class GetArticlesService {
    private final ArticleRepository articleRepository;

    public GetArticlesService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public List<Article> handle(Boolean ascending) {
        return this.articleRepository.findAll(ascending);
    }
}