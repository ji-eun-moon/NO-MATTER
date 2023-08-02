package com.example.nomatter.controller;

import com.example.nomatter.service.OauthUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/oauth")
@Transactional
@Slf4j
public class OAuthUserController {

    private final OauthUserService oauthUserService;

    @GetMapping("/login/{registrationId}")
    public void googleLogin(@RequestParam String code, @PathVariable String registrationId){
        oauthUserService.socialLogin(code, registrationId);
    }
}
