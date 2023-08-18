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


    @GetMapping("/list")
    public ResponseEntity<?> list(Authentication authentication){

        List<Board> list = boardService.findAll();

        return ResponseEntity.ok().body(list);

    }

}
