package com.example.nomatter.domain.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class UserModifyRequest {

    private String userId;
    private String userPassword;

}
