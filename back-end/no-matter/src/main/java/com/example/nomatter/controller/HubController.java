package com.example.nomatter.controller;

import com.example.nomatter.domain.Hub;
import com.example.nomatter.service.HubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/hub")
public class HubController {

    private final HubService hubService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Hub hub){

        hubService.register(hub);

        return ResponseEntity.ok().body("허브 등록 완료");
    }

}
