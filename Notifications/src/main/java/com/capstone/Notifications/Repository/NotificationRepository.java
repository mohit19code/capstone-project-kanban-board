package com.capstone.Notifications.Repository;

import com.capstone.Notifications.Entity.UserNotification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends MongoRepository<UserNotification,String>
{
    public UserNotification findByEmail(String email);
}
