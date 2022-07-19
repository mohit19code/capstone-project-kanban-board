package com.capstone.Tasks.Controller;

import com.capstone.Tasks.Entity.Tasks;
import com.capstone.Tasks.Entity.Team;
import com.capstone.Tasks.Entity.User;
import com.capstone.Tasks.Exception.TaskNotFoundException;
import com.capstone.Tasks.Exception.UserExistsException;
import com.capstone.Tasks.Exception.UserNotFoundException;
import com.capstone.Tasks.Service.TasksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/k2/")
public class TasksController
{
    @Autowired
    TasksService tasksService;

    // To Register User
    @PostMapping("register")
    public ResponseEntity<?> registerUser(@RequestBody User user) throws Exception {
        //We check if email is not already taken
        String tempEmail=user.getEmail();
        if(tempEmail!=null && !"".equals(tempEmail)){
            String userObj=tasksService.getAllUserTeam(tempEmail);
            if(userObj!=null){
                return new ResponseEntity<>("User with email already exists.",HttpStatus.OK);
            }
            else{
                tasksService.saveUser(user);
                return new ResponseEntity<>("User Registered", HttpStatus.OK);
            }
        }
        else{
            return new ResponseEntity<>("Invalid email",HttpStatus.OK);
        }
//        return responseEntity;

//        System.out.println("REGISTER");
//        ResponseEntity responseEntity=null;
//        try {
//            String email = user.getEmail();
//            String allUserTeam = tasksService.getAllUserTeam(email);
//            System.out.println("ALL USER TEAM : "+allUserTeam);
//            if (allUserTeam==null) {
//                System.out.println("Inside IF");
//                tasksService.saveUser(user);
//                responseEntity= new ResponseEntity<>("User Registered", HttpStatus.CREATED);
//            }else {
//                System.out.println("Outside IF of cont");
//                responseEntity = new ResponseEntity<>("User exists.", HttpStatus.NOT_FOUND);
//            }
//        }
//        catch (Exception e){
//            System.out.println(e);
//        }
//        System.out.println("RE : "+responseEntity);
//        return responseEntity;
    }

    // To See Registererd Users
    @GetMapping("users")
    public ResponseEntity<List<User>> getUser()
    {
        return new ResponseEntity<>(tasksService.getUser(),HttpStatus.OK);
    }


    // send the task to User
    @PostMapping("/user/task/{email}")
    public ResponseEntity<?> saveUserTaskToList(@RequestBody Tasks tasks, @PathVariable String email) throws UserNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            tasksService.saveTaskToList(tasks,email);
            responseEntity = new ResponseEntity<>("Task Saved",HttpStatus.CREATED);
        }
        catch(UserNotFoundException e)
        {
            throw new UserNotFoundException();
        }
        return responseEntity;
    }

    // To see the Tasks of users
    @GetMapping("/user/tasks/{email}")
    public ResponseEntity<?> getAllUSerTasksFromList(@PathVariable String email) throws UserNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            responseEntity = new ResponseEntity<>(tasksService.getAllUserTasks(email),HttpStatus.OK);
        }
        catch (UserNotFoundException e)
        {
            throw new UserNotFoundException();
        }
        return responseEntity;
    }

    // To Delete any task
    @DeleteMapping("/user/task/{email}/{taskId}")
    public ResponseEntity<?> deleteUserTaskFromList(@PathVariable String email,@PathVariable int taskId) throws UserNotFoundException, TaskNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            tasksService.deleteUserTaskFromList(email,taskId);
            responseEntity = new ResponseEntity<>("Task with TaskId : "+taskId+" is Deleted",HttpStatus.OK);
        }
        catch(UserNotFoundException | TaskNotFoundException m)
        {
            throw new TaskNotFoundException();
        }
        return responseEntity;
    }

    // To update the task
    @PutMapping("/user/task/{email}/{taskId}")
    public ResponseEntity<?> updateTask(@PathVariable String email, @PathVariable int taskId, @RequestBody Tasks task) throws TaskNotFoundException
    {
        ResponseEntity responseEntity;
        try
        {
            tasksService.updateTaskDetails(email, taskId, task);
            responseEntity = new ResponseEntity<>("Task with TaskId : "+taskId+" is Updated",HttpStatus.OK);
        }
        catch(TaskNotFoundException | UserNotFoundException m)
        {
            throw new TaskNotFoundException();
        }
        return responseEntity;
    }

    //For profile
    @GetMapping("/userDetails/{email}")
    public ResponseEntity<List<User>> getUsers(@PathVariable String email)
    {
        return new ResponseEntity(tasksService.getUserDetails(email),HttpStatus.OK);
    }

    //Get task(Single for edit)
    @GetMapping("/user/task/{email}/{taskId}")
    public ResponseEntity<Task> getTask(@PathVariable String email, @PathVariable int taskId)
    {
        return new ResponseEntity(tasksService.getTask(email,taskId),HttpStatus.OK);
    }
}
