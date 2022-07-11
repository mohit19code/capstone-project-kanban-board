package com.capstone.Teammate.Service;

import com.capstone.Teammate.Entity.Team;
import com.capstone.Teammate.Entity.UserTeam;
import com.capstone.Teammate.Exception.TeammateNotFoundException;
import com.capstone.Teammate.Exception.UserNotFoundException;
import com.capstone.Teammate.Repository.TeammateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class TeammateService {

    @Autowired
    TeammateRepository teammateRepository;

    public UserTeam saveUserTeam(UserTeam userTeam)
    {
        return teammateRepository.save(userTeam);
    }

    public List<UserTeam> getUserTeam()
    {
        return teammateRepository.findAll();
    }

    public UserTeam saveMemberToList(Team team,String email) throws UserNotFoundException
    {
        if(teammateRepository.findById(email).isEmpty())
        {
            throw new UserNotFoundException();
        }

        UserTeam userTeam = teammateRepository.findByEmail(email);

        if(userTeam.getTeamList()==null)
        {
            userTeam.setTeamList(Arrays.asList(team));
        }
        else
        {
            List<Team> teamList = userTeam.getTeamList();
            teamList.add(team);
            userTeam.setTeamList(teamList);
        }
        return teammateRepository.save(userTeam);
    }


    public List<Team> getAllUserTeam(String email) throws UserNotFoundException
    {
        if(teammateRepository.findById(email).isEmpty())
        {
            throw new UserNotFoundException();
        }
        return teammateRepository.findById(email).get().getTeamList();
    }

    public UserTeam deleteTeamMemberFromList(String userEmail,String teamMemberEmail) throws UserNotFoundException, TeammateNotFoundException
    {
        boolean teamMemberIsPresent = false;
        if(teammateRepository.findById(userEmail).isEmpty())
        {
            throw new UserNotFoundException();
        }
        UserTeam userTeam = teammateRepository.findById(userEmail).get();
        List<Team> teamList = userTeam.getTeamList();
        teamMemberIsPresent = teamList.removeIf(x->x.getEmail().equals(teamMemberEmail));

        if(!teamMemberIsPresent)
        {
            throw new TeammateNotFoundException();
        }
        userTeam.setTeamList(teamList);
        return teammateRepository.save(userTeam);
    }


    public UserTeam updateTeamMemberList(String userEmail,String teamMemberEmail,Team team) throws TeammateNotFoundException,UserNotFoundException
    {
        UserTeam userTeam = teammateRepository.findByEmail(userEmail);

        boolean teamMemberIsPresent = false;
        if (teammateRepository.findById(userEmail).isEmpty()) {
            throw new UserNotFoundException();
        } else {
            List<Team> teamList = userTeam.getTeamList();
            for (int i = 0; i < teamList.size(); i++) {
                if (teamList.get(i).getEmail().equals(teamMemberEmail)) {
                    teamMemberIsPresent = true;
                    teamList.set(i, team);
                    break;
                }
            }
            if (!teamMemberIsPresent) {
                throw new TeammateNotFoundException();
            }
            userTeam.setTeamList(teamList);
            teammateRepository.save(userTeam);
            return userTeam;
        }
    }

}
