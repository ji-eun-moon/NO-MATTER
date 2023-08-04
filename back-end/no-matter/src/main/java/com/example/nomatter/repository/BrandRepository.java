package com.example.nomatter.repository;

import com.example.nomatter.domain.brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface BrandRepository extends JpaRepository<brand, Long> {



}
