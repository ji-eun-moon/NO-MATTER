package com.example.nomatter.domain.userdto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class UserModifyRequest {

    private String userId;
    private String userPassword;

}
