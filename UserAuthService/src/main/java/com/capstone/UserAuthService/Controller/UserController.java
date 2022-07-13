package com.capstone.UserAuthService.Controller;

import com.capstone.UserAuthService.Entity.User;
import com.capstone.UserAuthService.Exception.UserNotFoundException;

import com.capstone.UserAuthService.Service.JWTSecurityTokenGenerator;
import com.capstone.UserAuthService.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/k1/")
public class UserController
{
    @Autowired
    UserService userService;

    @Autowired
    JWTSecurityTokenGenerator jwtSecurityTokenGenerator;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user)
    {
        return new ResponseEntity<User>(userService.saveUser(user), HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> getUsers()
    {
           return new ResponseEntity<List<User>>(userService.showUsers(),HttpStatus.OK);
    }


    @PostMapping("/login")
    public ResponseEntity<?> checkLogin(@RequestBody User user)throws ClassNotFoundException
    {

        ResponseEntity responseEntity = null;
     try {
         User requestedUser=userService.findByEmailAndPassword(user.getEmail(),user.getPassword());

         if(requestedUser.getEmail().equals(user.getEmail())){
             Map<String,String> tokenMap= jwtSecurityTokenGenerator.generateToken(requestedUser);
             responseEntity = new ResponseEntity<>(tokenMap,HttpStatus.OK);
         }
         else {
             responseEntity = new ResponseEntity<>("Invalid Login Details.", HttpStatus.NOT_FOUND);
         }

     } catch (UserNotFoundException e) {
         e.printStackTrace();
     }
    return responseEntity;
    }

}
