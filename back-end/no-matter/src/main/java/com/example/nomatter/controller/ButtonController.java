//package com.example.nomatter.controller;
//
//import com.example.nomatter.domain.Button;
//import com.example.nomatter.service.ButtonService;
//import com.example.nomatter.service.RemoteService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/api/v1/button")
//public class ButtonController {
//
//    private final ButtonService buttonService;
//    private final RemoteService remoteService;
//
//    @PostMapping("/registerButtons")
//    public ResponseEntity<?> registerButtons(@RequestBody List<Button> list, Authentication authentication){
//
//        Long remoteId = remoteService.findRecentlyRemoteId();
//
//        for(Button button : list){
//            button.setRemoteId(remoteId);
//        }
//
//        buttonService.saveAll(list);
//
//        return ResponseEntity.ok().body("버튼 등록 및 수정 완료");
//    }
//
//    @GetMapping("/getButtons/{remoteId}")
//    public ResponseEntity<?> getButtons(@PathVariable Long remoteId, Authentication authentication){
//
//        List<Button> list = buttonService.findAllByRemoteId(remoteId);
//
//        return ResponseEntity.ok().body(list);
//    }
//
//}
