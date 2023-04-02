package com.insurance.backend.core.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class OperationFailedException extends Exception {
    public OperationFailedException(String message) {
        super(message);
    }
}
