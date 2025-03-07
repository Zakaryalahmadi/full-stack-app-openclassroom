package com.openclassrooms.mddapi.topic.adapter.persistence;


import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicJpaRepository extends JpaRepository<TopicEntity, Long> {
}
