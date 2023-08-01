package com.example.nomatter.controller;

import com.example.nomatter.domain.Hub;
import com.example.nomatter.domain.UserHub;
import com.example.nomatter.domain.hubdto.HubRegisterDto;
import com.example.nomatter.repository.HubRepository;
import com.example.nomatter.repository.UserRepository;
import com.example.nomatter.service.HubService;
import com.example.nomatter.service.UserHubService;
import com.example.nomatter.service.UserService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/userhub")
@Slf4j
public class UserHubController {

    private final UserHubService userHubService;
    private final UserRepository userRepository;
    private final HubService hubService;
    private final HubRepository hubRepository;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody HubRegisterDto hubRegisterDto, Authentication authentication){

        Hub hub = Hub.builder()
                .hubUuid(hubRegisterDto.getHubUuid())
                .location(hubRegisterDto.getLocation())
                .weatherKey(hubRegisterDto.getWeatherKey())
                .build();

        hubService.register(hub);

        UserHub userHub = UserHub.builder()
                .hubId(hubRepository.findByHubUuid(hubRegisterDto.getHubUuid()).get().getHubId())
                .userId(userRepository.findByUserId(authentication.getName()).get().getMemberId())
                .userHubAuth(hubRegisterDto.getUserHubAuth())
                .userHubName(hubRegisterDto.getUserHubName())
                .build();

        log.info(userHub.toString());

        userHubService.register(userHub);

        return ResponseEntity.ok().body(" 유저 허브 등록 완료");
    }

    @GetMapping("/list")
    public ResponseEntity<?> findAllByUserId(Authentication authentication){

        List<UserHub> list =  userHubService.findAllByUserId(userRepository.findByUserId(authentication.getName()).get().getMemberId());

        return ResponseEntity.ok().body(list);
    }

}
