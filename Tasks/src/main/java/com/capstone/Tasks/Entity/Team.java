package com.capstone.Tasks.Entity;

import lombok.*;
import org.springframework.data.annotation.Id;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Team {
    @Id
    String email;
}
