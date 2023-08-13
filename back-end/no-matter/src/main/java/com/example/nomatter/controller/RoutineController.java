package com.example.nomatter.controller;

import com.example.nomatter.domain.Routine;
import com.example.nomatter.service.RoutineService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/routine")
@RequiredArgsConstructor
@Slf4j
public class RoutineController {

    private final RoutineService routineService;


    @GetMapping("/list/{hubId}")
    public ResponseEntity<?> list(@PathVariable Long hubId, Authentication authentication){


        return ResponseEntity.ok().body(routineService.findAllByHubId(hubId));
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestBody Routine routine){

        routineService.save(routine);

        return ResponseEntity.ok().body("루틴 변경 완료");
    }

}
