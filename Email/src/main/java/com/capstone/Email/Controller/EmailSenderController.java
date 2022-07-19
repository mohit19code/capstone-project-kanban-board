package com.capstone.Email.Controller;


import com.capstone.Email.Service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/k5/")
public class EmailSenderController {

    @Autowired
    EmailSenderService emailSenderService;


    @GetMapping("/invite/{fromEmail}/{toEmail}")
    public void inviteUser(@PathVariable String fromEmail,
                           @PathVariable String toEmail){
        emailSenderService.sendEmail(fromEmail,toEmail,"Invite to join team!","Kindly use the link http://localhost:4200/signup to sign-up/join team ABC.");
    }

    @GetMapping("/forgotPassword/{fromEmail}/{toEmail}")
    public void forgotPassword(@PathVariable String fromEmail,
                           @PathVariable String toEmail){
        String password=emailSenderService.getPassword(toEmail);
        emailSenderService.sendEmail(fromEmail,toEmail,"Password to access account","Your password is '"+password+"'.");
    }


//    @GetMapping("/user")
//    public ResponseEntity<List<User>> getUsers()
//    {
//        return new ResponseEntity<List<User>>(userService.showUsers(), HttpStatus.OK);
//    }

}
