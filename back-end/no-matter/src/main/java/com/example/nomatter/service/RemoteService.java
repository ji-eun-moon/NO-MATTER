package com.example.nomatter.service;

import com.example.nomatter.domain.Remote;
import com.example.nomatter.exception.AppException;
import com.example.nomatter.exception.Errorcode;
import com.example.nomatter.repository.RemoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RemoteService {

    private final RemoteRepository remoteRepository;

    public List<Remote> findAllByHubId(Long HubId){

        List<Remote> list = remoteRepository.findAllByHubId(HubId);

        return list;

    }

    public Long findRecentlyRemoteId(){

        return remoteRepository.findRecentlyRemoteId();

    }

    public void delete(Long remoteId){

        Remote remote = remoteRepository.findByRemoteId(remoteId).get();

        remoteRepository.delete(remote);

    }
}
