package com.mypetbnb.petbnb.payload;

import com.mypetbnb.petbnb.enums.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record NewUserDTO(
        @NotBlank(message = "Lo username è obbligatorio.")
        String username,

        @NotBlank(message = "L'email è obbligatoria.")
        @Email
        String email,

        @NotBlank(message = "La password è obbligatoria.")
        @Size(min = 6)
        String password,

        @Enumerated(EnumType.STRING)
        @NotNull(message = "Il ruolo è obbligatorio (USER o HOST).")
        Role role


) {
}

