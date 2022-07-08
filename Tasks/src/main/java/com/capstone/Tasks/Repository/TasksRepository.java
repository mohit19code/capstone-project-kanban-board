package com.capstone.Tasks.Repository;

import com.capstone.Tasks.Entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TasksRepository extends MongoRepository<User,String>
{
    public User findByEmail(String email);
}
