package com.capstone.Teammate.proxy;

import com.capstone.Teammate.Entity.UserTeam;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name= "user-tasks" ,url = "localhost:8082" )
public interface UserTaskProxy
{
    @PostMapping("/api/k2/team/register")
    ResponseEntity<String> addTeam(@RequestBody UserTeam userTeam);
}
