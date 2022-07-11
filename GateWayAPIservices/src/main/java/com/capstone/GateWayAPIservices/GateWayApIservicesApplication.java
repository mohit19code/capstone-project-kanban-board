package com.capstone.GateWayAPIservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@Configuration
@EnableEurekaClient
public class GateWayApIservicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(GateWayApIservicesApplication.class, args);
	}


	@Bean
	public RouteLocator myRoutes(RouteLocatorBuilder builder) {
		return builder.routes()
				.route(p -> p.path("/api/k1/**").uri("lb://user-authentication-service"))
				.route(p -> p.path("/api/k2/**").uri("lb://user-tasks"))
				.build();
	}
}
