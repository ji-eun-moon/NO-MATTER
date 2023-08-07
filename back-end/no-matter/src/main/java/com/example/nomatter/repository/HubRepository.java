package com.example.nomatter.repository;

import com.example.nomatter.domain.Hub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HubRepository extends JpaRepository<Hub, Long> {

    Optional<Hub> findByHubUuid(String hubUuid);

    Optional<Hub> findByHubId(Long hubId);

    Optional<Hub> findByInviteCode(String inviteCode);

}
