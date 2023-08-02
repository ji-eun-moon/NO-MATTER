package com.example.nomatter.service;

import com.example.nomatter.domain.User;
import com.example.nomatter.domain.UserHub;
import com.example.nomatter.domain.userdto.UserJoinRequest;
import com.example.nomatter.domain.userdto.UserLoginRequest;
import com.example.nomatter.domain.userdto.UserModifyRequest;
import com.example.nomatter.exception.AppException;
import com.example.nomatter.exception.Errorcode;
import com.example.nomatter.repository.UserRepository;
import com.example.nomatter.utils.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    @Value("${jwt.token.secret}")
    private String secretKey;

    // 만료 시간 => 1초 * 60 * 60 => 1분 설정
    private Long expireTime = 1000 * 60 * 60L;

    @Transactional
    public String join(UserJoinRequest dto){

        // 중복체크
        userRepository.findByUserId(dto.getUserId())
                .ifPresent(user -> {
                    System.out.println(user.toString());
                    throw new AppException(Errorcode.USERID_DUPLICATED, dto.getUserId() + "는 이미 존재하는 아이디입니다.");
                });


        User user = User.builder()
                .userId(dto.getUserId())
                .userPassword(encoder.encode(dto.getUserPassword()))
                .userName(dto.getUserName())
                .userEmail(dto.getUserEmail())
                .userPhone(dto.getUserNumber())
                .socialType(dto.getSocialType() == null ? "nomatter" : dto.getSocialType())
                .createDate(LocalDateTime.now())
                .build();

        //저장
        userRepository.save(user);

        return "success";
    }

    @Transactional
    public String login(UserLoginRequest dto){

        // 아이디가 존재하지 않는 경우
        User selectedUser = userRepository.findByUserId(dto.getUserId())
                .orElseThrow(() -> new AppException(Errorcode.USERID_NOT_FOUND, dto.getUserId() + "는 존재하지 않는 아이디입니다. "));

        // 비밀번호 틀린 경우
        if(!encoder.matches(dto.getUserPassword(), selectedUser.getUserPassword())){
            throw new AppException(Errorcode.INVALID_ID_PASSWORD, "옳지 않은 비밀번호입니다.");
        }

        // Exception 안나면 token 발행
        String token = JwtTokenUtil.createToken(dto.getUserId(), secretKey, expireTime);

        return token;
    }

    @Transactional
    public void modify(UserModifyRequest userModifyRequest){

        User selectUser = userRepository.findByUserId(userModifyRequest.getUserId())
                .orElseThrow(() -> new AppException(Errorcode.USERID_NOT_FOUND, userModifyRequest.getUserId() + " is not found"));

        String userId = userModifyRequest.getUserId();
        String userPassword = userModifyRequest.getUserPassword();

        selectUser.setUserPassword(encoder.encode(userModifyRequest.getUserPassword()));

    }

    @Transactional
    public void delete(String userId){

        User selectedUser = userRepository.findByUserId(userId)
                .orElseThrow(() -> new AppException(Errorcode.USERID_NOT_FOUND, " Invalid Id"));

        SecurityContextHolder.clearContext();
        userRepository.delete(selectedUser);
    }

    @Transactional
    public String idCheck(String userId){

        userRepository.findByUserId(userId)
                .ifPresent(user -> {
                    throw new AppException(Errorcode.USERID_DUPLICATED, " 이미 가입된 아이디입니다.");
                });

        return "사용 가능한 아이디입니다.";
    }

    @Transactional
    public Optional<User> findByUserId(String userId){

        return userRepository.findByUserId(userId);

    }


}
