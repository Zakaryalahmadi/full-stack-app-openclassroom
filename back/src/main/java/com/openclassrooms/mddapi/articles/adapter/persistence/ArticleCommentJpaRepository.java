package com.openclassrooms.mddapi.articles.adapter.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleCommentJpaRepository extends JpaRepository<ArticleCommentEntity, Long> {
}
