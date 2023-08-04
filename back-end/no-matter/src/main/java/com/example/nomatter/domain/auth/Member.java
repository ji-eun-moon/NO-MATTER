package com.example.nomatter.domain.auth;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Getter
@Setter
@Table
@ToString
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String provider;
    private String nickname;

    @Builder
    public Member(Long id, String name, String email, String provider, String nickname){
        this.id = id;
        this.name = name;
        this.email = email;
        this.provider = provider;
        this.nickname = nickname;
    }

    public Member update(String name, String email){
        this.name = name;
        this.email = email;
        return this;
    }

}
