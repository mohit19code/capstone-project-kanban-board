package com.capstone.Teammate.Entity;

import lombok.*;
import org.springframework.data.annotation.Id;


@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
@Getter
public class TeamName
{
    @Id
    private String teamName;
}