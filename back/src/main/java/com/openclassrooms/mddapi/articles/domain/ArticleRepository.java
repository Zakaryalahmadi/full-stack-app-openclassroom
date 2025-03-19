package com.openclassrooms.mddapi.articles.domain;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository {
    List<Article> findAll(Boolean ascending);

    Optional<Article> findById(Long id);

    Article save(Article article);
}
