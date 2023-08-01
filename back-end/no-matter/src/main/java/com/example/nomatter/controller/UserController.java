package com.example.nomatter.controller;

import com.example.nomatter.domain.userdto.UserJoinRequest;
import com.example.nomatter.domain.userdto.UserLoginRequest;
import com.example.nomatter.domain.userdto.UserModifyRequest;
import com.example.nomatter.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@RestController
@Transactional
@Slf4j
public class UserController {

    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody UserJoinRequest dto){
        userService.join(dto);
        return ResponseEntity.ok().body("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLoginRequest dto){
        String token = userService.login(dto);

        return ResponseEntity.ok().body(token);
    }

    @PostMapping("/modify")
    public ResponseEntity<?> modify(@RequestBody UserModifyRequest userModifyRequest){

        userService.modify(userModifyRequest);

        return ResponseEntity.ok().body("회원정보 수정 성공");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestBody Map<String, String> requestBody){

        System.out.println("삭제");

        userService.delete(requestBody.get("userId"));

        return ResponseEntity.ok().body("회원 탈퇴 성공");

    }

    @GetMapping("/idCheck/{userId}")
    public ResponseEntity<?> idCheck(@PathVariable("userId") String userId){

        userService.idCheck(userId);

        return ResponseEntity.ok().body("사용 가능한 아이디입니다.");
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(Authentication authentication){

        log.info("로그아웃 GET");

        return ResponseEntity.ok().body("로그아웃 완료");

    }

}
