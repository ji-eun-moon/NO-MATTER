package com.example.nomatter.domain.auth;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MemberProfile {

    private String name;
    private String email;
    private String provider;
    private String nickname;

    public Member toMember(){
        return Member.builder()
                .name(name)
                .email(email)
                .provider(provider)
                .build();
    }

}
