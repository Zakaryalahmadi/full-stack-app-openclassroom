package com.openclassrooms.mddapi.topic.services;

import com.openclassrooms.mddapi.auth.adapter.security.JWTService;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.domain.UserRepository;
import com.openclassrooms.mddapi.auth.exceptions.UserNotFound;
import com.openclassrooms.mddapi.topic.domain.Topic;
import com.openclassrooms.mddapi.topic.domain.TopicRepository;
import com.openclassrooms.mddapi.topic.exception.TopicNotFound;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TopicUnSubscriptionService {
    private final TopicRepository topicRepository;
    private  final UserRepository userRepository;
    private final JWTService jwtService;

    public TopicUnSubscriptionService(TopicRepository topicRepository, UserRepository userRepository, JWTService jwtService) {
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public Topic handle(Long topicId, String token) {
        Topic topic = this.topicRepository.findById(topicId).orElseThrow(() -> new TopicNotFound(topicId));

        Jwt jwt = this.jwtService.decodeToken(token);

        Long userId = jwt.getClaim("userId");

        User user = this.userRepository.findUserById(userId).orElseThrow(() -> new UserNotFound(userId));

        if(topic.getSubscribers() != null){
            topic.getSubscribers().remove(user);
        }

        return this.topicRepository.save(topic);
    }
}
