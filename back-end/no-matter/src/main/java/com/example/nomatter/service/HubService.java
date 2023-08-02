package com.example.nomatter.service;

import com.example.nomatter.domain.Hub;
import com.example.nomatter.exception.AppException;
import com.example.nomatter.exception.Errorcode;
import com.example.nomatter.repository.HubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class HubService {

    private final HubRepository hubRepository;

    public String register(Hub hub){

        hubRepository.findByHubUuid(hub.getHubUuid())
                        .ifPresent(Hub -> {
                            throw new AppException(Errorcode.UUID_DUPLICATED, hub.getHubUuid() + " 이미 등록된 허브입니다.");
                        });

        System.out.println(hub.toString());

        hubRepository.save(hub);

        return "success";
    }

    public Optional<Hub> findByHubUuid(String hubUuid){

        return hubRepository.findByHubUuid(hubUuid);

    }

}
