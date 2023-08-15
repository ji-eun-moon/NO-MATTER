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

    public List<Board> findAll(){

        return boardRepository.findAll();

    }

}
