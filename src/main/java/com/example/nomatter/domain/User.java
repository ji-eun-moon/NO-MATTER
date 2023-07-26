package com.example.nomatter.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Table(name = "member")
@Setter
public class User {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

//    @Column(name = "user_id")
    private String userId;

//    @Column(name = "user_password")
    private String userPassword;

//    @Column(name = "user_name")
    private String userName;

//    @Column(name = "user_email")
    private String userEmail;

//    @Column(name = "user_img")
    private String userImg;

//    @Column(name = "user_number")
    private String userNumber;

//    @Column(name = "social_type")
    private String socialType;

    private LocalDateTime createdat;
    private LocalDateTime modifydat;

}
