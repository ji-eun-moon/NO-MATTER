package com.example.nomatter.controller;

import com.example.nomatter.domain.Hub;
import com.example.nomatter.domain.Remote;
import com.example.nomatter.repository.RemoteRepository;
import com.example.nomatter.service.RemoteService;
import com.example.nomatter.service.UserHubService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/remote")
@RequiredArgsConstructor
@Slf4j
public class RemoteController {

    private final RemoteService remoteService;
    private final RemoteRepository remoteRepository;
    private final UserHubService userHubService;

    @GetMapping("/list/{usersHubsId}")
    public ResponseEntity<?> list(@PathVariable Long usersHubsId, Authentication authentication){

        Long hubId = userHubService.findByUsersHubsId(usersHubsId).get().getHubId();

        log.info(String.valueOf(hubId));

        return ResponseEntity.ok().body(remoteService.findAllByHubId(hubId));

    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Remote remote, Authentication authentication){

        remoteRepository.save(remote);

        return ResponseEntity.ok().body("리모컨 등록 완료");
    }
}
