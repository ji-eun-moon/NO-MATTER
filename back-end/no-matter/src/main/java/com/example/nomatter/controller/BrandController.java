package com.example.nomatter.controller;

import com.example.nomatter.domain.brand;
import com.example.nomatter.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/brand")
@RequiredArgsConstructor
public class BrandController {

    private final BrandService brandService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody brand brand){

        brandService.register(brand);

        return ResponseEntity.ok().body("브랜드 등록 완료");
    }
}
