package com.example.nomatter.repository;

import com.example.nomatter.domain.Routine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoutineRepository extends JpaRepository<Routine, Long> {

    @Query("SELECT r.hubId, r.routineId, uh.userHubName, r.attributes FROM Routine r JOIN UserHub uh ON r.hubId = uh.hubId WHERE uh.userId = :userId AND r.hubId IN (SELECT hubId FROM UserHub WHERE userId = :userId)")
    List<Object> findAllByHubId(@Param("userId") Long userId);

    Optional<Routine> findByRoutineId(Long routineId);

}
