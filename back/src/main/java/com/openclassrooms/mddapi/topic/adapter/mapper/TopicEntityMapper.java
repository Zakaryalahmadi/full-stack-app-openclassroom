package com.openclassrooms.mddapi.topic.adapter.mapper;

import com.openclassrooms.mddapi.auth.adapter.mapper.UserDomainToUserEntityMapper;
import com.openclassrooms.mddapi.auth.adapter.mapper.UserEntityToUserDomainMapper;
import com.openclassrooms.mddapi.auth.adapter.persistence.UserEntity;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.topic.adapter.persistence.TopicEntity;
import com.openclassrooms.mddapi.topic.domain.Topic;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class TopicEntityMapper {

    public Topic toDomain(TopicEntity topicEntity){

        return new Topic(
                topicEntity.getId(),
                topicEntity.getTitle(),
                topicEntity.getDescription(),
                topicEntity.getDateCreated(),
                topicEntity.getDateUpdated()
        );
    }

    public TopicEntity toEntity(Topic topic){
        return new TopicEntity(
                topic.getId(),
                topic.getTitle(),
                topic.getDescription(),
                topic.getDateCreated(),
                topic.getDateUpdated()
        );
    }
}
