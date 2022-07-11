package com.capstone.Notifications.Controller;

import com.capstone.Notifications.Entity.UserNotification;
import com.capstone.Notifications.Exception.UserNotFoundException;
import com.capstone.Notifications.Service.NotificationService;
import org.apache.catalina.User;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/k4/")
public class NotificationController
{
    @Autowired
    NotificationService notificationService;

    @PostMapping("/register")
    public ResponseEntity<String> saveUser(@RequestBody UserNotification user)
    {
        notificationService.saveUser(user);
        return new ResponseEntity<>("User Created", HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public ResponseEntity<List<UserNotification>> showUser()
    {
        return new ResponseEntity<>(notificationService.showUser(),HttpStatus.OK);
    }

    @PostMapping("/user/notification/{email}")
    public ResponseEntity<UserNotification> addNotifications(@RequestBody String notification,@PathVariable String email) throws UserNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            notificationService.addNotification(email,notification);
            responseEntity = new ResponseEntity<>("Notification Saved",HttpStatus.CREATED);
        }
        catch(UserNotFoundException e)
        {
            throw new UserNotFoundException();
        }
        return responseEntity;
    }

    @GetMapping("/user/notification/{email}")
    public ResponseEntity<List<UserNotification>> showNotification(@PathVariable String email) throws UserNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            responseEntity = new ResponseEntity<>(notificationService.getAllNotification(email),HttpStatus.OK);
        }
        catch (UserNotFoundException e)
        {
            throw new UserNotFoundException();
        }
        return responseEntity;
    }

    @DeleteMapping("/user/notification/{email}")
    public ResponseEntity<String> deleteNotification(@PathVariable String email) throws UserNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            notificationService.deleteAllNotification(email);
            responseEntity = new ResponseEntity<>("Notifications are Deleted",HttpStatus.OK);
        }
        catch(UserNotFoundException m)
        {
            throw new UserNotFoundException();
        }
        return responseEntity;
    }


}
