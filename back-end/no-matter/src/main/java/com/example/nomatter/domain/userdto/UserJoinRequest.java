package com.example.nomatter.domain.userdto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class UserJoinRequest {

    private String userId;
    private String userPassword;
    private String userName;
    private String userEmail;
    private String userNumber;
    private String socialType;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdat;


    @JsonCreator
    public UserJoinRequest(@JsonProperty("username") String username, @JsonProperty("password") String password) {
        this.userName = username;
        this.userPassword = password;
    }

}
