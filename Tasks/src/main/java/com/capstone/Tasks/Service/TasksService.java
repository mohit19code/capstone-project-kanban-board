package com.capstone.Tasks.Service;

import com.capstone.Tasks.Entity.Tasks;
import com.capstone.Tasks.Entity.User;
import com.capstone.Tasks.Exception.TaskNotFoundException;
import com.capstone.Tasks.Exception.UserNotFoundException;
import com.capstone.Tasks.Repository.TasksRepository;
import com.capstone.Tasks.proxy.UserProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class TasksService
{
    @Autowired
    TasksRepository tasksRepository;

    @Autowired
    UserProxy userProxy;

    public User saveUser(User user)
    {
        userProxy.addUser(user);
        return tasksRepository.save(user);
    }

    public List<User> getUser()
    {
        return tasksRepository.findAll();
    }

    public User saveTaskToList(Tasks tasks,String email) throws UserNotFoundException
    {
        if(tasksRepository.findById(email).isEmpty())
        {
            throw new UserNotFoundException();
        }

        User user = tasksRepository.findByEmail(email);

        if(user.getTasksList()==null)
        {
            user.setTasksList(Arrays.asList(tasks));
        }
        else
        {
            List<Tasks> tasksList = user.getTasksList();
            tasksList.add(tasks);
            user.setTasksList(tasksList);
        }
        return tasksRepository.save(user);
    }

    public List<Tasks> getAllUserTasks(String email) throws UserNotFoundException
    {
        if(tasksRepository.findById(email).isEmpty())
        {
            throw new UserNotFoundException();
        }
        return tasksRepository.findById(email).get().getTasksList();
    }

    public User deleteUserTaskFromList(String email,int taskId) throws UserNotFoundException, TaskNotFoundException
    {
        boolean taskIsPresent = false;
        if(tasksRepository.findById(email).isEmpty())
        {
            throw new UserNotFoundException();
        }
        User user = tasksRepository.findById(email).get();
        List<Tasks> tasks = user.getTasksList();
        taskIsPresent = tasks.removeIf(x->x.getTaskId()==taskId);

        if(!taskIsPresent)
        {
            throw new TaskNotFoundException();
        }
        user.setTasksList(tasks);
        return tasksRepository.save(user);
    }

    public User updateTaskDetails(String email, int taskId, Tasks task) throws UserNotFoundException,TaskNotFoundException {
        User user = tasksRepository.findByEmail(email);

        boolean taskIsPresent = false;
        if(tasksRepository.findById(email).isEmpty())
        {
            throw new UserNotFoundException();
        }
        else
        {
            List<Tasks> taskList = user.getTasksList();
            for (int i = 0; i < taskList.size(); i++) {
                if (taskList.get(i).getTaskId()==taskId)
                {
                    taskIsPresent=true;
                    taskList.set(i, task);
                    break;
                }
            }
            if(!taskIsPresent)
            {
                throw new TaskNotFoundException();
            }
            user.setTasksList(taskList);
            tasksRepository.save(user);
            return user;
        }
    }


}
