package com.example.nomatter.service;

import com.example.nomatter.domain.Remote;
import com.example.nomatter.exception.AppException;
import com.example.nomatter.exception.Errorcode;
import com.example.nomatter.repository.RemoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public void save(Remote remote){

        remoteRepository.save(remote);

    }

    public void findByHubIdAndIsBoard(Long hubId, Long isBoard){

        Optional<Remote> optionalRemote = remoteRepository.findByHubIdAndIsBoard(hubId, isBoard);

        if (optionalRemote.isPresent()) {
            throw new AppException(Errorcode.DOWNLOAD_DUCPLICATED, "Code Duplicated");
        }

    }

    public void findByHubIdAndControllerName(Long hubId, String controllerName){

        Optional<Remote> optionalRemote = remoteRepository.findByHubIdAndControllerName(hubId, controllerName);

        if(optionalRemote.isPresent()){
            throw new AppException(Errorcode.REMOTE_NAME_DUPLICATED, "Name Duplicated");
        }

    }
}
