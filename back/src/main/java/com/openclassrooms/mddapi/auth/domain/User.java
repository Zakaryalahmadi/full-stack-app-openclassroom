package com.openclassrooms.mddapi.auth.domain;

import lombok.*;

import java.time.LocalDateTime;

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
