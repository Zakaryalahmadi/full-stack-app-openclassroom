package com.openclassrooms.mddapi.auth.adapter.mapper;

import com.openclassrooms.mddapi.auth.adapter.persistence.UserEntity;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.topic.adapter.mapper.TopicEntityMapper;
import com.openclassrooms.mddapi.topic.domain.Topic;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class UserEntityToUserDomainMapper implements Function<UserEntity, User> {

    @Override
    public User apply(UserEntity userEntity) {
        return new User(
                userEntity.getId(),
                userEntity.getUsername(),
                userEntity.getPassword(),
                userEntity.getEmail(),
                userEntity.getDateCreated(),
                userEntity.getDateUpdated()
        );
    }
}
