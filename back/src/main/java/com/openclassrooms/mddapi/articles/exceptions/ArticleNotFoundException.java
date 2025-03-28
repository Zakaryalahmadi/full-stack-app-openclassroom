package com.openclassrooms.mddapi.articles.exceptions;

public class ArticleNotFoundException extends RuntimeException {
    public ArticleNotFoundException(Long id) {
        super("Article not found with id: " + id);
    }
}
