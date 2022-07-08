package com.capstone.Tasks.Entity;

import lombok.*;
import org.springframework.data.annotation.Id;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
@Getter
public class Team
{
    @Id
    private String email;
    private String name;
}
