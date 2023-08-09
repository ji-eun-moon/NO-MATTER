package com.example.nomatter.controller;

import com.example.nomatter.domain.Board;
import com.example.nomatter.service.BoardService;
import com.example.nomatter.service.RemoteService;
import com.example.nomatter.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
@Slf4j
public class BoardController {

    private final BoardService boardService;
    private final UserService userService;
    private final RemoteService remoteService;


    @PostMapping("/register/{remoteId}")
    public ResponseEntity<?> register(@PathVariable Long remoteId, Authentication authentication){

        Board board = Board.builder()
                .userId(userService.findByUserId(authentication.getName()).get().getMemberId())
                .remoteId(remoteId)
                .download(0L)
                .createDate(LocalDateTime.now())
                .build();

        boardService.save(board);

        return ResponseEntity.ok().body("게시물 등록 성공");
    }

    @GetMapping("/list")
    public ResponseEntity<?> list(Authentication authentication){

        List<Object> list = boardService.findBoardsWithControllerNames();


        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestBody Map<String, String> map, Authentication authentication){

        List<Object> list = boardService.findBoardsWithControllerNames(map.get("controllerName"));

        log.info(map.toString());

        return ResponseEntity.ok().body(list);

    }

//    @GetMapping("/view")
//    public ResponseEntity<?> view(@RequestBody Map<String, Long> map){
//
//
//
//    }


}
