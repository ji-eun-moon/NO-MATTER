package com.example.nomatter.domain.userdto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class UserLoginRequest {

    private String userId;
    private String userPassword;

}
