package com.mypetbnb.petbnb.payload;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record UpdateBookingDTO(
        @NotNull(message = "La data di inizio è obbligatoria")
        LocalDate startDate,

        @NotNull(message = "La data di fine è obbligatoria")
        LocalDate endDate
) {
}
