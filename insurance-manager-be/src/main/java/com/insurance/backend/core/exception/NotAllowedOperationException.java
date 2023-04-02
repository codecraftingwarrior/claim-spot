package com.insurance.backend.core.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
public class NotAllowedOperationException extends Exception {
    public NotAllowedOperationException(String message) {
        super(message);
    }
}
