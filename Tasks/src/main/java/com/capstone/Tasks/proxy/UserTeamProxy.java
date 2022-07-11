package com.capstone.Tasks.proxy;

import com.capstone.Tasks.Entity.User;
import org.apache.coyote.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name= "user-team" ,url = "localhost:8083" )
public interface UserTeamProxy
{
    @PostMapping("/api/k3/register")
    ResponseEntity<String> addTeam(@RequestBody User user);
}
