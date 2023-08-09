package com.example.nomatter.repository;

import com.example.nomatter.domain.UserHub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserHubRepository extends JpaRepository<UserHub, Long> {

    List<UserHub> findAllByUserId(Long userId);

    Optional<UserHub> findByUsersHubsId(Long UsersHubsId);

    Optional<UserHub> findByHubIdAndUserId(Long hubId, Long memberId);

    Optional<UserHub> findByUserIdAndHubId(Long memberId, Long hubId);

}
