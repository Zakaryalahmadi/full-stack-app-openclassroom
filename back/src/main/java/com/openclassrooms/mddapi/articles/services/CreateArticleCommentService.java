package com.openclassrooms.mddapi.articles.services;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.articles.controller.dtos.CreateArticleCommentDto;
import com.openclassrooms.mddapi.articles.domain.Article;
import com.openclassrooms.mddapi.articles.domain.ArticleComment;
import com.openclassrooms.mddapi.articles.domain.ArticleCommentRepository;
import com.openclassrooms.mddapi.articles.domain.ArticleRepository;
import com.openclassrooms.mddapi.articles.exceptions.ArticleNotFoundException;
import com.openclassrooms.mddapi.auth.adapter.security.JWTService;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.domain.UserRepository;
import com.openclassrooms.mddapi.auth.exceptions.UserNotFound;

@Service
public class CreateArticleCommentService {
    private final ArticleCommentRepository articleCommentRepository;
    private final JWTService jwtService;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;

    public CreateArticleCommentService(ArticleCommentRepository articleCommentRepository, JWTService jwtService,
            UserRepository userRepository, ArticleRepository articleRepository) {
        this.articleCommentRepository = articleCommentRepository;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.articleRepository = articleRepository;
    }

    public ArticleComment handle(CreateArticleCommentDto createArticleCommentDto, Long articleId ,String token) {
        Jwt jwt = this.jwtService.decodeToken(token);

        Long userId = Long.parseLong(jwt.getClaim("userId").toString());

        User user = userRepository.findUserById(userId)
                .orElseThrow(() -> new UserNotFound(userId));

        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new ArticleNotFoundException(articleId));

        ArticleComment articleComment = ArticleComment.builder()
                .author(user)
                .article(article)
                .content(createArticleCommentDto.content())
                .build();

        return articleCommentRepository.save(articleComment);
    }
}