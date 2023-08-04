package com.example.nomatter.service;

import com.example.nomatter.domain.brand;
import com.example.nomatter.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BrandService {

    private final BrandRepository brandRepository;

    public void register(brand brand){

        brandRepository.save(brand);

    }

}
