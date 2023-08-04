package com.example.nomatter.repository;

import com.example.nomatter.domain.auth.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmailAndProvider(String email, String provider);

    Optional<Member> findByName(String name);

}
