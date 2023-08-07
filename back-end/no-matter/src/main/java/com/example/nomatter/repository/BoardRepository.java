package com.example.nomatter.repository;

import com.example.nomatter.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    // 전체 목록
    @Query("SELECT b, r.controllerName FROM Board b JOIN Remote r ON b.remoteId = r.remoteId")
    List<Object> findBoardsWithControllerNames();

    // 검색 목록
    @Query("SELECT b, r.controllerName FROM Board b JOIN Remote r ON b.remoteId = r.remoteId WHERE r.controllerName LIKE %:controllerName%")
    List<Object> findBoardsWithControllerNames(@Param("controllerName") String controllerName);


}
