package com.capstone.Teammate.Service;

import com.capstone.Teammate.Entity.TeamName;
import com.capstone.Teammate.Entity.UserTeam;
import com.capstone.Teammate.Exception.TeammateNotFoundException;
import com.capstone.Teammate.Exception.UserNotFoundException;
import com.capstone.Teammate.Repository.TeammateRepository;
import com.capstone.Teammate.proxy.UserNotificationProxy;
import com.capstone.Teammate.proxy.UserProxy;
import com.capstone.Teammate.proxy.UserTaskProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class TeammateService {

    @Autowired
    TeammateRepository teammateRepository;

    @Autowired
    UserProxy userProxy;

    @Autowired
    UserTaskProxy userTaskProxy;

    @Autowired
    UserNotificationProxy userNotificationProxy;

    public UserTeam saveUserTeam(UserTeam userTeam)
    {
        userProxy.addUser(userTeam);
        userNotificationProxy.addUser(userTeam);
        return teammateRepository.save(userTeam);
    }

    public String getAllUser(String email)
    {
        if(teammateRepository.findById(email).isEmpty())
        {
            return null;
        }
        return teammateRepository.findById(email).get().getEmail();
    }

    public List<UserTeam> getUserTeam()
    {
        return teammateRepository.findAll();
    }

    //User details
    public Optional<UserTeam> getUserDetails(String email){
        return teammateRepository.findById(email);
    }

    public UserTeam saveTeamNameToList(TeamName teamName, String email) throws UserNotFoundException
    {
        if(teammateRepository.findById(email).isEmpty())
        {
            throw new UserNotFoundException();
        }

        UserTeam userTeam = teammateRepository.findByEmail(email);

        if(userTeam.getTeamList()==null)
        {
            userTeam.setTeamList(Arrays.asList(teamName));
        }
        else
        {
            List<TeamName> teamList = userTeam.getTeamList();
            teamList.add(teamName);
            userTeam.setTeamList(teamList);
        }
        return teammateRepository.save(userTeam);
    }


    public List<TeamName> getAllUserTeamName(String email) throws UserNotFoundException
    {
        if(teammateRepository.findById(email).isEmpty())
        {
            throw new UserNotFoundException();
        }
        return teammateRepository.findById(email).get().getTeamList();
    }

    public UserTeam deleteTeamNameFromList(String userEmail,String teamName) throws UserNotFoundException, TeammateNotFoundException
    {
        boolean teamMemberIsPresent = false;
        if(teammateRepository.findById(userEmail).isEmpty())
        {
            throw new UserNotFoundException();
        }
        UserTeam userTeam = teammateRepository.findById(userEmail).get();
        List<TeamName> teamList = userTeam.getTeamList();
        teamMemberIsPresent = teamList.removeIf(x->x.getTeamName().equals(teamName));

        if(!teamMemberIsPresent)
        {
            throw new TeammateNotFoundException();
        }
        userTeam.setTeamList(teamList);
        return teammateRepository.save(userTeam);
    }

    public String deleteMemberFromTeamList(String teamName, String email) {
        UserTeam userTeam=teammateRepository.findByEmail(email);
        List<TeamName> teamNameList=userTeam.getTeamList();
        teamNameList.removeIf(x->x.getTeamName().equals(teamName));
        teammateRepository.save(userTeam);
        return "Deleted!";
    }



//    public UserTeam updateTeamMemberList(String userEmail, TeamName teamName) throws TeammateNotFoundException,UserNotFoundException
//    {
//        UserTeam userTeam = teammateRepository.findByEmail(userEmail);
//
//        boolean teamMemberIsPresent = false;
//        if (teammateRepository.findById(userEmail).isEmpty()) {
//            throw new UserNotFoundException();
//        } else {
//            List<TeamName> teamList = userTeam.getTeamList();
//            for (int i = 0; i < teamList.size(); i++) {
//                if (teamList.get(i).getTeamName().equals(teamName)) {
//                    teamMemberIsPresent = true;
//                    teamList.set(i, teamName);
//                    break;
//                }
//            }
//            if (!teamMemberIsPresent) {
//                throw new TeammateNotFoundException();
//            }
//            userTeam.setTeamList(teamList);
//            teammateRepository.save(userTeam);
//            return userTeam;
//        }
//    }

}
