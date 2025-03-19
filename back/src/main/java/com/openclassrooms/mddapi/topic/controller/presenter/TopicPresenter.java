package com.openclassrooms.mddapi.topic.controller.presenter;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.topic.domain.Topic;

import lombok.Builder;

@Builder
public record TopicPresenter(Long id, String title, String description, Set<Long> subscriberIds, String dateCreated,
        String dateUpdated) {
    public static TopicPresenter fromDomain(Topic topic) {

        Set<Long> subscriberIds = topic.getSubscribers().stream()
                .map(User::getId)
                .collect(Collectors.toSet());

        return TopicPresenter.builder()
                .id(topic.getId())
                .title(topic.getTitle())
                .description(topic.getDescription())
                .subscriberIds(subscriberIds)
                .dateCreated(topic.getDateCreated().toString())
                .dateUpdated(topic.getDateUpdated().toString())
                .build();
    }
}
