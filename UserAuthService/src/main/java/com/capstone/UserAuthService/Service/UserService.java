package com.capstone.UserAuthService.Service;

import com.capstone.UserAuthService.Entity.User;
import com.capstone.UserAuthService.Exception.UserNotFoundException;
import com.capstone.UserAuthService.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService
{
    @Autowired
    UserRepository userRepository;

    public User saveUser(User user)
    {
        return userRepository.save(user);
    }

    public List<User> showUsers()
    {
        return userRepository.findAll();
    }

    public User findByEmailAndPassword(String email,String password) throws UserNotFoundException
    {
        User user = userRepository.findByEmailAndPassword(email,password);
        if(user==null)
        {
            throw new UserNotFoundException();
        }
        return user;
    }


}
