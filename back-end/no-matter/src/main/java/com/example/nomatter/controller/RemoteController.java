package com.example.nomatter.controller;

import com.example.nomatter.domain.Remote;
import com.example.nomatter.service.RemoteService;
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

    @GetMapping("/list/{usersHubsId}")
    public ResponseEntity<?> list(@PathVariable Long usersHubsId, Authentication authentication){

        List<Remote> list = remoteService.findAllByUsersHubsId(usersHubsId);

        return ResponseEntity.ok().body(list);
    }
}
