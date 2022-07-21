package com.capstone.Tasks.Entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class TeamTask
{
    @Id
    private String teamName;
    private List<Team> teamList;
    private List<Tasks> tasksList;
}
