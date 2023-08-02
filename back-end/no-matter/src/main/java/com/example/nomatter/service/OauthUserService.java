package com.example.nomatter.service;

import org.springframework.stereotype.Service;

@Service
public class OauthUserService {

    public void socialLogin(String code, String registrationId) {
        System.out.println("code = " + code);
        System.out.println("registrationId = " + registrationId);
    }

}
