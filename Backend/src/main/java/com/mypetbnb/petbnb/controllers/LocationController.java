package com.mypetbnb.petbnb.controllers;

import com.mypetbnb.petbnb.entities.Location;
import com.mypetbnb.petbnb.entities.User;
import com.mypetbnb.petbnb.payload.NewLocationDTO;
import com.mypetbnb.petbnb.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationController {

    @Autowired
    private LocationService locationService;

    //  crea una location
    @PostMapping
    @PreAuthorize("hasAuthority('HOST')")
    @ResponseStatus(HttpStatus.CREATED)
    public Location createLocation(
            @AuthenticationPrincipal User currentUser,
            @RequestBody @Validated NewLocationDTO locationRequest
    ) {
        return locationService.createLocation(currentUser.getId(), locationRequest);
    }

    //  (USER e HOST): visualizzano una location
    @GetMapping("/{id}")
    public Location getLocationById(@PathVariable Long id) {
        return locationService.getLocationById(id);
    }

    //  (USER e HOST): visualizzano tutte le location pubbliche
    @GetMapping
    public List<Location> getAllLocations() {
        return locationService.getAllLocations();
    }

    // visualizza solo le proprie location
    @GetMapping("/me")
    @PreAuthorize("hasAuthority('HOST')")
    public List<Location> getOwnLocations(@AuthenticationPrincipal User currentUser) {
        return locationService.getLocationsByHost(currentUser.getId());
    }

    //  modifica solo le proprie location
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('HOST')")
    public Location updateLocation(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long id,
            @RequestBody @Validated NewLocationDTO updatedLocation
    ) {
        return locationService.updateLocation(currentUser.getId(), id, updatedLocation);
    }

    // elimina solo le proprie location
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('HOST')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteLocation(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long id
    ) {
        locationService.deleteLocation(currentUser.getId(), id);
    }
}
