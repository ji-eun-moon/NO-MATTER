package com.example.nomatter.service;

import com.example.nomatter.domain.Board;
import com.example.nomatter.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public void save(Board board){

        boardRepository.save(board);

    }

    public List<Object> findBoardsWithControllerNames(){

        return boardRepository.findBoardsWithControllerNames();

    }

    public List<Object> findBoardsWithControllerNames(String controllerName){

        return boardRepository.findBoardsWithControllerNames(controllerName);

    }
}
