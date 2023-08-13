package com.example.nomatter.repository;

import com.example.nomatter.domain.Remote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RemoteRepository extends JpaRepository<Remote, Long> {

    List<Remote> findAllByHubId(Long HubId);

    @Query("SELECT MAX(remoteId) FROM Remote")
    Long findRecentlyRemoteId();

    Optional<Remote> findByRemoteId(Long remoteId);

}
