package com.example.nomatter.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum Errorcode {
    USERNAME_DUPLICATED(HttpStatus.CONFLICT, ""),
    USERNAME_NOT_FOUND(HttpStatus.NOT_FOUND, ""),
    INVALID_ID_PASSWORD(HttpStatus.UNAUTHORIZED, "");
    ;

    private HttpStatus httpStatus;
    private String message;
}
