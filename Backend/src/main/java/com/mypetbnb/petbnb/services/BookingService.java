package com.mypetbnb.petbnb.services;

import com.mypetbnb.petbnb.entities.Booking;
import com.mypetbnb.petbnb.entities.Location;
import com.mypetbnb.petbnb.entities.User;
import com.mypetbnb.petbnb.exceptions.BadRequestException;
import com.mypetbnb.petbnb.exceptions.NotFoundException;
import com.mypetbnb.petbnb.payload.NewBookingDTO;
import com.mypetbnb.petbnb.payload.UpdateBookingDTO;
import com.mypetbnb.petbnb.repositories.BookingRepository;
import com.mypetbnb.petbnb.repositories.LocationRepository;
import com.mypetbnb.petbnb.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private UserRepository userRepository;

    public Booking createBooking(User user, NewBookingDTO dto) {
        Location location = locationRepository.findById(dto.locationId())
                .orElseThrow(() -> new NotFoundException("Location non trovata"));

        if (dto.startDate().isAfter(dto.endDate())) {
            throw new BadRequestException("La data di inizio non può essere dopo la data di fine");
        }

        // aggiungere logica per evitare doppie prenotazioni

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setLocation(location);
        booking.setStartDate(dto.startDate());
        booking.setEndDate(dto.endDate());

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByUser(User user) {
        return bookingRepository.findByUser(user);
    }

    public Booking updateBooking(Long bookingId, User currentUser, UpdateBookingDTO dto) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NotFoundException("Prenotazione non trovata"));

        if (!booking.getUser().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Non puoi modificare questa prenotazione");
        }

        if (dto.startDate().isAfter(dto.endDate())) {
            throw new BadRequestException("La data di inizio non può essere dopo la data di fine");
        }

        booking.setStartDate(dto.startDate());
        booking.setEndDate(dto.endDate());

        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long bookingId, User currentUser) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NotFoundException("Prenotazione non trovata"));

        if (!booking.getUser().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Non puoi cancellare questa prenotazione");
        }

        bookingRepository.delete(booking);
    }

    public List<Booking> getBookingsForHostLocations(Long hostId) {
        List<Location> hostLocations = locationRepository.findByHostId(hostId);
        if (hostLocations.isEmpty()) return List.of();

        return bookingRepository.findByLocationIn(hostLocations);
    }

}
