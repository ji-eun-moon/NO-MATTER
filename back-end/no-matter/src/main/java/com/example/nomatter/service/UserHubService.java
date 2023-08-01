package com.example.nomatter.service;

import com.example.nomatter.domain.UserHub;
import com.example.nomatter.repository.UserHubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserHubService {

    private final UserHubRepository userHubRepository;

    public String register(UserHub userHub){

        userHub.setUserHubAuth("admin");

        userHubRepository.save(userHub);

        return "유저 허브 등록 완료";
    }

}
