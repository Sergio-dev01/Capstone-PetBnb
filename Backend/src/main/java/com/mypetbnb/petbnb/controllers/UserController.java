package com.mypetbnb.petbnb.controllers;

import com.mypetbnb.petbnb.entities.User;
import com.mypetbnb.petbnb.exceptions.ValidationException;
import com.mypetbnb.petbnb.payload.NewUserDTO;
import com.mypetbnb.petbnb.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Registrazione libera come USER o HOST
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User register(@RequestBody @Validated NewUserDTO newUserDTO, BindingResult validation) {
        if (validation.hasErrors()) {
            List<String> errors = validation.getFieldErrors().stream()
                    .map(field -> field.getDefaultMessage())
                    .toList();
            throw new ValidationException(errors);
        }
        return userService.createUser(newUserDTO);
    }

    //  Visualizza profilo personale (USER o HOST)
    @GetMapping("/me")
    @PreAuthorize("hasAnyAuthority('USER', 'HOST')")
    public User getMyProfile(@AuthenticationPrincipal User currentUser) {
        return currentUser;
    }

    //  Modifica profilo personale (USER o HOST)
    @PutMapping("/me")
    @PreAuthorize("hasAnyAuthority('USER', 'HOST')")
    public User updateMyProfile(@AuthenticationPrincipal User currentUser,
                                @RequestBody @Validated NewUserDTO updateDTO,
                                BindingResult validation) {
        if (validation.hasErrors()) {
            List<String> errors = validation.getFieldErrors().stream()
                    .map(field -> field.getDefaultMessage())
                    .toList();
            throw new ValidationException(errors);
        }

        return userService.findByIdAndUpdate(currentUser.getId(), updateDTO);
    }

    // Elimina profilo personale (USER o HOST)
    @DeleteMapping("/me")
    @PreAuthorize("hasAnyAuthority('USER', 'HOST')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMyAccount(@AuthenticationPrincipal User currentUser) {
        userService.findByIdAndDelete(currentUser.getId());
    }
}
