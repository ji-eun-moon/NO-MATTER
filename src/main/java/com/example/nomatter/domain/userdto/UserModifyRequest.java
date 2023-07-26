package com.example.nomatter.domain.userdto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UserModifyRequest {

    private String userId;
    private String userPassword;

}
