package com.openclassrooms.mddapi.topic.adapter.persistence;

import com.openclassrooms.mddapi.auth.adapter.persistence.UserEntity;
import com.openclassrooms.mddapi.auth.adapter.persistence.UserJpaRepository;
import com.openclassrooms.mddapi.auth.domain.UserRepository;
import com.openclassrooms.mddapi.auth.exceptions.UserNotFound;
import com.openclassrooms.mddapi.topic.adapter.mapper.TopicEntityMapper;
import com.openclassrooms.mddapi.topic.domain.Topic;
import com.openclassrooms.mddapi.topic.domain.TopicRepository;
import com.openclassrooms.mddapi.topic.exception.TopicNotFound;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 *
 */
@Repository
public class TopicPersistenceAdapter implements TopicRepository {
    private final TopicJpaRepository topicJpaRepository;
    private final UserJpaRepository userJpaRepository;
    private final TopicEntityMapper topicEntityMapper;

    public TopicPersistenceAdapter(TopicJpaRepository topicJpaRepository, UserJpaRepository userJpaRepository, TopicEntityMapper topicEntityMapper) {
        this.topicJpaRepository = topicJpaRepository;
        this.userJpaRepository = userJpaRepository;
        this.topicEntityMapper = topicEntityMapper;
    }

    @Override
    public Optional<Topic> findById(Long id) {
        return this.topicJpaRepository.findById(id).map(topicEntityMapper::toDomain);
    }

    @Override
    public List<Topic> findAll() {
        return this.topicJpaRepository.findAll().stream().map(topicEntityMapper::toDomain).toList();
    }

    @Override
    public Topic save(Topic topic) {
        TopicEntity topicEntity = this.topicEntityMapper.toEntity(topic);

        TopicEntity createdTopicEntity = this.topicJpaRepository.save(topicEntity);

        return this.topicEntityMapper.toDomain(createdTopicEntity);
    }


    @Override
    public Topic followTopic(Long topicId, Long userId) {
        TopicEntity topicEntity = topicJpaRepository.findById(topicId)
                .orElseThrow(() -> new TopicNotFound(topicId));

        UserEntity userEntity = userJpaRepository.findById(userId).orElseThrow(() -> new UserNotFound(userId));

        topicEntity.getSubscribers().add(userEntity);

        TopicEntity savedTopicEntity = topicJpaRepository.save(topicEntity);

        return topicEntityMapper.toDomain(savedTopicEntity);
    }
}
