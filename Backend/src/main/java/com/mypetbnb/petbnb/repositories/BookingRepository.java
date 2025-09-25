package com.mypetbnb.petbnb.repositories;

import com.mypetbnb.petbnb.entities.Booking;
import com.mypetbnb.petbnb.entities.Location;
import com.mypetbnb.petbnb.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);

    List<Booking> findByLocationIn(List<Location> locations);

    List<Booking> findByLocationIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            Long locationId, LocalDate endDate, LocalDate startDate);
}
