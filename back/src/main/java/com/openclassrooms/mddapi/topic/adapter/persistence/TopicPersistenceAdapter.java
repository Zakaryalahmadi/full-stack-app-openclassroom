package com.openclassrooms.mddapi.topic.adapter.persistence;

import com.openclassrooms.mddapi.topic.adapter.mapper.TopicEntityMapper;
import com.openclassrooms.mddapi.topic.domain.Topic;
import com.openclassrooms.mddapi.topic.domain.TopicRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 *
 */
@Repository
public class TopicPersistenceAdapter implements TopicRepository {

    private final TopicJpaRepository topicJpaRepository;
    private final TopicEntityMapper topicEntityMapper;

    public TopicPersistenceAdapter(TopicJpaRepository topicJpaRepository, TopicEntityMapper topicEntityMapper) {
        this.topicJpaRepository = topicJpaRepository;
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
}
