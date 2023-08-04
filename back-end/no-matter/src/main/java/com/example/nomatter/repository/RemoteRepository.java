package com.example.nomatter.repository;

import com.example.nomatter.domain.Remote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RemoteRepository extends JpaRepository<Remote, Long> {

    List<Remote> findAllByHubId(Long HubId);

}