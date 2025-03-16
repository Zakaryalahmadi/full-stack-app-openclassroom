package com.openclassrooms.mddapi.articles.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.articles.controller.dtos.CreateArticleDto;
import com.openclassrooms.mddapi.articles.controller.presenter.ArticlePresenter;
import com.openclassrooms.mddapi.articles.services.CreateArticleService;
import com.openclassrooms.mddapi.articles.services.GetArticlesService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("v1/articles")
public class ArticleController {
    private final CreateArticleService createArticleService;
    private final GetArticlesService getArticlesService;

    public ArticleController(CreateArticleService createArticleService, GetArticlesService getArticlesService) {
        this.createArticleService = createArticleService;
        this.getArticlesService = getArticlesService;
    }

    @PostMapping
    public ArticlePresenter createArticle(@RequestBody @Valid CreateArticleDto createArticleDto,
            @RequestHeader("Authorization") String token) {

        String tokenWithoutBearer = token.substring(7);
        return ArticlePresenter.fromDomain(createArticleService.handle(createArticleDto, tokenWithoutBearer));
    }

    @GetMapping
    public List<ArticlePresenter> getArticles() {
        return getArticlesService.handle().stream()
                .map(ArticlePresenter::fromDomain)
                .collect(Collectors.toList());
    }
}
