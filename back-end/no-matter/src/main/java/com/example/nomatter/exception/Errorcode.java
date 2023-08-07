package com.example.nomatter.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum Errorcode {
    USERID_DUPLICATED(HttpStatus.CONFLICT, ""),
    USERID_NOT_FOUND(HttpStatus.NOT_FOUND, ""),
    INVALID_ID_PASSWORD(HttpStatus.UNAUTHORIZED, ""),
    UUID_DUPLICATED(HttpStatus.CONFLICT, ""),
    USER_HUB_NOW_FOUND(HttpStatus.NOT_FOUND, ""),
    USER_NOT_GRADE(HttpStatus.UNAUTHORIZED, ""),
    INVITE_CODE_NOT_FOUND(HttpStatus.NOT_FOUND, ""),
    EXPIRED_INVITE_CODE(HttpStatus.UNAUTHORIZED, ""),
    NOT_MODIFY_PASSWORD(HttpStatus.NOT_MODIFIED, "")
    ;

    private HttpStatus httpStatus;
    private String message;
}
