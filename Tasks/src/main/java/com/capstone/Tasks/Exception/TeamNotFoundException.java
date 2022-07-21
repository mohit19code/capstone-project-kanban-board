package com.capstone.Tasks.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NOT_FOUND,reason = "Team Not Found")
public class TeamNotFoundException extends Exception{
}
