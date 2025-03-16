package com.openclassrooms.mddapi.articles.services;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.articles.controller.dtos.CreateArticleDto;
import com.openclassrooms.mddapi.articles.domain.Article;
import com.openclassrooms.mddapi.articles.domain.ArticleRepository;
import com.openclassrooms.mddapi.auth.adapter.security.JWTService;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.domain.UserRepository;
import com.openclassrooms.mddapi.auth.exceptions.UserNotFound;
import com.openclassrooms.mddapi.topic.domain.Topic;
import com.openclassrooms.mddapi.topic.domain.TopicRepository;
import com.openclassrooms.mddapi.topic.exception.TopicNotFound;

@Service
public class CreateArticleService {
    private final ArticleRepository articleRepository;
    private final JWTService jwtService;
    private final UserRepository userRepository;
    private final TopicRepository topicRepository;

    public CreateArticleService(ArticleRepository articleRepository, JWTService jwtService,
            UserRepository userRepository, TopicRepository topicRepository) {
        this.articleRepository = articleRepository;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.topicRepository = topicRepository;
    }

    public Article handle(CreateArticleDto createArticleDto, String token) {
        Jwt jwt = this.jwtService.decodeToken(token);

        Long userId = Long.parseLong(jwt.getClaim("userId").toString());

        User user = userRepository.findUserById(userId)
                .orElseThrow(() -> new UserNotFound(userId));

        Topic topic = this.topicRepository.findById(Long.parseLong(createArticleDto.topicId()))
                .orElseThrow(() -> new TopicNotFound(Long.parseLong(createArticleDto.topicId())));

        Article article = Article.builder()
                .title(createArticleDto.title())
                .content(createArticleDto.content())
                .author(user.getUsername())
                .relatedTopic(topic)
                .build();

        return this.articleRepository.save(article);
    }
}