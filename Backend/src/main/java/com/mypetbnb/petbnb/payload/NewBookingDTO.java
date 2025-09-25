package com.mypetbnb.petbnb.payload;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record NewBookingDTO(
        @NotNull(message = "L'ID della location è obbligatorio")
        Long locationId,

        @NotNull(message = "La data di inizio è obbligatoria")
        //Serve per verificare che la data sia nel futuro
        @FutureOrPresent
        LocalDate startDate,

        @NotNull(message = "La data di fine è obbligatoria")
        @Future
        LocalDate endDate
) {
}
