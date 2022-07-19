package com.capstone.Teammate.Controller;

import com.capstone.Teammate.Entity.Team;
import com.capstone.Teammate.Entity.UserTeam;
import com.capstone.Teammate.Exception.TeammateNotFoundException;
import com.capstone.Teammate.Exception.UserNotFoundException;
import com.capstone.Teammate.Service.TeammateService;
import org.apache.catalina.User;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
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
        teammateService.saveUserTeam(userTeam);
        return new ResponseEntity<>("User Is Added", HttpStatus.CREATED);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserTeam>> getUser()
    {
        return new ResponseEntity<>(teammateService.getUserTeam(),HttpStatus.OK);
    }

    @PostMapping("/user/team/{email}")
    public ResponseEntity<?> saveTeamMemberToList(@RequestBody Team team,@PathVariable String email) throws UserNotFoundException {
        ResponseEntity responseEntity;
        try
        {
            List<Team> allUserTeam = teammateService.getAllUserTeam(email);
            if(allUserTeam!=null){
                for (int i=0;i<allUserTeam.size(); i++)
                {
                    if (allUserTeam.get(i).getEmail().equals(team.getEmail())) {
                        responseEntity = new ResponseEntity<>("Team Member Already Exists", HttpStatus.OK);
                        return responseEntity;
                    }
                }
            }
            teammateService.saveMemberToList(team, email);
            responseEntity = new ResponseEntity<>("Team Member Saved", HttpStatus.CREATED);
            return responseEntity;
        }
        catch(UserNotFoundException e)
        {
            throw new UserNotFoundException();
        }
    }

    @GetMapping("/user/team/{email}")
    public ResponseEntity<?> getTeamMemberFromList(@PathVariable String email) throws UserNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            responseEntity = new ResponseEntity<>(teammateService.getAllUserTeam(email),HttpStatus.OK);
        }
        catch (UserNotFoundException e)
        {
            throw new UserNotFoundException();
        }
        return responseEntity;
    }


    @DeleteMapping("/user/team/{userEmail}/{memberEmail}")
    public ResponseEntity<?> deleteMemberFromList(@PathVariable String userEmail,@PathVariable String memberEmail) throws UserNotFoundException, TeammateNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            teammateService.deleteTeamMemberFromList(userEmail,memberEmail);
            responseEntity = new ResponseEntity<>("Team Member with MemberEmail : "+memberEmail+" is Deleted",HttpStatus.OK);
        }
        catch(UserNotFoundException | TeammateNotFoundException m)
        {
            throw new TeammateNotFoundException();
        }
        return responseEntity;
    }

    @PutMapping("/user/team/{userEmail}/{memberEmail}")
    public ResponseEntity<?> updateMemberToList(@PathVariable String userEmail,
                                                @PathVariable String memberEmail,
                                                @RequestBody Team team) throws TeammateNotFoundException {
        ResponseEntity responseEntity;
        try
        {
            teammateService.updateTeamMemberList(userEmail, memberEmail, team);
            responseEntity = new ResponseEntity<>("TeamMember with Email : "+memberEmail+" is Updated",HttpStatus.OK);
        }
        catch(TeammateNotFoundException | UserNotFoundException m)
        {
            throw new TeammateNotFoundException();
        }
        return responseEntity;
    }

}
