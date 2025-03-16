package com.openclassrooms.mddapi.topic.controller;

import com.openclassrooms.mddapi.topic.adapter.mapper.TopicToTopicPresenterMapper;
import com.openclassrooms.mddapi.topic.controller.presenter.TopicPresenter;
import com.openclassrooms.mddapi.topic.domain.Topic;
import com.openclassrooms.mddapi.topic.services.GetAllTopicService;
import com.openclassrooms.mddapi.topic.services.TopicSubscriptionService;
import com.openclassrooms.mddapi.topic.services.TopicUnSubscriptionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/topic")
public class TopicController {

    private final GetAllTopicService getAllTopicService;
    private final TopicToTopicPresenterMapper topicToTopicPresenterMapper;
    private final TopicSubscriptionService topicSubscriptionService;
    private final TopicUnSubscriptionService topicUnSubscriptionService;

    public TopicController(GetAllTopicService getAllTopicService,
            TopicToTopicPresenterMapper topicToTopicPresenterMapper,
            TopicSubscriptionService topicSubscriptionService, TopicUnSubscriptionService topicUnSubscriptionService) {
        this.getAllTopicService = getAllTopicService;
        this.topicToTopicPresenterMapper = topicToTopicPresenterMapper;
        this.topicSubscriptionService = topicSubscriptionService;
        this.topicUnSubscriptionService = topicUnSubscriptionService;
    }

    @GetMapping("")
    public List<TopicPresenter> getAllTopic() {
        return this.getAllTopicService.handle().stream().map(topicToTopicPresenterMapper).toList();
    }

    @PatchMapping("/{topicId}/follow")
    public TopicPresenter followTopic(@RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long topicId) {
        String token = authorizationHeader.substring(7);

        Topic topic = this.topicSubscriptionService.handle(topicId, token);
        return topicToTopicPresenterMapper.apply(topic);
    }

    @PatchMapping("/{topicId}/unfollow")
    public TopicPresenter unfollowTopic(@RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long topicId) {
        String token = authorizationHeader.substring(7);

        Topic topic = this.topicUnSubscriptionService.handle(topicId, token);
        return topicToTopicPresenterMapper.apply(topic);
    }
}
