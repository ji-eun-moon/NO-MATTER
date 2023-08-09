package com.example.nomatter.controller;

import com.example.nomatter.domain.Hub;
import com.example.nomatter.domain.UserHub;
import com.example.nomatter.domain.hubdto.HubRegisterDto;
import com.example.nomatter.domain.userhubdto.UserHubModifyDto;
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
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/userhub")
@Slf4j
public class UserHubController {

    private final UserHubService userHubService;
    private final HubService hubService;
    private final UserService userService;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody HubRegisterDto hubRegisterDto, Authentication authentication){

        Hub hub = Hub.builder()
                .hubUuid(hubRegisterDto.getHubUuid())
                .location(hubRegisterDto.getLocation())
                .weatherKey(hubRegisterDto.getWeatherKey())
                .build();

        hubService.register(hub);

        UserHub userHub = UserHub.builder()
                .hubId(hubService.findByHubUuid(hubRegisterDto.getHubUuid()).get().getHubId())
                .userId(userService.findByUserId(authentication.getName()).get().getMemberId())
                .userHubAuth(hubRegisterDto.getUserHubAuth())
                .userHubName(hubRegisterDto.getUserHubName())
                .build();

        log.info(userHub.toString());

        userHubService.register(userHub);

        return ResponseEntity.ok().body(" 유저 허브 등록 완료");
    }

    @GetMapping("/list")
    public ResponseEntity<?> findAllByUserId(Authentication authentication){

        List<UserHub> list =  userHubService.findAllByUserId(userService.findByUserId(authentication.getName()).get().getMemberId());

        return ResponseEntity.ok().body(list);
    }

    @PostMapping("/modify")
    public ResponseEntity<?> modify(@RequestBody UserHubModifyDto userHubModifyDto,@RequestBody Long userHubId, Authentication authentication){

        userHubService.findByUsersHubsId(userHubId)
                .ifPresent(userHub -> {
                    userHub.setUserHubName(userHubModifyDto.getUserHubName());
                });

        return ResponseEntity.ok().body("허브 이름 수정 완료");
    }

    @PostMapping("/modifygrade")
    public ResponseEntity<?> modifyGrade(@RequestBody Long userHubId, @RequestBody Long changeUserHubId, @RequestBody String grade){

        userHubService.modifyGrade(userHubId, changeUserHubId, grade);

        return ResponseEntity.ok().body(" 권한 변경 완료");
    }

    @PostMapping("/deleteUserHub/{hubId}")
    public ResponseEntity<?> deleteUserHub(@PathVariable Long hubId, Authentication authentication){

        userHubService.deleteUserHub(hubId, userService.findByUserId(authentication.getName()).get().getMemberId());

        return ResponseEntity.ok().body("허브 삭제 완료");
    }

}
