package com.example.nomatter.service;

import com.example.nomatter.domain.CustomButton;
import com.example.nomatter.repository.CustomButtonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomButtonService {

    private final CustomButtonRepository customButtonRepository;

    public void saveAll(List<CustomButton> list){

        customButtonRepository.saveAll(list);

    }

    public List<CustomButton> findAllByRemoteId(Long remoteId){

        return customButtonRepository.findAllByRemoteId(remoteId);

    }

}
