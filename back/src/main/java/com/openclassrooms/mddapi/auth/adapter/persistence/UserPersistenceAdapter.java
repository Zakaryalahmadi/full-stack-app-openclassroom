package com.openclassrooms.mddapi.auth.adapter.persistence;

import com.openclassrooms.mddapi.auth.adapter.mapper.UserDomainToUserEntityMapper;
import com.openclassrooms.mddapi.auth.adapter.mapper.UserEntityToUserDomainMapper;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.domain.UserRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserPersistenceAdapter implements UserRepository {
    private final UserJpaRepository userJpaRepository;

    private final UserEntityToUserDomainMapper userEntityToUserDomainMapper;

    private final UserDomainToUserEntityMapper userDomainToUserEntityMapper;

    public UserPersistenceAdapter(UserJpaRepository userJpaRepository, UserEntityToUserDomainMapper userEntityToUserDomainMapper, UserDomainToUserEntityMapper userDomainToUserEntityMapper) {
        this.userJpaRepository = userJpaRepository;
        this.userEntityToUserDomainMapper = userEntityToUserDomainMapper;
        this.userDomainToUserEntityMapper = userDomainToUserEntityMapper;
    }

    @Override
    public Optional<User> findUserById(Long id) {
        return this.userJpaRepository.findById(id).map(userEntityToUserDomainMapper);
    }

    @Override
    public User save(User user) {
        UserEntity userEntity = userDomainToUserEntityMapper.apply(user);
        UserEntity createdUserEntity = this.userJpaRepository.save(userEntity);

        return userEntityToUserDomainMapper.apply(createdUserEntity);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return this.userJpaRepository.findByEmail(email).map(userEntityToUserDomainMapper);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return this.userJpaRepository.findByUsername(username).map(userEntityToUserDomainMapper);
    }
}
