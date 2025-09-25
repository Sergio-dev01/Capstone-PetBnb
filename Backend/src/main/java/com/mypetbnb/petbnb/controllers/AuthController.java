package com.mypetbnb.petbnb.controllers;

import com.mypetbnb.petbnb.entities.User;
import com.mypetbnb.petbnb.exceptions.DuplicateEmailException;
import com.mypetbnb.petbnb.exceptions.ValidationException;
import com.mypetbnb.petbnb.payload.LoginRespDTO;
import com.mypetbnb.petbnb.payload.NewUserDTO;
import com.mypetbnb.petbnb.payload.UserLoginDTO;
import com.mypetbnb.petbnb.payload.UserRespDTO;
import com.mypetbnb.petbnb.services.AuthService;
import com.mypetbnb.petbnb.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder bcrypt;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserRespDTO register(@RequestBody @Validated NewUserDTO body, BindingResult validation) {
        if (validation.hasErrors()) {
            throw new ValidationException(validation.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage)
                    .toList());
        }


        if (userService.existsByEmail(body.email())) {
            throw new DuplicateEmailException("Email già registrata");
        }

        User newUser = userService.createUser(body);
        return new UserRespDTO(newUser.getId());
    }


    @PostMapping("/login")
    public LoginRespDTO login(@RequestBody UserLoginDTO payload) {
        return new LoginRespDTO(authService.generateToken(payload));
    }
}
