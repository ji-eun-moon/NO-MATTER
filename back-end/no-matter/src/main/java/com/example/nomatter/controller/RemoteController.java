package com.example.nomatter.controller;

import com.example.nomatter.domain.Board;
import com.example.nomatter.domain.Hub;
import com.example.nomatter.domain.Remote;
import com.example.nomatter.repository.RemoteRepository;
import com.example.nomatter.service.BoardService;
import com.example.nomatter.service.RemoteService;
import com.example.nomatter.service.UserHubService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/remote")
@RequiredArgsConstructor
@Slf4j
public class RemoteController {

    private final RemoteService remoteService;
    private final BoardService boardService;

    @GetMapping("/list/{hubId}")
    public ResponseEntity<?> list(@PathVariable Long hubId, Authentication authentication){

        List<Remote> list = remoteService.findAllByHubId(hubId);

        log.info(String.valueOf(hubId));

        return ResponseEntity.ok().body(list);

    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Remote remote, Authentication authentication){

        remote.setIsBoard(-1L);

        remoteService.save(remote);

        return ResponseEntity.ok().body("리모컨 등록 완료");
    }

    @DeleteMapping("/delete/{remoteId}")
    public ResponseEntity<?> delete(@PathVariable Long remoteId, Authentication authentication){

        remoteService.delete(remoteId);

        return ResponseEntity.ok().body("리모컨 삭제 완료");
    }

    @PostMapping("/download")
    public ResponseEntity<?> download(@RequestBody Map<String, String > map, Authentication authentication){

        Board board = boardService.findByBoardId(Long.parseLong(map.get("boardId")));
        String controllerName = map.get("controllerName");
        Long hudId = Long.parseLong(map.get("hubId"));



        remoteService.findByHubIdAndIsBoard(hudId, board.getBoardId());
        remoteService.findByHubIdAndControllerName(hudId, controllerName);

        Remote remote = Remote.builder()
                .controllerName(controllerName)
                .remoteCode(board.getRemoteCode())
                .remoteType(board.getRemoteType())
                .isBoard(board.getBoardId())
                .hubId(hudId)
                .build();

        remoteService.save(remote);
        board.setDownload(board.getDownload()+1L);

        boardService.save(board);

        return ResponseEntity.ok().body("다운로드 완료");
    }
}
