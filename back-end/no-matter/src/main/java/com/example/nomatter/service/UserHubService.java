package com.example.nomatter.service;

import com.example.nomatter.domain.User;
import com.example.nomatter.domain.UserHub;
import com.example.nomatter.exception.AppException;
import com.example.nomatter.exception.Errorcode;
import com.example.nomatter.repository.UserHubRepository;
import com.example.nomatter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserHubService {

    private final UserHubRepository userHubRepository;

    public String register(UserHub userHub){

        userHub.setUserHubAuth("admin");

        userHubRepository.save(userHub);

        return "유저 허브 등록 완료";
    }

    public List<UserHub> findAllByUserId(Long Id){

        return userHubRepository.findAllByUserId(Id);

    }

    public Optional<UserHub> findByUsersHubsId(Long UsersHubsId){

        return userHubRepository.findByUsersHubsId(UsersHubsId);

    }

    public String modifyGrade(Long userHubId, Long changeUserHubId, String grade){

        UserHub userHub = userHubRepository.findByUsersHubsId(userHubId)
                .orElseThrow(() -> {
                    throw new AppException(Errorcode.USER_HUB_NOW_FOUND, " 해당하는 허브가 없습니다.");
                });

        if(userHub.getUserHubAuth() != "admin"){
            throw new AppException(Errorcode.USER_NOT_GRADE, " 해당하는 권한이 없습니다.");
        }

        UserHub changeUserHub = userHubRepository.findByUsersHubsId(changeUserHubId)
                .orElseThrow(() -> {
                    throw new AppException(Errorcode.USER_HUB_NOW_FOUND, " 해당하는 허브가 없습니다");
                });

        changeUserHub.setUserHubAuth(grade);

        return "권한 변경 완료";
    }

    public void deleteUserHub(Long hubId, Long memberId){

        UserHub userHub = userHubRepository.findByHubIdAndUserId(hubId, memberId).get();

        userHubRepository.delete(userHub);

    }

    public Optional<UserHub> findByUserIdAndHubId(Long memberId, Long hubId){

        return userHubRepository.findByUserIdAndHubId(memberId, hubId);

    }
}
