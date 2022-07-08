package com.capstone.UserAuthService.Exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "No such user exists.")
public class UserNotFoundException extends Throwable
{

}
