package com.capstone.Teammate.Entity;

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
public class UserTeam
{
    @Id
    private String email;
    private String name;
    private List<Team> teamList;
}
