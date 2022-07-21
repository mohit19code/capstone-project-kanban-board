package com.capstone.Teammate.Controller;

import com.capstone.Teammate.Entity.TeamName;
import com.capstone.Teammate.Entity.UserTeam;
import com.capstone.Teammate.Exception.TeammateNotFoundException;
import com.capstone.Teammate.Exception.UserNotFoundException;
import com.capstone.Teammate.Service.TeammateService;
import com.capstone.Teammate.proxy.UserTaskProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/k3/")
public class TeammateController
{
    @Autowired
    TeammateService teammateService;

    @PostMapping("/register")
    public ResponseEntity<String> saveUser(@RequestBody UserTeam userTeam)
    {
        //We check if email is not already taken
        String tempEmail= userTeam.getEmail();
        if(tempEmail!=null && !"".equals(tempEmail)){
            String userObj=teammateService.getAllUser(tempEmail);
            if(userObj!=null){
                return new ResponseEntity<>("User with email already exists.",HttpStatus.OK);
            }
            else{
                teammateService.saveUserTeam(userTeam);
                return new ResponseEntity<>("User Registered", HttpStatus.OK);
            }
        }
        else{
            return new ResponseEntity<>("Invalid email",HttpStatus.OK);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserTeam>> getUser()
    {
        return new ResponseEntity<>(teammateService.getUserTeam(),HttpStatus.OK);
    }

    //For profile
    @GetMapping("/userDetails/{email}")
    public ResponseEntity<List<UserTeam>> getUsers(@PathVariable String email)
    {
        return new ResponseEntity(teammateService.getUserDetails(email),HttpStatus.OK);
    }

    //To add team name to member
    @PostMapping("/user/team/{email}")
    public ResponseEntity<?> saveTeamNameToList(@RequestBody TeamName teamName,
                                                @PathVariable String email) throws UserNotFoundException {
        ResponseEntity responseEntity;
        try
        {
            teammateService.saveTeamNameToList(teamName, email);
            responseEntity = new ResponseEntity<>("Team member saved.", HttpStatus.CREATED);
            return responseEntity;
        }
        catch(UserNotFoundException e)
        {
            throw new UserNotFoundException();
        }
    }

    @GetMapping("/user/team/{email}")
    public ResponseEntity<?> getTeamNameFromList(@PathVariable String email) throws UserNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            responseEntity = new ResponseEntity<>(teammateService.getAllUserTeamName(email),HttpStatus.OK);
        }
        catch (UserNotFoundException e)
        {
            throw new UserNotFoundException();
        }
        return responseEntity;
    }

    //Deletes whole team
    @DeleteMapping("/user/team/{email}/{teamName}")
    public ResponseEntity<?> deleteTeamFromList(@PathVariable String email,@PathVariable String teamName) throws UserNotFoundException, TeammateNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            teammateService.deleteTeamNameFromList(email,teamName);
            responseEntity = new ResponseEntity<>("Team deleted.",HttpStatus.OK);
        }
        catch(UserNotFoundException | TeammateNotFoundException m)
        {
            throw new TeammateNotFoundException();
        }
        return responseEntity;
    }

    //Deleting a team from user
    @DeleteMapping("/delete/team/{teamName}/{email}")
    public ResponseEntity<?> deleteMemberFromTeam(@PathVariable String teamName,
                                                  @PathVariable String email)
    {
        teammateService.deleteMemberFromTeamList(teamName,email);
        return new ResponseEntity<>("Member deleted from team.",HttpStatus.OK);
    }

//    @PutMapping("/user/team/{userEmail}/{memberEmail}")
//    public ResponseEntity<?> updateMemberToList(@PathVariable String userEmail,
//                                                @PathVariable String memberEmail,
//                                                @RequestBody TeamName team) throws TeammateNotFoundException {
//        ResponseEntity responseEntity;
//        try
//        {
//            teammateService.updateTeamMemberList(userEmail, memberEmail, team);
//            responseEntity = new ResponseEntity<>("TeamMember with Email : "+memberEmail+" is Updated",HttpStatus.OK);
//        }
//        catch(TeammateNotFoundException | UserNotFoundException m)
//        {
//            throw new TeammateNotFoundException();
//        }
//        return responseEntity;
//    }

}
