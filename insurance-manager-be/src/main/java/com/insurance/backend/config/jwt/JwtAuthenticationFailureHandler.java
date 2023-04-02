package com.insurance.backend.config.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.insurance.backend.common.ErrorCode;
import com.insurance.backend.common.ErrorResponse;
import com.insurance.backend.core.exception.AuthMethodNotSupportedException;
import com.insurance.backend.core.exception.JwtExpiredTokenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFailureHandler implements AuthenticationFailureHandler {
    private final ObjectMapper mapper;

    @Autowired
    public JwtAuthenticationFailureHandler(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        if (exception instanceof BadCredentialsException) {
            mapper.writeValue(
                    response.getWriter(),
                    ErrorResponse.of(
                            "Login ou mot de passe incorrect.",
                            ErrorCode.AUTHENTICATION,
                            HttpStatus.UNAUTHORIZED
                    ));
        } else if (exception instanceof JwtExpiredTokenException) {
            mapper.writeValue(
                    response.getWriter(),
                    ErrorResponse.of(
                            "La session a expiré veuillez vous reconnecter.",
                            ErrorCode.JWT_TOKEN_EXPIRED,
                            HttpStatus.UNAUTHORIZED
                    ));
        } else if (exception instanceof AuthMethodNotSupportedException) {
            mapper.writeValue(
                    response.getWriter(),
                    ErrorResponse.of(
                            exception.getMessage(),
                            ErrorCode.AUTHENTICATION,
                            HttpStatus.UNAUTHORIZED
                    ));
        } else if (exception instanceof DisabledException) {
            mapper.writeValue(
                    response.getWriter(),
                    ErrorResponse.of(
                            "Votre compte n'est pas encore actif.",
                            ErrorCode.DISABLED,
                            HttpStatus.UNAUTHORIZED
                    ));
        } else if (exception instanceof LockedException) {
            mapper.writeValue(
                    response.getWriter(),
                    ErrorResponse.of(
                            "Votre compte a été vérouillé.",
                            ErrorCode.LOCKED,
                            HttpStatus.UNAUTHORIZED
                    ));
        }
        mapper.writeValue(
                response.getWriter(),
                ErrorResponse.of("Un probléme est survenu lors de la connexion", ErrorCode.AUTHENTICATION, HttpStatus.UNAUTHORIZED)
        );
    }
}
