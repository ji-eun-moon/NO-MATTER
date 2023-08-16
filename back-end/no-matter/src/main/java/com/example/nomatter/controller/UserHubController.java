package com.example.nomatter.controller;

import com.example.nomatter.domain.Hub;
import com.example.nomatter.domain.UserHub;
import com.example.nomatter.domain.hubdto.HubRegisterDto;
import com.example.nomatter.domain.userhubdto.UserHubModifyDto;
import com.example.nomatter.exception.AppException;
import com.example.nomatter.exception.Errorcode;
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
import java.util.Map;
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

        userHubService.findByUserHubNameAndUserId(hubRegisterDto.getUserHubName(), userService.findByUserId(authentication.getName()).get().getMemberId());

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
    public ResponseEntity<?> modifyGrade(@RequestBody Map<String, String > map, Authentication authentication){

        Long userHubId = Long.parseLong(map.get("userHubId"));
        Long changeUserHubId = Long.parseLong(map.get("changeUserHubId"));
        String grade = map.get("grade");

        userHubService.modifyGrade(userHubId, changeUserHubId, grade);

        return ResponseEntity.ok().body(" 권한 변경 완료");
    }

    @PostMapping("/deleteUserHub/{usersHubsId}")
    public ResponseEntity<?> deleteUserHub(@PathVariable Long usersHubsId, Authentication authentication){

        UserHub userHub = userHubService.findByUsersHubsId(usersHubsId).get();

        if(userHub.getUserHubAuth().equals("admin")){
//            return ResponseEntity.ok().body(new AppException(Errorcode.USER_HUB_NOW_FOUND, "admin 나가는거 불가능"));

            if(!hubService.findAllByHubId(userHub.getHubId()).isEmpty() && hubService.findAllByHubId(userHub.getHubId()).size() == 1){
                hubService.delete(hubService.findByHubId(userHub.getHubId()).get());
                return ResponseEntity.ok().body("admin 나가기 가능");
            }else{
               throw new AppException(Errorcode.ADMIN_CANNOT_DELETE, "멤버가 존재하는 허브는 나가기 불가능");
            }

        }
        
        userHubService.deleteUserHub(usersHubsId);

        return ResponseEntity.ok().body("허브 삭제 완료");
    }

    @PostMapping("/outUserHubId")
    public ResponseEntity<?> outUserHubId(@RequestBody Map<String, String> map, Authentication authentication){

        Long userHubId = Long.parseLong(map.get("userHubId"));
        Long changeUserHubId = Long.parseLong(map.get("changeUserHubId"));

        userHubService.outUserHubId(userHubId, changeUserHubId);

        return ResponseEntity.ok().body("삭제 완료");

    }

    @GetMapping("/getName/{hubId}")
    public ResponseEntity<?> getName(@PathVariable Long hubId, Authentication authentication){

        Long memberId = userService.findByUserId(authentication.getName()).get().getMemberId();

        String Name = userHubService.findNameByHubIdAndUserId(hubId, memberId);

        return ResponseEntity.ok().body(Name);

    }

}
