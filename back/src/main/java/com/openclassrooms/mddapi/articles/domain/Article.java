package com.openclassrooms.mddapi.articles.domain;

import java.time.LocalDateTime;

import com.openclassrooms.mddapi.topic.domain.Topic;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Article {
    private Long id;
    private String title;
    private String content;
    private String author;
    private Topic relatedTopic;
    private LocalDateTime dateCreated;
    private LocalDateTime dateUpdated;
}
