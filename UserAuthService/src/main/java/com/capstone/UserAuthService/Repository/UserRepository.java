package com.capstone.UserAuthService.Repository;

import com.capstone.UserAuthService.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User,String>
{
    public User findByEmailAndPassword(String email,String password);

}
