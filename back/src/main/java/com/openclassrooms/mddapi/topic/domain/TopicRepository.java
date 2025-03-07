package com.openclassrooms.mddapi.topic.domain;

import java.util.List;
import java.util.Optional;

public interface TopicRepository {
    Optional<Topic> findById(Long id);
    List<Topic> findAll();
    Topic save(Topic topic);
    Topic followTopic(Long topicId, Long userId);
}
