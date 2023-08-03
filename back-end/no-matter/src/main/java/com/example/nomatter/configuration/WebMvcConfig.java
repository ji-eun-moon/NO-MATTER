package com.example.nomatter.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("*") // Configure the specific mapping that needs CORS support
                .allowedOrigins("*") // Replace with your React frontend URL
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true); // If your backend supports user credentials
    }

}
