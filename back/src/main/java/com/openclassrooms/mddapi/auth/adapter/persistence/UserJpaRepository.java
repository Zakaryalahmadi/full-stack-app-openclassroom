package com.openclassrooms.mddapi.auth.adapter.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserJpaRepository extends JpaRepository<UserEntity, Long> {
   Optional<UserEntity> findByEmail(String email);
   Optional<UserEntity> findByUsername(String username);
}
