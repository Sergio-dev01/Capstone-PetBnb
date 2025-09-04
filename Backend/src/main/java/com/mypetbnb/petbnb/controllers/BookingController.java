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
                booking.getId(),
                booking.getLocation().getId(),
                booking.getLocation().getNome(),
                booking.getUser().getUsername(),
                booking.getStartDate(),
                booking.getEndDate()
        );
    }


    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public List<BookingRespDTO> getMyBookings(@AuthenticationPrincipal User currentUser) {
        return bookingService.getBookingsByUser(currentUser).stream()
                .map(booking -> new BookingRespDTO(
                        booking.getId(),
                        booking.getLocation().getId(),
                        booking.getLocation().getNome(),
                        booking.getUser().getUsername(),
                        booking.getStartDate(),
                        booking.getEndDate()
                ))
                .toList();
    }

    @GetMapping("/host")
    @PreAuthorize("hasRole('HOST')")
    public List<BookingRespDTO> getBookingsForMyLocations(@AuthenticationPrincipal User currentHost) {
        return bookingService.getBookingsForHostLocations(currentHost.getId()).stream()
                .map(booking -> new BookingRespDTO(
                        booking.getId(),
                        booking.getLocation().getId(),
                        booking.getLocation().getNome(),
                        booking.getUser().getUsername(),
                        booking.getStartDate(),
                        booking.getEndDate()
                ))
                .toList();
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