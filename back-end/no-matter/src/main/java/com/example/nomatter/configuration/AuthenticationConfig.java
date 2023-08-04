package com.example.nomatter.configuration;

import com.example.nomatter.service.OAuthService;
import com.example.nomatter.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class AuthenticationConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    @Value("${jwt.token.secret}")
    private String secretKey;
    private final OAuthService oAuthService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        // NoOpPasswordEncoder는 보안상 취약하므로 사용하지 말고 실제로는 BCryptPasswordEncoder 등을 사용해야 합니다.
        return NoOpPasswordEncoder.getInstance();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .cors().and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/api/v1/user/login", "/api/v1/user/join", "/api/v1/user/idCheck/**", "/api/v1/oauth2/**").permitAll()
                .antMatchers("/login/oauth2/code/*").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(new JwtFilter(userService, secretKey), UsernamePasswordAuthenticationFilter.class)
                .logout()
                .logoutUrl("/api/v1/user/logout")
                .logoutSuccessUrl("/").permitAll()
                .and()
                .oauth2Login()
                .userInfoEndpoint()
                .userService(oAuthService);
    }
}

