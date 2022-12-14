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
    public ResponseEntity<?> inviteUser(@PathVariable String fromEmail,
                           @PathVariable String toEmail){
        emailSenderService.sendEmail(fromEmail,toEmail,"Invite to join team!","Kindly use the link http://localhost:4200/signup to sign-up/join team ABC.");
        return new ResponseEntity<>("Invite sent!",HttpStatus.OK);
    }

    @GetMapping("/otp/{toEmail}/{OTP}")
    public ResponseEntity<?> sendOTPToUser(@PathVariable String toEmail, @PathVariable String OTP){
        emailSenderService.sendOTPEmail(toEmail,"OTP to reset password","Your OTP is "+OTP);
        return new ResponseEntity<>("OTP sent!",HttpStatus.OK);
    }

}
