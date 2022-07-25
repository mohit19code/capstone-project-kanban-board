package com.capstone.Tasks.Controller;

import com.capstone.Tasks.Entity.Tasks;
import com.capstone.Tasks.Entity.Team;
import com.capstone.Tasks.Entity.TeamTask;
import com.capstone.Tasks.Entity.UserTeam;
import com.capstone.Tasks.Exception.TaskNotFoundException;
import com.capstone.Tasks.Exception.TeamNotFoundException;
import com.capstone.Tasks.Exception.UserNotFoundException;
import com.capstone.Tasks.Service.TasksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;
import java.util.List;

@RestController
@RequestMapping("/api/k2/")
public class TasksController
{
    @Autowired
    TasksService tasksService;

//    // To Register User
//    @PostMapping("register")
//    public ResponseEntity<?> registerUser(@RequestBody TeamTask teamTask) throws Exception {
//        //We check if email is not already taken
//        String tempEmail= teamTask.getEmail();
//        if(tempEmail!=null && !"".equals(tempEmail)){
//            String userObj=tasksService.getAllUserTeam(tempEmail);
//            if(userObj!=null){
//                return new ResponseEntity<>("User with email already exists.",HttpStatus.OK);
//            }
//            else{
//                tasksService.saveUser(teamTask);
//                return new ResponseEntity<>("User Registered", HttpStatus.OK);
//            }
//        }
//        else{
//            return new ResponseEntity<>("Invalid email",HttpStatus.OK);
//        }
//    }

//    // To See Registererd Users
//    @GetMapping("users")
//    public ResponseEntity<List<TeamTask>> getUser()
//    {
//        return new ResponseEntity<>(tasksService.getUser(),HttpStatus.OK);
//    }

    @PostMapping("/team/register")
    public ResponseEntity<?> saveTeam(@RequestBody TeamTask teamTask) {
        //We check if team name is not already taken
        String tempTeamName=teamTask.getTeamName();
        String teamNameObj=tasksService.getAllUserTeam(tempTeamName);
        if(teamNameObj!=null){
            return new ResponseEntity<>("Team already exists.",HttpStatus.OK);
        }
        else{
            tasksService.saveUser(teamTask);
            return new ResponseEntity<>("Team saved.", HttpStatus.OK);
        }
    }

    // send the task to team
    @PostMapping("/team/task/{teamName}")
    public ResponseEntity<?> saveUserTaskToList(@RequestBody Tasks tasks,
                                                @PathVariable String teamName) throws UserNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            tasksService.saveTaskToList(tasks,teamName);
            responseEntity = new ResponseEntity<>("Task Saved",HttpStatus.CREATED);
        }
        catch(TeamNotFoundException e)
        {
            throw new UserNotFoundException();
        }
        return responseEntity;
    }

    //send the teammate to team
    @PostMapping("/team/member/{teamName}")
    public ResponseEntity<?> saveTeammateToList(@RequestBody Team team,
                                                @PathVariable String teamName) throws UserNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            tasksService.saveMemberToList(team,teamName);
            responseEntity = new ResponseEntity<>("Member added",HttpStatus.CREATED);
        }
        catch(TeamNotFoundException e)
        {
            throw new UserNotFoundException();
        }
        return responseEntity;
    }


    // To see the Tasks of users
    @GetMapping("/team/tasks/{teamName}")
    public ResponseEntity<?> getAllTeamTasksFromList(@PathVariable String teamName) throws TeamNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            responseEntity = new ResponseEntity<>(tasksService.getAllTeamTasks(teamName),HttpStatus.OK);
        }
        catch (TeamNotFoundException e)
        {
            throw new TeamNotFoundException();
        }
        return responseEntity;
    }

    @GetMapping("/team/member/{teamName}")
    public ResponseEntity<?> getAllUserTasksFromList(@PathVariable String teamName) throws TeamNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            responseEntity = new ResponseEntity<>(tasksService.getAllTeamList(teamName),HttpStatus.OK);
        }
        catch (TeamNotFoundException e)
        {
            throw new TeamNotFoundException();
        }
        return responseEntity;
    }

    // To Delete any task
    @DeleteMapping("/team/task/{teamName}/{taskId}")
    public ResponseEntity<?> deleteTaskFromList(@PathVariable String teamName,@PathVariable int taskId) throws TeamNotFoundException, TaskNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            tasksService.deleteTeamTaskFromList(teamName,taskId);
            responseEntity = new ResponseEntity<>("Task with TaskId : "+taskId+" is Deleted",HttpStatus.OK);
        }
        catch(TeamNotFoundException | TaskNotFoundException m)
        {
            throw new TaskNotFoundException();
        }
        return responseEntity;
    }

    // To Delete any member
    @DeleteMapping("/team/member/{teamName}/{email}")
    public ResponseEntity<?> deleteMemberFromTeamList(@PathVariable String teamName,@PathVariable String email) throws TeamNotFoundException, UserNotFoundException, TaskNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            tasksService.deleteMemberFromTeam(teamName,email);
            responseEntity = new ResponseEntity<>("Member is deleted",HttpStatus.OK);
        }
        catch(TeamNotFoundException | UserNotFoundException m)
        {
            throw new TaskNotFoundException();
        }
        return responseEntity;
    }



    // To update the task
    @PutMapping("/team/task/{teamName}/{taskId}")
    public ResponseEntity<?> updateTask(@PathVariable String teamName,
                                        @PathVariable int taskId,
                                        @RequestBody Tasks task) throws TeamNotFoundException, TaskNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            tasksService.updateTaskDetails(teamName, taskId, task);
            responseEntity = new ResponseEntity<>("Task updated",HttpStatus.OK);
        }
        catch(TaskNotFoundException |TeamNotFoundException m)
        {
            throw new TaskNotFoundException();
        }
        return responseEntity;
    }


    //Get task(Single for edit)
    @GetMapping("/user/task/{teamName}/{taskId}")
    public ResponseEntity<Task> getTask(@PathVariable String teamName, @PathVariable int taskId)
    {
        return new ResponseEntity(tasksService.getTask(teamName,taskId),HttpStatus.OK);
    }
}
