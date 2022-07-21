package com.capstone.Teammate.proxy;

import com.capstone.Teammate.Entity.UserTeam;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-notification",url = "localhost:8084")
public interface UserNotificationProxy
{
    @PostMapping("/api/k4/register")
    ResponseEntity<String> addUser(@RequestBody UserTeam userTeam);

}
