package com.capstone.Teammate.proxy;


import com.capstone.Teammate.Entity.UserTeam;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-authentication-service",url = "localhost:8081")
public interface UserProxy {

    @PostMapping("/api/k1/register")
    ResponseEntity<String> addUser(@RequestBody UserTeam userTeam);
}
