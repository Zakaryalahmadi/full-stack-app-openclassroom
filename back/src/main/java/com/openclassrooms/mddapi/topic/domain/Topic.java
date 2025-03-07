package com.openclassrooms.mddapi.topic.domain;

import com.openclassrooms.mddapi.auth.domain.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Topic {
    private Long id;
    private String title;
    private String description;
    private Set<User> subscribers;
    private LocalDateTime dateCreated;
    private LocalDateTime dateUpdated;
}
