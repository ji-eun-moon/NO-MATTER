package com.example.nomatter.repository;

import com.example.nomatter.domain.Hub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HubRepository extends JpaRepository<Hub, Long> {

    Optional<Hub> findByHubUuid(String hubUuid);

    Optional<Hub> findByHubId(Long hubId);

    Optional<Hub> findByInviteCode(String inviteCode);


    @Query("SELECT uh.usersHubsId, u.userName, uh.userHubAuth FROM User u JOIN UserHub uh ON u.memberId = uh.userId WHERE uh.hubId = :hubId")
    List<Object> findAllByHubId(@Param("hubId") Long hubId);

}
