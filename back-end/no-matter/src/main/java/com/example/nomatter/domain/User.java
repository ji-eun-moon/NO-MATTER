package com.example.nomatter.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Table(name = "member")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    private String userId;
    private String userPassword;
    private String userName;
    private String userEmail;
    private String userImg;
    private String userNumber;
    private String socialType;
    private LocalDateTime createdat;
    private LocalDateTime modifydat;

}
