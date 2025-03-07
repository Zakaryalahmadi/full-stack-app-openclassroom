package com.openclassrooms.mddapi.topic.controller;



import com.openclassrooms.mddapi.topic.adapter.mapper.TopicToTopicPresenterMapper;
import com.openclassrooms.mddapi.topic.controller.presenter.TopicPresenter;
import com.openclassrooms.mddapi.topic.domain.Topic;
import com.openclassrooms.mddapi.topic.services.GetAllTopicService;
import com.openclassrooms.mddapi.topic.services.TopicSubscriptionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/topic")
public class TopicController {

    private final GetAllTopicService getAllTopicService;
    private final TopicToTopicPresenterMapper topicToTopicPresenterMapper;
    private final TopicSubscriptionService topicSubscriptionService;

    public TopicController(GetAllTopicService getAllTopicService, TopicToTopicPresenterMapper topicToTopicPresenterMapper, TopicSubscriptionService topicSubscriptionService) {
        this.getAllTopicService = getAllTopicService;
        this.topicToTopicPresenterMapper = topicToTopicPresenterMapper;
        this.topicSubscriptionService = topicSubscriptionService;
    }

    @GetMapping("")
    public List<TopicPresenter> getAllTopic(){
        return this.getAllTopicService.handle().stream().map(topicToTopicPresenterMapper).toList();
    }

//    @PostMapping("/{topicId}/follow")
//    public TopicPresenter followTopic(@PathVariable Long topicId, @RequestParam Long userId) {
//        Topic topic = this.topicSubscriptionService.handle(topicId, userId);
//        return topicToTopicPresenterMapper.apply(topic);
//    }
}
