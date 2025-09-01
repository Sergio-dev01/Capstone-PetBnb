package services;

import entities.Location;
import entities.User;
import enums.Role;
import exceptions.BadRequestException;
import exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.LocationRepository;
import repositories.UserRepository;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private UserRepository userRepository;

    public Location createLocation(Long hostId, String nome, String descrizione, String indirizzo) {
        User host = userRepository.findById(hostId)
                .orElseThrow(() -> new NotFoundException("Host non trovato"));

        if (host.getRole() != Role.HOST) {
            throw new BadRequestException("Solo host possono creare località");
        }

        Location location = new Location();
        location.setNome(nome);
        location.setDescrizione(descrizione);
        location.setIndirizzo(indirizzo);

        return locationRepository.save(location);
    }

    public Location getLocationById(Long locationId) {
        return locationRepository.findById(locationId)
                .orElseThrow(() -> new NotFoundException("Località non trovata"));
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public Location updateLocation(Long locationId, Location updatedLocation) {
        Location existingLocation = getLocationById(locationId);
        existingLocation.setNome(updatedLocation.getNome());
        existingLocation.setDescrizione(updatedLocation.getDescrizione());
        existingLocation.setIndirizzo(updatedLocation.getIndirizzo());


        return locationRepository.save(existingLocation);
    }

    public void deleteLocation(Long locationId) {
        Location location = getLocationById(locationId);
        locationRepository.delete(location);
    }
}
