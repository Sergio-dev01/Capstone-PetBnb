package com.mypetbnb.petbnb.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NewUserDTO(
        @NotBlank(message = "L'email è obbligatoria.")
        @Email
        String email,

        @NotBlank(message = "La password è obbligatoria.")
        @Size(min = 6)
        String password
) {

}
