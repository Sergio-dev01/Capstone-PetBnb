package com.mypetbnb.petbnb.controllers;

import com.mypetbnb.petbnb.entities.Booking;
import com.mypetbnb.petbnb.entities.User;
import com.mypetbnb.petbnb.payload.BookingRespDTO;
import com.mypetbnb.petbnb.payload.NewBookingDTO;
import com.mypetbnb.petbnb.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public BookingRespDTO createBooking(
            @AuthenticationPrincipal User currentUser,
            @RequestBody @Validated NewBookingDTO bookingDTO
    ) {
        Booking booking = bookingService.createBooking(currentUser, bookingDTO);

        return new BookingRespDTO(
                booking.getUser().getId(),
                booking.getLocation().getId(),
                booking.getLocation().getNome(),
                booking.getStartDate(),
                booking.getEndDate()
        );
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public List<Booking> getMyBookings(@AuthenticationPrincipal User currentUser) {
        return bookingService.getBookingsByUser(currentUser);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMyBooking(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser
    ) {
        bookingService.deleteBooking(id, currentUser);
    }
}