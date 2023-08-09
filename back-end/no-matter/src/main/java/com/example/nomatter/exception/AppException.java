package com.example.nomatter.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.function.Supplier;

@AllArgsConstructor
@Getter
public class AppException extends RuntimeException{

    private Errorcode errorcode;
    private String message;

}
