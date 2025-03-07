package com.openclassrooms.mddapi.topic.adapter.persistence;


import com.openclassrooms.mddapi.auth.adapter.persistence.UserEntity;
import com.openclassrooms.mddapi.auth.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "topic")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TopicEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;


    @Column(nullable = false, name = "date_created")
    private LocalDateTime dateCreated;

    @Column(nullable = false, name = "date_updated")
    private LocalDateTime dateUpdated;


    @PrePersist
    protected void onCreate() {
        this.dateCreated = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.dateUpdated = LocalDateTime.now();
    }
}
