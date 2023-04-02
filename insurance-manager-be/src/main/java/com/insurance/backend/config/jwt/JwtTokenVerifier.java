package com.insurance.backend.config.jwt;

import com.google.common.base.Strings;
import com.insurance.backend.core.auth.ApplicationUser;
import com.insurance.backend.core.auth.ApplicationUserService;
import com.insurance.backend.core.exception.ResourceNotFoundException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

public class JwtTokenVerifier extends OncePerRequestFilter {
    private final SecretKey secretKey;
    private final JwtConfig jwtConfig;
    private final ApplicationUserService applicationUserService;

    public JwtTokenVerifier(SecretKey secretKey, JwtConfig jwtConfig, ApplicationUserService applicationUserService) {
        this.secretKey = secretKey;
        this.jwtConfig = jwtConfig;
        this.applicationUserService = applicationUserService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader(jwtConfig.getAuthorizationHeader());

        if (Strings.isNullOrEmpty(authorizationHeader) || !authorizationHeader.startsWith(jwtConfig.getTokenPrefix() + " ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String token = authorizationHeader.replace(jwtConfig.getTokenPrefix() + " ", "");
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);
            Claims body = claimsJws.getBody();
            String username = body.getSubject();
            List<Map<String, String>> authorities = (List<Map<String, String>>) body.get("authorities");
            Collection<? extends GrantedAuthority> grantedAuthorities = new HashSet<>();
            try {
                ApplicationUser currentUser = applicationUserService.findByUsername(username);
                grantedAuthorities = currentUser.getAuthorities();
            } catch (ResourceNotFoundException e) {
                e.printStackTrace();
            }

            Set<SimpleGrantedAuthority> simpleGrantedAuthorities = authorities
                    .stream()
                    .map(map -> new SimpleGrantedAuthority(map.get("authority")))
                    .collect(Collectors.toSet());

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    username,
                    null,
                    !grantedAuthorities.isEmpty() ? grantedAuthorities : simpleGrantedAuthorities
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (JwtException e) {
            throw new IllegalStateException("Jeton de securité invalide");
        }

        filterChain.doFilter(request, response);
    }
}
