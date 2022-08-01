package com.capstone.GateWayAPIservices;

import com.capstone.GateWayAPIservices.filter.JwtFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
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
				.route(p -> p.path("/api/k1/**").uri("lb://USER-AUTHENTICATION-SERVICE"))
				.route(p -> p.path("/api/k2/**").uri("lb://USER-TASKS"))
				.route(p->p.path("/api/k3/**").uri("lb://USER-TEAM"))
				.route(p->p.path("/api/k4/**").uri("lb://USER-NOTIFICATION"))
				.route(p->p.path("/api/k5/**").uri("lb://USER-EMAIL"))
				.build();
	}

	@Bean
	public FilterRegistrationBean jwtFilter(){
		FilterRegistrationBean filterBean=new FilterRegistrationBean();
		filterBean.setFilter(new JwtFilter());
		filterBean.addUrlPatterns("/api/k2/**");
		return filterBean;
	}
}
