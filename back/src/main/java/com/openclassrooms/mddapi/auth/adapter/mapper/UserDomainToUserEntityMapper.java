package com.openclassrooms.mddapi.auth.adapter.mapper;

import com.openclassrooms.mddapi.auth.adapter.persistence.UserEntity;
import com.openclassrooms.mddapi.auth.domain.User;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class UserDomainToUserEntityMapper implements Function<User, UserEntity> {

    @Override
    public UserEntity apply(User user) {
        return new UserEntity(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getDateCreated(),
                user.getDateUpdated());
    }
}
