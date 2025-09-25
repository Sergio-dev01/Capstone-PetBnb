package com.mypetbnb.petbnb.payload;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record NewLocationDTO(
        @NotBlank(message = "Il nome è obbligatorio")
        String nome,

        @NotBlank(message = "L'indirizzo è obbligatorio")
        String indirizzo,

        @NotBlank(message = "La città è obbligatoria")
        String citta,

        @NotBlank(message = "La descrizione è obbligatoria")
        String descrizione,

        @NotNull(message = "Il prezzo per notte è obbligatorio")
        @Min(value = 0, message = "Il prezzo per notte deve essere positivo")
        double prezzoPerNotte
) {
}
