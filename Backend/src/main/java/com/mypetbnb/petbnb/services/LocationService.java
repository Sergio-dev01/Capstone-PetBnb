package com.mypetbnb.petbnb.services;

import com.mypetbnb.petbnb.entities.Location;
import com.mypetbnb.petbnb.entities.User;
import com.mypetbnb.petbnb.enums.Role;
import com.mypetbnb.petbnb.exceptions.BadRequestException;
import com.mypetbnb.petbnb.exceptions.NotFoundException;
import com.mypetbnb.petbnb.payload.NewLocationDTO;
import com.mypetbnb.petbnb.repositories.LocationRepository;
import com.mypetbnb.petbnb.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private UserRepository userRepository;

    //  Creazione location (solo host)
    public Location createLocation(Long hostId, NewLocationDTO dto) {
        User host = userRepository.findById(hostId)
                .orElseThrow(() -> new NotFoundException("Host non trovato"));

        if (host.getRole() != Role.HOST) {
            throw new BadRequestException("Solo gli host possono creare località.");
        }

        Location location = new Location();
        location.setNome(dto.nome());
        location.setIndirizzo(dto.indirizzo());
        location.setCitta(dto.citta());
        location.setDescrizione(dto.descrizione());
        location.setPrezzoPerNotte(dto.prezzoPerNotte());
        location.setHost(host);  // ✅ collega la location all'host

        return locationRepository.save(location);
    }

    //  Aggiorna location (solo se l'host è proprietario)
    public Location updateLocation(Long hostId, Long locationId, NewLocationDTO dto) {
        Location existing = getLocationById(locationId);

        if (!existing.getHost().getId().equals(hostId)) {
            throw new BadRequestException("Non sei autorizzato a modificare questa località.");
        }

        existing.setNome(dto.nome());
        existing.setIndirizzo(dto.indirizzo());
        existing.setCitta(dto.citta());
        existing.setDescrizione(dto.descrizione());
        existing.setPrezzoPerNotte(dto.prezzoPerNotte());

        return locationRepository.save(existing);
    }

    //  Recupera location pubblica
    public Location getLocationById(Long locationId) {
        return locationRepository.findById(locationId)
                .orElseThrow(() -> new NotFoundException("Località non trovata"));
    }

    //  Lista di tutte le location pubbliche
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    // Elimina location (solo se l'host è proprietario)
    public void deleteLocation(Long hostId, Long locationId) {
        Location location = getLocationById(locationId);

        if (!location.getHost().getId().equals(hostId)) {
            throw new BadRequestException("Non sei autorizzato a eliminare questa località.");
        }

        locationRepository.delete(location);
    }

    //  Ottieni tutte le location di un host
    public List<Location> getLocationsByHost(Long hostId) {
        return locationRepository.findByHostId(hostId);
    }
}
