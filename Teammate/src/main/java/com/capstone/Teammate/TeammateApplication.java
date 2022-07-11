package com.capstone.Teammate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class TeammateApplication {

	public static void main(String[] args) {
		SpringApplication.run(TeammateApplication.class, args);
	}

}
