package com.mypetbnb.petbnb.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UpdateUserDTO(
        String username,

        @Email
        String email,

        @Size(min = 6, message = "La password deve avere almeno 6 caratteri")
        String password
) {
}
