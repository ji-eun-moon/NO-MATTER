package com.example.nomatter.repository;

import com.example.nomatter.domain.UserHub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserHubRepository extends JpaRepository<UserHub, Long> {

    List<UserHub> findAllByUserId(Long userId);

    Optional<UserHub> findByUsersHubsId(Long UsersHubsId);

    Optional<UserHub> findByHubIdAndUserId(Long hubId, Long memberId);

    Optional<UserHub> findByUserIdAndHubId(Long memberId, Long hubId);

    @Query("SELECT uh.userHubName FROM UserHub uh WHERE uh.hubId = :hubId AND uh.userId = :userId")
    String findNameByHubIdAndUserId(@Param("hubId") Long hubId, @Param("userId") Long userId);

    Optional<UserHub> findByUserHubNameAndUserId(String userHubName, Long userId);

}
