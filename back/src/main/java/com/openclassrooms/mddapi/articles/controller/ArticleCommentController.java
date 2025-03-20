package com.openclassrooms.mddapi.articles.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.articles.controller.dtos.CreateArticleCommentDto;
import com.openclassrooms.mddapi.articles.controller.presenter.ArticleCommentPresenter;
import com.openclassrooms.mddapi.articles.services.CreateArticleCommentService;
import com.openclassrooms.mddapi.articles.services.GetArticleCommentsService;

@RestController
@RequestMapping("v1/articles/{articleId}/comments")
public class ArticleCommentController {

    private final GetArticleCommentsService getArticleCommentsService;

    private final CreateArticleCommentService createArticleCommentService;

    public ArticleCommentController(GetArticleCommentsService getArticleCommentsService,
            CreateArticleCommentService createArticleCommentService) {
        this.getArticleCommentsService = getArticleCommentsService;
        this.createArticleCommentService = createArticleCommentService;
    }

    @GetMapping
    public List<ArticleCommentPresenter> getArticleComments(@PathVariable Long articleId) {
        return getArticleCommentsService.handle(articleId).stream()
                .map(ArticleCommentPresenter::fromDomain)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ArticleCommentPresenter createArticleComment(
            @PathVariable Long articleId,
            @RequestBody CreateArticleCommentDto createArticleCommentDto,
            @RequestHeader("Authorization") String token) {

        String tokenWithoutBearer = token.substring(7);

        return ArticleCommentPresenter.fromDomain(createArticleCommentService.handle(createArticleCommentDto, articleId,
                tokenWithoutBearer));
    }
}
