package com.openclassrooms.mddapi.topic.adapter.mapper;

import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.topic.controller.presenter.TopicPresenter;
import com.openclassrooms.mddapi.topic.domain.Topic;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class TopicToTopicPresenterMapper implements Function<Topic, TopicPresenter> {
    @Override
    public TopicPresenter apply(Topic topic) {

        Set<Long> subscriberIds = topic.getSubscribers().stream()
                .map(User::getId)
                .collect(Collectors.toSet());

        return new TopicPresenter(
                topic.getId(),
                topic.getTitle(),
                topic.getDescription(),
                subscriberIds,
                topic.getDateCreated().toString(),
                topic.getDateUpdated().toString()
        );
    }
}
