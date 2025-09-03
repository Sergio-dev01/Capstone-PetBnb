package com.mypetbnb.petbnb.payload;

import java.time.LocalDate;

public record BookingRespDTO(
        Long bookingId,
        Long locationId,
        String locationName,
        LocalDate startDate,
        LocalDate endDate
) {
}
