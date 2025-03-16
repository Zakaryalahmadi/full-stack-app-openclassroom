package com.openclassrooms.mddapi.articles.services;

import com.openclassrooms.mddapi.articles.domain.Article;
import com.openclassrooms.mddapi.articles.domain.ArticleRepository;
import com.openclassrooms.mddapi.articles.exceptions.ArticleNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class GetArticleByIdService {
    private final ArticleRepository articleRepository;

    public GetArticleByIdService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public Article handle(Long articleId) {
        return articleRepository.findById(articleId)
                .orElseThrow(() -> new ArticleNotFoundException(articleId));
    }
}
