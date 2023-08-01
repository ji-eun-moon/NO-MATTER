package com.example.nomatter.repository;

import com.example.nomatter.domain.UserHub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserHubRepository extends JpaRepository<UserHub, Long> {

    Optional<UserHub> findAllByUserId(String userId);

}
