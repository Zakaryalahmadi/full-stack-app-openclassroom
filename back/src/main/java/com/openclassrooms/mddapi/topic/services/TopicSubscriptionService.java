package com.openclassrooms.mddapi.topic.services;

import com.openclassrooms.mddapi.auth.adapter.persistence.UserEntity;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.domain.UserRepository;
import com.openclassrooms.mddapi.auth.exceptions.UserNotFound;
import com.openclassrooms.mddapi.topic.adapter.mapper.TopicEntityMapper;
import com.openclassrooms.mddapi.topic.domain.Topic;
import com.openclassrooms.mddapi.topic.domain.TopicRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class TopicSubscriptionService {
    private final TopicRepository topicRepository;
    private final UserRepository userRepository;
    private final TopicEntityMapper topicEntityMapper;

    public TopicSubscriptionService(TopicRepository topicRepository, UserRepository userRepository, TopicEntityMapper topicEntityMapper) {
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
        this.topicEntityMapper = topicEntityMapper;
    }

    public void handle(Long topicId,Long userId){


    }
}
