package com.example.nomatter.controller;

import com.example.nomatter.domain.User;
import com.example.nomatter.domain.userdto.UserJoinRequest;
import com.example.nomatter.domain.userdto.UserLoginRequest;
import com.example.nomatter.domain.userdto.UserModifyRequest;
import com.example.nomatter.service.UserService;
import com.example.nomatter.utils.JwtTokenUtil;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<?> login(@RequestBody UserLoginRequest dto){

        String token = userService.login(dto);

        String refreshToken = userService.findByUserId(dto.getUserId()).get().getRefreshToken();

        String[] arr = new String[2];

        arr[0] = token;
        arr[1] = refreshToken;

        return ResponseEntity.ok().body(arr);
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

        return ResponseEntity.ok().body(user.get());
    }

    @GetMapping("/passwordCheck/{password}")
    public ResponseEntity<?> passwordCheck(@PathVariable String password, Authentication authentication){

        User user = userService.findByUserId(authentication.getName()).get();

        userService.passwordCheck(password, user.getUserPassword());

        return ResponseEntity.ok().body("비밀번호 인증에 성공하셨습니다.");

    }

    @PostMapping("/refreshToken")
    public ResponseEntity<?> checkRefreshToken(@RequestBody Map<String, String> map){

        String refreshToken = map.get("refreshToken");

        log.info("refreshToken api = " + refreshToken);

        String[] as = userService.checkRefreshToken(refreshToken);

        return ResponseEntity.ok().body(as);
    }

}
