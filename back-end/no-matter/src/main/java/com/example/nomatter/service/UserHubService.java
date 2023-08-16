package com.example.nomatter.service;

import com.example.nomatter.domain.User;
import com.example.nomatter.domain.UserHub;
import com.example.nomatter.exception.AppException;
import com.example.nomatter.exception.Errorcode;
import com.example.nomatter.repository.UserHubRepository;
import com.example.nomatter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserHubService {

    private final UserHubRepository userHubRepository;

    public String register(UserHub userHub){

        if(userHub.getUserHubAuth() == null){
            userHub.setUserHubAuth("admin");
        }

        userHubRepository.save(userHub);

        return "유저 허브 등록 완료";
    }

    public List<UserHub> findAllByUserId(Long Id){

        return userHubRepository.findAllByUserId(Id);

    }

    public Optional<UserHub> findByUsersHubsId(Long UsersHubsId){

        return userHubRepository.findByUsersHubsId(UsersHubsId);

    }

    public String findNameByHubIdAndUserId(Long hubId, Long userId){

        return userHubRepository.findNameByHubIdAndUserId(hubId, userId);

    }

    public String modifyGrade(Long userHubId, Long changeUserHubId, String grade){

        UserHub userHub = userHubRepository.findByUsersHubsId(userHubId)
                .orElseThrow(() -> {
                    throw new AppException(Errorcode.USER_HUB_NOW_FOUND, " 해당하는 허브가 없습니다.");
                });

        if(!userHub.getUserHubAuth().equals("admin")){
            log.info(userHub.getUserHubAuth());
            throw new AppException(Errorcode.USER_NOT_GRADE, " 해당하는 권한이 없습니다.");
        }

        UserHub changeUserHub = userHubRepository.findByUsersHubsId(changeUserHubId)
                .orElseThrow(() -> {
                    throw new AppException(Errorcode.USER_HUB_NOW_FOUND, " 해당하는 허브가 없습니다");
                });

        changeUserHub.setUserHubAuth(grade);

        userHubRepository.save(changeUserHub);

        return "권한 변경 완료";
    }

    public void deleteUserHub(Long usersHubsId){

        UserHub userHub = userHubRepository.findByUsersHubsId(usersHubsId).get();

        userHubRepository.delete(userHub);

    }

    public Optional<UserHub> findByUserIdAndHubId(Long memberId, Long hubId){

        return userHubRepository.findByUserIdAndHubId(memberId, hubId);

    }

    public String outUserHubId(Long userHubId, Long changeUserHubId){

        UserHub userHub = userHubRepository.findByUsersHubsId(userHubId)
                .orElseThrow(() -> {
                    throw new AppException(Errorcode.USER_HUB_NOW_FOUND, " 해당하는 허브가 없습니다.");
                });

        if(!userHub.getUserHubAuth().equals("admin")){
            log.info(userHub.getUserHubAuth());
            throw new AppException(Errorcode.USER_NOT_GRADE, " 해당하는 권한이 없습니다.");
        }

        UserHub changeUserHub = userHubRepository.findByUsersHubsId(changeUserHubId)
                .orElseThrow(() -> {
                    throw new AppException(Errorcode.USER_HUB_NOW_FOUND, " 해당하는 허브가 없습니다");
                });

        userHubRepository.delete(changeUserHub);

        return "추방 완료";
    }
}
