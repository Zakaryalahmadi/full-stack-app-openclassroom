package com.openclassrooms.mddapi.articles.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.articles.domain.ArticleComment;
import com.openclassrooms.mddapi.articles.domain.ArticleCommentRepository;

@Service
public class GetArticleCommentsService {
    private final ArticleCommentRepository articleCommentRepository;

    public GetArticleCommentsService(ArticleCommentRepository articleCommentRepository) {
        this.articleCommentRepository = articleCommentRepository;
    }

    public List<ArticleComment> handle(Long articleId) {
        return articleCommentRepository.findAll().stream()
                .filter(articleComment -> articleComment.getArticle().getId().equals(articleId))
                .collect(Collectors.toList());
    }
}