package com.example.nomatter.configuration;

import com.example.nomatter.domain.User;
import com.example.nomatter.exception.AppException;
import com.example.nomatter.exception.Errorcode;
import com.example.nomatter.repository.UserRepository;
import com.example.nomatter.service.UserService;
import com.example.nomatter.utils.JwtTokenUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    private final UserService userService;
    private final String secretKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("doFilterInternal authorization : " + authorization);

        if (authorization == null || !authorization.startsWith("Bearer ")) {

            log.error("Token  없거나 잘못되었습니다.");
            filterChain.doFilter(request, response);

            return;
        }

        // token 분리
        String Token = authorization.split(" ")[1];
//        String refreshToken = authorization.split(" ")[2];
        log.info("Token : " + Token);
//        log.info("refreshToken = " + refreshToken);


//        if(JwtTokenUtil.isExpired(Token, secretKey)){
//            log.info("accessToken 만료");
//
//            User user = userService.findByRefreshToken(refreshToken)
//                    .orElseThrow(() -> new AppException(Errorcode.USERID_NOT_FOUND, "아이디가 없어여"));
//
//            if(user != null){
//
//                log.info(user.toString());
//
//                String userId = user.getUserId();
//
//                String newToken = JwtTokenUtil.createToken(userId, secretKey, 1000 * 30L);
//                log.info("newToken = " + newToken);
//                String newRefreshToken = JwtTokenUtil.createRefreshToken(secretKey, 1000 * 60 * 60L);
//
//                user.setRefreshToken(newRefreshToken);
//
//                userService.save(user);
//
//                String[] arr = new String[2];
//                arr[0] = newToken;
//                arr[1] = newRefreshToken;
//
//                response.setHeader("newToken", newToken);
//                response.setHeader("newRefreshToken", newRefreshToken);
//
//
//                log.info("newRefreshToken", newRefreshToken);
//            }
//
//
//            filterChain.doFilter(request, response);
//        }

            // userName 꺼내기
            String userName = JwtTokenUtil.getUserName(Token, secretKey);

            // 권한 부여
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(userName, null, List.of(new SimpleGrantedAuthority("USER")));

            // Detail 넣기
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request, response);


    }
}
