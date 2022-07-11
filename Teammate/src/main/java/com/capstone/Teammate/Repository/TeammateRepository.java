package com.capstone.Teammate.Repository;

import com.capstone.Teammate.Entity.UserTeam;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeammateRepository extends MongoRepository<UserTeam,String> {
    public UserTeam findByEmail(String email);
}
