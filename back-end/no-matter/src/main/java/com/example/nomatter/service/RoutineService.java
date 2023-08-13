package com.example.nomatter.service;

import com.example.nomatter.domain.Routine;
import com.example.nomatter.exception.AppException;
import com.example.nomatter.exception.Errorcode;
import com.example.nomatter.repository.RoutineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RoutineService {

    private final RoutineRepository routineRepository;

    public void save(Routine routine){

        routineRepository.save(routine);

    }

    public List<Routine> findAllByHubId(Long hubId){

//        routineRepository.findByHubId(hubId)
//                .orElseThrow(() -> new AppException(Errorcode.ROUTINE_NOT_FOUND, "등록된 루틴이 없습니다. "));

        return routineRepository.findAllByHubId(hubId);

    }

}
