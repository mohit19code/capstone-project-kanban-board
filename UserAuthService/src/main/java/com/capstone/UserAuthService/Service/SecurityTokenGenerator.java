package com.capstone.UserAuthService.Service;
import com.capstone.UserAuthService.Entity.User;

import java.util.Map;

public interface SecurityTokenGenerator {
    Map<String,String> generateToken(User user);
}