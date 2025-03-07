package com.openclassrooms.mddapi.topic.adapter.mapper;

import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.topic.controller.presenter.TopicPresenter;
import com.openclassrooms.mddapi.topic.domain.Topic;
import org.springframework.stereotype.Component;
import java.util.function.Function;

@Component
public class TopicToTopicPresenterMapper implements Function<Topic, TopicPresenter> {
    @Override
    public TopicPresenter apply(Topic topic) {
        return new TopicPresenter(
                topic.getId(),
                topic.getTitle(),
                topic.getDescription(),
                topic.getDateCreated().toString(),
                topic.getDateUpdated().toString()
        );
    }
}
