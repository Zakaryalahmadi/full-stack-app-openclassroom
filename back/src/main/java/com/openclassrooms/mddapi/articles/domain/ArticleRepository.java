package com.openclassrooms.mddapi.articles.domain;

import java.util.List;

public interface ArticleRepository {
    List<Article> findAll();

    Article findById(Long id);

    Article save(Article article);
}
