package com.openclassrooms.mddapi.articles.adapter.persistence;

import java.time.LocalDateTime;

import com.openclassrooms.mddapi.topic.adapter.persistence.TopicEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "article")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArticleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private String author;

    @ManyToOne
    @JoinTable(name = "article_topic", joinColumns = @JoinColumn(name = "article_id"), inverseJoinColumns = @JoinColumn(name = "topic_id"))
    private TopicEntity relatedTopic;

    @Column(name = "date_created")
    private LocalDateTime dateCreated;
    @Column(name = "date_updated")
    private LocalDateTime dateUpdated;

    @PrePersist
    public void prePersist() {
        dateCreated = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        dateUpdated = LocalDateTime.now();
    }
}
