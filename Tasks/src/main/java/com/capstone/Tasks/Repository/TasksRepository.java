package com.capstone.Tasks.Repository;

import com.capstone.Tasks.Entity.TeamTask;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TasksRepository extends MongoRepository<TeamTask,String>
{
    public TeamTask findByTeamName(String teamName);
}
