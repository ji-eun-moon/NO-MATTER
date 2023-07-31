package com.example.nomatter.service;

import com.example.nomatter.domain.Hub;
import com.example.nomatter.exception.AppException;
import com.example.nomatter.exception.Errorcode;
import com.example.nomatter.repository.HubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@RequiredArgsConstructor
@Service
public class HubService {

    private final HubRepository hubRepository;

    public String register(Hub hub){

        hubRepository.findByHubUuid(hub.getHubUuid())
                        .ifPresent(Hub -> {
                            throw new AppException(Errorcode.UUID_DUPLICATED, hub.getHubUuid() + " is duplicated");
                        });

        System.out.println(hub.toString());

        hubRepository.save(hub);

        return "success";
    }

}
