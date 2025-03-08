package com.openclassrooms.mddapi.topic.services;

import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.domain.UserRepository;
import com.openclassrooms.mddapi.auth.exceptions.UserNotFound;
import com.openclassrooms.mddapi.topic.domain.Topic;
import com.openclassrooms.mddapi.topic.domain.TopicRepository;
import com.openclassrooms.mddapi.topic.exception.TopicNotFound;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;


@Service
public class TopicSubscriptionService {
    private final TopicRepository topicRepository;

    private final UserRepository userRepository;

    public TopicSubscriptionService(TopicRepository topicRepository, UserRepository userRepository) {
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Topic handle(Long topicId, Long userId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new TopicNotFound(topicId));

        User user = userRepository.findUserById(userId)
                .orElseThrow(() -> new UserNotFound(userId));

        if (topic.getSubscribers() == null) {
            topic.setSubscribers(new HashSet<>());
        }
        topic.getSubscribers().add(user);

        return topicRepository.save(topic);
    }
}
