package com.example.nomatter.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@Getter
public class UserJoinRequest {

    private String userId;
    private String userPassword;
    private String userName;
    private String userEmail;
    private String userNumber;
    private String socialType;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdat;

    @Override
    public String toString() {
        return "UserJoinRequest{" +
                "userId='" + userId + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", userName='" + userName + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userNumber='" + userNumber + '\'' +
                ", socialType='" + socialType + '\'' +
                ", createdat=" + createdat +
                '}';
    }
}
