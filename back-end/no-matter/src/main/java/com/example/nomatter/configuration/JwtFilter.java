package com.example.nomatter.configuration;

import com.example.nomatter.service.UserService;
import com.example.nomatter.utils.JwtTokenUtil;
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
        log.info("authorization : " + authorization);

        if(authorization == null || !authorization.startsWith("Bearer ")){

            log.error("Token이 없거나 잘못되었습니다.");
            filterChain.doFilter(request, response);

            return ;
        }

        // token에서 username 꺼내기
        String Token = authorization.split(" ")[1];
        log.info("Token : " + Token);

        // Token Expired 여부
        if(JwtTokenUtil.isExpired(Token, secretKey)){
            log.info("Token이 만료되었습니다.");
            filterChain.doFilter(request, response);
            return ;
        }

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
