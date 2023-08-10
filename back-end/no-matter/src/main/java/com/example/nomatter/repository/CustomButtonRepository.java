package com.example.nomatter.repository;

import com.example.nomatter.domain.CustomButton;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomButtonRepository extends JpaRepository<CustomButton, Long> {

    List<CustomButton> findAllByRemoteId(Long remoteId);

}
