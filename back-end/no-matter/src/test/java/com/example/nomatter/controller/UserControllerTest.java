package com.example.nomatter.controller;

import com.example.nomatter.domain.dto.UserJoinRequest;
import com.example.nomatter.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
public class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    UserService userService;

    @Autowired
    ObjectMapper objectMapper;


    @org.junit.jupiter.api.Test
    void testJoin() throws Exception {

        String userId = "ssafy1";
        String userPassword = "ssafy1";
        String userName = "ssafy1";
        String userEmail = "ssafy1@ssafy.com";
        String userNumber = "01012341234";
        String socialType = "nomatter";

        UserJoinRequest testJoinRequest = UserJoinRequest
                .builder()
                .userId(userId)
                .userPassword(userPassword)
                .userName(userName)
                .userEmail(userEmail)
                .userNumber(userNumber)
                .socialType(socialType)
                .createdat(LocalDateTime.now())
                .build();

        mockMvc.perform(post("/api/v1/user/join")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(testJoinRequest)))
                .andDo(print())
                .andExpect(status().isOk());
    }
}