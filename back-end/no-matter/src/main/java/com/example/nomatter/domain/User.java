package com.example.nomatter.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name = "users")
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    private String userId;
    private String userPassword;
    private String userName;
    private String userEmail;
    private String userImg;
    private String userPhone;
    private String socialType;
    private LocalDateTime createDate;
    private boolean isPushAlertOn;
    private boolean isDarkAlertOn;

}
