package com.mypetbnb.petbnb.runners;

import com.mypetbnb.petbnb.entities.Booking;
import com.mypetbnb.petbnb.entities.Location;
import com.mypetbnb.petbnb.entities.User;
import com.mypetbnb.petbnb.enums.Role;
import com.mypetbnb.petbnb.repositories.BookingRepository;
import com.mypetbnb.petbnb.repositories.LocationRepository;
import com.mypetbnb.petbnb.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataRunner implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            // 👤 Create USERS
            User user1 = new User("user1", "user1@email.com", passwordEncoder.encode("password"), Role.USER);
            User user2 = new User("user2", "user2@email.com", passwordEncoder.encode("password"), Role.USER);
            User user3 = new User("user3", "user3@email.com", passwordEncoder.encode("password"), Role.USER);
            User user4 = new User("user4", "user4@email.com", passwordEncoder.encode("password"), Role.USER);


            // 🧑‍💼 Create HOSTS
            User host1 = new User("host1", "host1@email.com", passwordEncoder.encode("password"), Role.HOST);
            User host2 = new User("host2", "host2@email.com", passwordEncoder.encode("password"), Role.HOST);
            User host3 = new User("host3", "host3@email.com", passwordEncoder.encode("password"), Role.HOST);
            User host4 = new User("host4", "host4@email.com", passwordEncoder.encode("password"), Role.HOST);

            userRepository.saveAll(List.of(user1, user2, user3, user4, host1, host2, host3, host4));

            // 🏡 Create LOCATIONS
            Location loc1 = new Location("Casa Relax", "Via Roma 1", "Milano", "Appartamento accogliente per animali", 80.0, host1);
            Location loc2 = new Location("Villa Pet", "Via Napoli 2", "Roma", "Villa spaziosa per i tuoi amici pelosi", 120.0, host2);
            Location loc3 = new Location("Appartamento Verde", "Via Torino 3", "Torino", "Luminoso e tranquillo", 90.0, host1);
            Location loc4 = new Location("Baita Montagna", "Via Dolomiti 4", "Bolzano", "Perfetto per vacanze invernali", 150.0, host2);
            Location loc5 = new Location("Casa Mare", "Via Spiaggia 5", "Napoli", "Vista mare mozzafiato", 130.0, host3);
            Location loc6 = new Location("Loft Urbano", "Via Milano 6", "Milano", "Loft moderno e spazioso", 110.0, host4);

            locationRepository.saveAll(List.of(loc1, loc2, loc3, loc4, loc5, loc6));

            // 📅 Create BOOKINGS
            Booking b1 = new Booking(user1, loc1, LocalDate.now().plusDays(3), LocalDate.now().plusDays(6));
            Booking b2 = new Booking(user2, loc2, LocalDate.now().plusDays(5), LocalDate.now().plusDays(8));
            Booking b3 = new Booking(user3, loc3, LocalDate.now().plusDays(7), LocalDate.now().plusDays(10));
            Booking b4 = new Booking(user4, loc4, LocalDate.now().plusDays(9), LocalDate.now().plusDays(12));
            Booking b5 = new Booking(user1, loc5, LocalDate.now().plusDays(11), LocalDate.now().plusDays(14));
            Booking b6 = new Booking(user2, loc6, LocalDate.now().plusDays(13), LocalDate.now().plusDays(16));

            bookingRepository.saveAll(List.of(b1, b2, b3, b4, b5, b6));

            System.out.println("Database popolato con dati di test!");
        } else {
            System.out.println("Dati già presenti.");
        }
    }


}
