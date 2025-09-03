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


    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public User getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }


    @PostMapping("/register")
    @PreAuthorize("hasAuthority('ADMIN')")
    public User createUser(@RequestBody @Validated NewUserDTO newUserDTO, BindingResult validation) {
        if (validation.hasErrors()) {
            List<String> errorMessages = validation.getFieldErrors().stream()
                    .map(fieldError -> fieldError.getDefaultMessage())
                    .toList();

            throw new ValidationException(errorMessages);
        } else {
            return userService.createUser(newUserDTO);
        }

    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public User updateUser(@PathVariable Long id, @RequestBody @Validated NewUserDTO newUserDTO, BindingResult validation) {
        if (validation.hasErrors()) {
            throw new ValidationException(validation.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        } else {
            return userService.findByIdAndUpdate(id, newUserDTO);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        userService.findByIdAndDelete(id);
    }

    // ENDPOINT ME

    @GetMapping("/me")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public User getProfile(@AuthenticationPrincipal User currentAuthenticatedUser) {
        return currentAuthenticatedUser;
    }


    @PutMapping("/me")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public User updateOwnProfile(@AuthenticationPrincipal User currentAuthenticatedUser,
                                 @RequestBody @Validated NewUserDTO newUserDTO, BindingResult validation) {
        if (validation.hasErrors()) {
            throw new ValidationException(validation.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        } else {
            return userService.findByIdAndUpdate(currentAuthenticatedUser.getId(), newUserDTO);
        }
    }


    @DeleteMapping("/me")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMe(@AuthenticationPrincipal User currentAuthenticatedUser) {
        userService.findByIdAndDelete(currentAuthenticatedUser.getId());
    }

}
