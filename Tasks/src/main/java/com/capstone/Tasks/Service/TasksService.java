package com.capstone.Tasks.Service;

import com.capstone.Tasks.Entity.Tasks;
import com.capstone.Tasks.Entity.Team;
import com.capstone.Tasks.Entity.TeamTask;
import com.capstone.Tasks.Exception.TaskNotFoundException;
import com.capstone.Tasks.Exception.TeamNotFoundException;
import com.capstone.Tasks.Exception.UserNotFoundException;
import com.capstone.Tasks.Repository.TasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class TasksService
{
    @Autowired
    TasksRepository tasksRepository;

    public String getAllUserTeam(String email)
    {
        if(tasksRepository.findById(email).isEmpty())
        {
            return null;
        }
        return tasksRepository.findById(email).get().getTeamName();
    }

    public TeamTask saveUser(TeamTask teamTask)
    {
//        userProxy.addUser(teamTask);
//        userTeamProxy.addTeam(teamTask);
//        userNotificationProxy.addUser(teamTask);
        return tasksRepository.save(teamTask);
    }

    public List<TeamTask> getUser()
    {
        return tasksRepository.findAll();
    }

    public TeamTask saveTaskToList(Tasks tasks, String teamName) throws TeamNotFoundException
    {
        if(tasksRepository.findById(teamName).isEmpty())
        {
            throw new TeamNotFoundException();
        }

        TeamTask teamTask = tasksRepository.findByTeamName(teamName);

        if(teamTask.getTasksList()==null)
        {
            teamTask.setTasksList(Arrays.asList(tasks));
        }
        else
        {
            List<Tasks> tasksList = teamTask.getTasksList();
            tasksList.add(tasks);
            teamTask.setTasksList(tasksList);
        }


        return tasksRepository.save(teamTask);
    }

    public TeamTask saveMemberToList(Team team, String teamName) throws TeamNotFoundException{
        if(tasksRepository.findById(teamName).isEmpty())
        {
            throw new TeamNotFoundException();
        }

        TeamTask teamTask = tasksRepository.findByTeamName(teamName);

        if(teamTask.getTeamList()==null){
            teamTask.setTeamList(Arrays.asList((team)));
        }
        else{
            List<Team> teamList=teamTask.getTeamList();
            teamList.add(team);
            teamTask.setTeamList(teamList);
        }
        return tasksRepository.save(teamTask);
    }

    public List<Tasks> getAllTeamTasks(String teamName) throws TeamNotFoundException
    {
        if(tasksRepository.findById(teamName).isEmpty())
        {
            throw new TeamNotFoundException();
        }
        return tasksRepository.findById(teamName).get().getTasksList();
    }

    public List<Team> getAllTeamList(String teamName) throws TeamNotFoundException
    {
        if(tasksRepository.findById(teamName).isEmpty())
        {
            throw new TeamNotFoundException();
        }
        return tasksRepository.findById(teamName).get().getTeamList();
    }

    public TeamTask deleteTeamTaskFromList(String teamName, int taskId) throws TeamNotFoundException, TaskNotFoundException
    {
        boolean taskIsPresent = false;
        if(tasksRepository.findById(teamName).isEmpty())
        {
            throw new TeamNotFoundException();
        }
        TeamTask teamTask = tasksRepository.findById(teamName).get();
        List<Tasks> tasks = teamTask.getTasksList();
        taskIsPresent = tasks.removeIf(x->x.getTaskId()==taskId);

        if(!taskIsPresent)
        {
            throw new TaskNotFoundException();
        }
        teamTask.setTasksList(tasks);
        return tasksRepository.save(teamTask);
    }

    public TeamTask deleteMemberFromTeam(String teamName, String email) throws TeamNotFoundException, UserNotFoundException
    {
        boolean memberIsPresent = false;
        if(tasksRepository.findById(teamName).isEmpty())
        {
            throw new TeamNotFoundException();
        }
        TeamTask teamTask = tasksRepository.findById(teamName).get();
        List<Team> teams = teamTask.getTeamList();
        memberIsPresent = teams.removeIf(x->x.getEmail().equals(email));

        if(!memberIsPresent)
        {
            throw new UserNotFoundException();
        }
        teamTask.setTeamList(teams);
        return tasksRepository.save(teamTask);
    }

    public TeamTask updateTaskDetails(String teamName,int taskId, Tasks task) throws TeamNotFoundException,TaskNotFoundException {
        TeamTask teamTask = tasksRepository.findByTeamName(teamName);

        boolean taskIsPresent = false;
        if(tasksRepository.findById(teamName).isEmpty())
        {
            throw new TeamNotFoundException();
        }
        else
        {
            List<Tasks> taskList = teamTask.getTasksList();
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
            teamTask.setTasksList(taskList);
            tasksRepository.save(teamTask);
            return teamTask;
        }
    }



    //Task data
    public Tasks getTask(String teamName, int taskId){
        TeamTask teamTask =tasksRepository.findByTeamName(teamName);
        List<Tasks> tasksList= teamTask.getTasksList();
        for (int i=0;i<tasksList.size(); i++)
        {
            if (tasksList.get(i).getTaskId()==taskId) {
                Tasks task=tasksList.get(i);
                return task;
            }
        }
        return null;
    }
}
