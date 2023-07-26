package com.example.nomatter.repository;

import com.example.nomatter.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserId(String userId);

    @Modifying
    @Query("UPDATE User m SET m.userPassword = :userPassword, m.modifydat = now() WHERE m.userId = :userId")
    void updateUserByUserId(String userId, String userPassword);

    void deleteByUserId(String userId);

}
