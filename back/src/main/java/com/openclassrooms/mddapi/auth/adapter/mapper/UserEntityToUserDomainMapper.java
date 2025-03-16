package com.openclassrooms.mddapi.auth.adapter.mapper;

import com.openclassrooms.mddapi.auth.adapter.persistence.UserEntity;
import com.openclassrooms.mddapi.auth.domain.User;
import org.springframework.stereotype.Component;

import java.util.function.Function;

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
                userEntity.getDateUpdated());
    }
}
