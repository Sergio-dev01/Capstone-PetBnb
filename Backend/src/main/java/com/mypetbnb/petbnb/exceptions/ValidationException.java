package com.mypetbnb.petbnb.exceptions;

import java.util.List;

public class ValidationException extends RuntimeException {

    private List<String> errorMessages;

    public ValidationException(String errorMessages) {
        super(errorMessages);
    }

    public ValidationException(List<String> errorMessages) {
        super("Validation Errors");
        this.errorMessages = errorMessages;
    }

    public List<String> getErrorMessages() {
        return errorMessages;
    }
}

