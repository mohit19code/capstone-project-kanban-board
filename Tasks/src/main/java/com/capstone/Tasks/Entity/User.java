package com.capstone.Tasks.Entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class User
{
    @Id
    private String email;
    private String name;
    @Transient
    private String password;
    private long mobileNo;
    private List<Tasks> tasksList;
    private List<Team> teamList;
    private List<String> notifications;

}
