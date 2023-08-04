package com.example.nomatter.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Configure the specific mapping that needs CORS support
                .allowedOrigins("http://localhost:3000") // Replace with your React frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true); // If your backend supports user credentials
    }

}
