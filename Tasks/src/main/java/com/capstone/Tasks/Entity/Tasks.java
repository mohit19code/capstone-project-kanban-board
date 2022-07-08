package com.capstone.Tasks.Entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.annotation.processing.Generated;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Tasks
{
    @Id
    private int taskId;
    private String taskName;
    private String taskDescription;
    private String priority;
    private String deadline;
    private List<Team> assignee;
}
