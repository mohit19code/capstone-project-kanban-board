package com.capstone.Email.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

    @Autowired
    JavaMailSender javaMailSender;

//    @Autowired
//    UserRepository userRepository;

    public void sendEmail(String fromEmail, String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("shravanthraj3@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);
        javaMailSender.send(message);
    }

    public String getPassword(String toEmail){
//        User user=userRepository.findByEmail(toEmail);
//        String password=user.getPassword();
        String password=null;
        return password;
    }
}
