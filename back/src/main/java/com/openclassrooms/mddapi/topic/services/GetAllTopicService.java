package com.openclassrooms.mddapi.topic.services;
import com.openclassrooms.mddapi.topic.domain.Topic;
import com.openclassrooms.mddapi.topic.domain.TopicRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetAllTopicService {
    private final TopicRepository topicRepository;

    public GetAllTopicService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public List<Topic> handle(){
        return this.topicRepository.findAll();
    }
}
