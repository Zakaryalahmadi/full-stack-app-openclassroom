package com.openclassrooms.mddapi.topic.controller.presenter;

import java.util.List;
import java.util.Set;

public record  TopicPresenter (Long id, String title, String Description, Set<Long> subscriberIds, String dateCreated, String dateUpdated){}
