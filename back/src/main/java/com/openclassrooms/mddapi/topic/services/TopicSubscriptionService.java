package com.openclassrooms.mddapi.topic.services;

import com.openclassrooms.mddapi.topic.domain.Topic;
import com.openclassrooms.mddapi.topic.domain.TopicRepository;
import org.springframework.stereotype.Service;


@Service
public class TopicSubscriptionService {
    private final TopicRepository topicRepository;

    public TopicSubscriptionService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public Topic handle(Long topicId, Long userId) {
        return this.topicRepository.followTopic(topicId, userId);
    }
}
