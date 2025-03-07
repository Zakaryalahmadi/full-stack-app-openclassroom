package com.openclassrooms.mddapi.topic.domain;

import com.openclassrooms.mddapi.auth.domain.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Builder
public class Topic {
    private final Long id;
    private final String title;
    private final String description;
    private final LocalDateTime dateCreated;
    private final LocalDateTime dateUpdated;
}
