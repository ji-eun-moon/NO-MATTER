package com.example.nomatter.controller;

import com.example.nomatter.domain.User;
import com.example.nomatter.domain.userdto.UserJoinRequest;
import com.example.nomatter.domain.userdto.UserLoginRequest;
import com.example.nomatter.domain.userdto.UserModifyRequest;
import com.example.nomatter.service.UserService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.beans.Encoder;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@RestController
@Transactional
@Slf4j
public class UserController {

    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody UserJoinRequest dto){
        log.error("dto = " + dto.toString());
        userService.join(dto);
        return ResponseEntity.ok().body("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLoginRequest dto, HttpServletResponse response){
        String token = userService.login(dto, response);

        return ResponseEntity.ok().body(token);
    }

    @PostMapping("/modify")
    public ResponseEntity<?> modify(@RequestBody Map<String, String> map, Authentication authentication){

        userService.modify(map.get("password"), authentication.getName());

        return ResponseEntity.ok().body("회원정보 수정 성공");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(Authentication authentication){

        userService.delete(authentication.getName());

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

    @GetMapping("/view")
    public ResponseEntity<?> view(Authentication authentication){

        Optional<User> user = userService.findByUserId(authentication.getName());

        log.info(user.toString());

        return ResponseEntity.ok().body(user.toString());
    }

    @GetMapping("/passwordCheck/{password}")
    public ResponseEntity<?> passwordCheck(@PathVariable String password, Authentication authentication){

        User user = userService.findByUserId(authentication.getName()).get();

        userService.passwordCheck(password, user.getUserPassword());

        return ResponseEntity.ok().body("비밀번호 인증에 성공하셨습니다.");

    }

}
