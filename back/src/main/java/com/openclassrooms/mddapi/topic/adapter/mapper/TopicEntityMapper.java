package com.openclassrooms.mddapi.topic.adapter.mapper;

import com.openclassrooms.mddapi.auth.adapter.mapper.UserDomainToUserEntityMapper;
import com.openclassrooms.mddapi.auth.adapter.mapper.UserEntityToUserDomainMapper;
import com.openclassrooms.mddapi.auth.adapter.persistence.UserEntity;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.topic.adapter.persistence.TopicEntity;
import com.openclassrooms.mddapi.topic.domain.Topic;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class TopicEntityMapper {

    private final UserEntityToUserDomainMapper userEntityToUserDomainMapper;

    public TopicEntityMapper(UserEntityToUserDomainMapper userEntityToUserDomainMapper) {
        this.userEntityToUserDomainMapper = userEntityToUserDomainMapper;
    }

    public Topic toDomain(TopicEntity topicEntity){
        Set<User> subscribers = topicEntity.getSubscribers().stream()
                .map(userEntityToUserDomainMapper)
                .collect(Collectors.toSet());

        return new Topic(
                topicEntity.getId(),
                topicEntity.getTitle(),
                topicEntity.getDescription(),
                subscribers,
                topicEntity.getDateCreated(),
                topicEntity.getDateUpdated()
        );
    }

    public TopicEntity toEntity(Topic topic){

        return new TopicEntity(
                topic.getId(),
                topic.getTitle(),
                topic.getDescription(),
                new HashSet<>(),
                topic.getDateCreated(),
                topic.getDateUpdated()
        );
    }
}
