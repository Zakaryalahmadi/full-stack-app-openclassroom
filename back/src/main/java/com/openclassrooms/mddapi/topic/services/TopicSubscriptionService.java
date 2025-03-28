package com.openclassrooms.mddapi.topic.services;

import com.openclassrooms.mddapi.auth.adapter.security.JWTService;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.domain.UserRepository;
import com.openclassrooms.mddapi.auth.exceptions.UserNotFound;
import com.openclassrooms.mddapi.topic.domain.Topic;
import com.openclassrooms.mddapi.topic.domain.TopicRepository;
import com.openclassrooms.mddapi.topic.exception.TopicNotFound;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;


@Service
@Slf4j
public class TopicSubscriptionService {
    private final TopicRepository topicRepository;

    private final UserRepository userRepository;
    private final JWTService jwtService;

    public TopicSubscriptionService(TopicRepository topicRepository, UserRepository userRepository, JWTService jwtService) {
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @Transactional
    public Topic handle(Long topicId, String token) {

        Jwt jwt = jwtService.decodeToken(token);

        Long userId = jwt.getClaim("userId");

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
