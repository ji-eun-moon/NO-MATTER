package com.example.nomatter.controller;

import com.example.nomatter.domain.Button;
import com.example.nomatter.domain.CustomButton;
import com.example.nomatter.service.CustomButtonService;
import com.example.nomatter.service.RemoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/custom")
public class CustomButtonController {

    private final CustomButtonService customButtonService;
    private final RemoteService remoteService;

    @PostMapping("/registerButtons")
    public ResponseEntity<?> registerButtons(@RequestBody List<CustomButton> list, Authentication authentication){

        Long remoteId = remoteService.findRecentlyRemoteId();

        for(CustomButton customButton : list){
            customButton.setRemoteId(remoteId);
        }

        customButtonService.saveAll(list);

        return ResponseEntity.ok().body("버튼 등록 및 수정 완료");
    }

    @GetMapping("/getButtons/{remoteId}")
    public ResponseEntity<?> getButtons(@PathVariable Long remoteId, Authentication authentication){

        List<CustomButton> list = customButtonService.findAllByRemoteId(remoteId);

        return ResponseEntity.ok().body(list);
    }

}
