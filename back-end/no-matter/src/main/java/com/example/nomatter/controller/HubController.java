package com.example.nomatter.controller;

import com.example.nomatter.domain.Hub;
import com.example.nomatter.domain.UserHub;
import com.example.nomatter.exception.AppException;
import com.example.nomatter.exception.Errorcode;
import com.example.nomatter.service.HubService;
import com.example.nomatter.service.UserHubService;
import com.example.nomatter.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/hub")
@Slf4j
public class HubController {

    private final HubService hubService;
    private final UserHubService userHubService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Hub hub, Authentication authentication){

        hubService.register(hub);

        return ResponseEntity.ok().body(authentication.getName() + "허브 등록 완료");
    }

    @GetMapping("/inviteCode/{hubId}")
    public ResponseEntity<?> inviteCode(@PathVariable long hubId, Authentication authentication){

        Hub hub = hubService.findByHubId(hubId).get();

        if(hub.getCodeExpiredTime() == null || LocalDateTime.now().isAfter(hub.getCodeExpiredTime().plus(1, ChronoUnit.DAYS))){
            String characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            SecureRandom random = new SecureRandom();

            String code = "";

            while (true){

                StringBuilder stringBuilder = new StringBuilder(characters.length());

                // Add a character to the generated string
                stringBuilder.append(characters.charAt(random.nextInt(20)));

                // Add digits to the generated string
                for (int i = 0; i < 20 - 1; i++) {
                    stringBuilder.append(characters.charAt(random.nextInt(characters.length()))); // Selecting digits only
                }

                code = stringBuilder.toString();

                if(!hubService.findByInviteCode(code).isPresent()){
                    break;
                }

            }

            hub.setInviteCode(code);
            hub.setCodeExpiredTime(LocalDateTime.now());

            hubService.save(hub);
        }

        return ResponseEntity.ok().body(hub.getInviteCode() + " " + hub.getCodeExpiredTime());
    }

    @PostMapping("/readCode")
    public ResponseEntity<?> readCode(@RequestBody Map<String, String> map, Authentication authentication){

        String code = map.get("code");

        Optional<Hub> optionalHub = hubService.findByInviteCode(code);

        if(optionalHub.isPresent()){
            Hub hub = optionalHub.get();

            if(LocalDateTime.now().isAfter(hub.getCodeExpiredTime().plus(1, ChronoUnit.DAYS))){
                throw new AppException(Errorcode.EXPIRED_INVITE_CODE, "기한이 만료된 초대코드입니다.");
            }else{

                userHubService.findByUserIdAndHubId(userService.findByUserId(authentication.getName()).get().getMemberId(), hub.getHubId())
                        .ifPresent((err) -> {
                            throw new AppException(Errorcode.USER_HUB_DUPLICATED, "이미 등록된 허브입니다.");
                        });
                UserHub userHub = new UserHub();

                userHub.setHubId(hub.getHubId());
                userHub.setUserId(userService.findByUserId(authentication.getName()).get().getMemberId());
                userHub.setUserHubAuth("user");
                userHub.setUserHubName(map.get("userHubName"));

                userHubService.register(userHub);
            }

        }else {
            throw new AppException(Errorcode.INVITE_CODE_NOT_FOUND, "유효하지않은 코드입니다. ");
        }

        return ResponseEntity.ok().body(code);

    }

    @GetMapping("/members/{hubId}")
    public ResponseEntity<?> getMembers(@PathVariable Long hubId, Authentication authentication){

        List<Object> list = hubService.findAllByHubId(hubId);

        return ResponseEntity.ok().body(list);

    }

}
