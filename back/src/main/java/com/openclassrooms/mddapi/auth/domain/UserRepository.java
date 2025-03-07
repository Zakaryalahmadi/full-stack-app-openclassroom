package com.openclassrooms.mddapi.auth.domain;

import java.util.Optional;

public interface UserRepository {
    Optional<User> findUserById(Long id);
    User save(User user);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
}

