package com.openclassrooms.mddapi.articles.domain;

import java.util.List;

public interface ArticleCommentRepository {
    List<ArticleComment> findAll();

    ArticleComment save(ArticleComment articleComment);
}
