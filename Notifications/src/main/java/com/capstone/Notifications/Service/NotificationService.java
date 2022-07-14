package com.capstone.Notifications.Service;

import com.capstone.Notifications.Entity.UserNotification;
import com.capstone.Notifications.Exception.UserNotFoundException;
import com.capstone.Notifications.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class NotificationService
{
    @Autowired
    NotificationRepository notificationRepository;

    public UserNotification saveUser(UserNotification userNotification)
    {
        return notificationRepository.save(userNotification);
    }

    public List<UserNotification> showUser()
    {
        return notificationRepository.findAll();
    }

    public UserNotification addNotification(String email,String notification) throws UserNotFoundException
    {
        if(notificationRepository.findById(email).isEmpty())
        {
            throw new UserNotFoundException();
        }

        UserNotification user = notificationRepository.findByEmail(email);

        if(user.getNotifications()==null)
        {
            user.setNotifications(Arrays.asList(notification));
        }
        else
        {
            List<String> notificationList = user.getNotifications();
            notificationList.add(notification);
            user.setNotifications(notificationList);
        }
        return notificationRepository.save(user);
    }


    public List<String> getAllNotification(String email) throws UserNotFoundException
    {
        if(notificationRepository.findById(email).isEmpty()) {
            throw new UserNotFoundException();
        }
        return notificationRepository.findById(email).get().getNotifications();
    }

    public UserNotification deleteAllNotification(String email) throws UserNotFoundException
    {
        if(notificationRepository.findById(email).isEmpty())
        {
            throw new UserNotFoundException();
        }

        UserNotification user = notificationRepository.findByEmail(email);
        user.setNotifications(null);

        return notificationRepository.save(user);
    }

}
