package com.example.nomatter.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
public class OAuthController {

    @GetMapping("/api/v1/login/oauth/loginInfo")
    public String oauthLoginInfo(Authentication authentication){

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        Map<String, Object> attributes = oAuth2User.getAttributes();

        return attributes.toString();
    }

    @GetMapping("/login/oauth2/code/google")
    public String handleGoogleRedirect(@RequestParam("code") String authorizationCode) {

        log.info("authorizationCode = " + authorizationCode);
        // Use the authorization code to complete the authentication process
        // and establish a session with the authenticated user

        // Perform the necessary steps, such as exchanging the authorization code for an access token,
        // fetching user information from Google, and setting up the user session.

        // Redirect to the desired page after successful authentication
        return "redirect:/login"; // For example, redirect to the dashboard page
    }

    @GetMapping("/login/oauth2/callback/kakao")
    public ResponseEntity<?> goKakao(@RequestParam String code){

        return ResponseEntity.ok().body("토큰 = " + code);

    }
}
