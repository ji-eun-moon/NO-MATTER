package com.example.nomatter.repository;

import com.example.nomatter.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    // 전체 목록
    List<Board> findAll();

    Optional<Board> findByBoardId(Long boardId);

}
