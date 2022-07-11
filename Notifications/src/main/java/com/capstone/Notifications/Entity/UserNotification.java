package com.capstone.Notifications.Entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserNotification
{
    @Id
    private String email;
    private String name;
    private List<String> notifications;

}
