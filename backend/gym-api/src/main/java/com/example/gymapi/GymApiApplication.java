package com.example.gymapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class GymApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(GymApiApplication.class, args);
	}

	@Configuration
	public static class WebMvcConfig implements WebMvcConfigurer {
		@Override
		public void addResourceHandlers(ResourceHandlerRegistry registry) {
			registry.addResourceHandler("/uploads/**")
					.addResourceLocations("file:src/main/resources/public/uploads/");
		}
	}
}