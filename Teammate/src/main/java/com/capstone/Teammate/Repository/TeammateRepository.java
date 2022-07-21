package com.capstone.Teammate.Repository;

import com.capstone.Teammate.Entity.TeamName;
import com.capstone.Teammate.Entity.UserTeam;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeammateRepository extends MongoRepository<UserTeam,String> {
    public UserTeam findByEmail(String email);
}
