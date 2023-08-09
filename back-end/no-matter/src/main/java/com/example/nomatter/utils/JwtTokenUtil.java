package com.example.nomatter.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtTokenUtil {

    public static boolean isExpired(String token, String secretKey) {
        try {
            Date expirationDate = Jwts.parser().setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody().getExpiration();
            return expirationDate.before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            // Handle the exception (log, return false, etc.)
            return true; // Assuming you want to treat any exception as token expired

        }
    }


    public static String createToken(String userName, String key, long expireTime){

        // 일종의 맵
        Claims claims = Jwts.claims();
        claims.put("userName", userName);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    public static String createRefreshToken(String key, long expireTime){

        return Jwts.builder()
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    public static String getUserName(String Token, String secretKey){
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(Token)
                .getBody()
                .get("userName", String.class);
    }

}
