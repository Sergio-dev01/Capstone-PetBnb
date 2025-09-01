package services;

import entities.Booking;
import entities.Location;
import entities.User;
import exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.BookingRepository;
import repositories.LocationRepository;
import repositories.UserRepository;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LocationRepository locationRepository;

    public Booking createBooking(Long userId, Long locationId, Booking bookingDetails) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Utente non trovato"));

        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new NotFoundException("Località non trovata"));

        bookingDetails.setUser(user);
        bookingDetails.setLocation(location);

        return bookingRepository.save(bookingDetails);
    }

    public Booking getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NotFoundException("Prenotazione non trovata"));
    }

    public List<Booking> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public void deleteBooking(Long bookingId) {
        Booking booking = getBookingById(bookingId);
        bookingRepository.delete(booking);
    }
}
