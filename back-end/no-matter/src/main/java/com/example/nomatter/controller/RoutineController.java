package com.example.nomatter.controller;

import com.example.nomatter.domain.Routine;
import com.example.nomatter.service.RoutineService;
import com.example.nomatter.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/routine")
@RequiredArgsConstructor
@Slf4j
public class RoutineController {

    private final RoutineService routineService;
    private final UserService userService;


    @GetMapping("/list/{hubId}")
    public ResponseEntity<?> list(@PathVariable Long hubId, Authentication authentication){

        List<Object> list = routineService.findAllByHubId(userService.findByUserId(authentication.getName()).get().getMemberId());

        List<Object> objectList = new ArrayList<>();

        if(!list.isEmpty()){

            for(int i = 0 ; i < list.size() ; i++){
                if(list.get(i) == hubId){
                    objectList.add(list.get(i));
                }
            }
        }

        return ResponseEntity.ok().body(objectList);
    }

    @GetMapping("/list")
    public ResponseEntity<?> list(Authentication authentication){

        Long userId = userService.findByUserId(authentication.getName()).get().getMemberId();

        return ResponseEntity.ok().body(routineService.findAllByHubId(userId));
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestBody Routine routine, Authentication authentication){

        Routine selectedRoutine = routineService.findByRoutineId(routine.getRoutineId());

        selectedRoutine.setAttributes(routine.getAttributes());

        routineService.save(selectedRoutine);

        return ResponseEntity.ok().body("루틴 변경 완료");
    }

    @DeleteMapping("/delete/{routineId}")
    public ResponseEntity<?> delete(@PathVariable Long routineId, Authentication authentication){

        routineService.delete(routineId);

        return ResponseEntity.ok().body("루틴 삭제 완료");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Routine routine, Authentication authentication){

        routineService.save(routine);

        return ResponseEntity.ok().body("루틴 등록 완료");
    }

}
