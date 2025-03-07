package com.openclassrooms.mddapi.auth.domain;

import com.openclassrooms.mddapi.topic.domain.Topic;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    private Long id;
    private String username;
    private String password;
    private String email;
    private LocalDateTime dateCreated;
    private LocalDateTime dateUpdated;
}
