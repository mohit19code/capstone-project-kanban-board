package com.capstone.UserAuthService.Service;


import com.capstone.UserAuthService.Entity.User;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;


import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JWTSecurityTokenGenerator implements SecurityTokenGenerator {

    @Override
    public  Map<String, String> generateToken(User user) {
        //Variable declaration
        String jsonWebToken=null;

        //This API is used for the creation of JSON Web Token (JWT) security tokens
        JwtBuilder jwtBuilder= Jwts.builder();
        //Gets token
        //setIssuedAt gives time of issue of token
        //
        //A digital signature—a type of electronic signature—is a mathematical algorithm routinely used to
        //validate the authenticity and integrity of a message
        jsonWebToken=jwtBuilder.setSubject(user.getEmail()).setIssuedAt(new Date()).signWith(SignatureAlgorithm.HS256,"secret").compact();

        Map<String,String> tokenMap=new HashMap<String,String>();
        tokenMap.put("token",jsonWebToken);
        tokenMap.put("message","User Successfully LoggedIn");
        tokenMap.put("email", user.getEmail());

        //tokenMap has the token and a message
        return tokenMap;
    }

}
