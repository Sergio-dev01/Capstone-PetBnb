package com.mypetbnb.petbnb.services;

import com.mypetbnb.petbnb.entities.User;
import com.mypetbnb.petbnb.exceptions.BadRequestException;
import com.mypetbnb.petbnb.exceptions.NotFoundException;
import com.mypetbnb.petbnb.payload.NewUserDTO;
import com.mypetbnb.petbnb.payload.UpdateUserDTO;
import com.mypetbnb.petbnb.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder bcrypt;

    public User createUser(NewUserDTO user) {
        if (userRepository.findByEmail(user.email()).isPresent()) {
            throw new BadRequestException("Email già utilizzata");
        }

        if (userRepository.findByUsername(user.username()).isPresent()) {
            throw new BadRequestException("Username già utilizzato");
        }

        User newUtente = new User(user.username(), user.email(), bcrypt.encode(user.password()), user.role());
        return userRepository.save(newUtente);
    }


    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Utente non trovato"));
    }

    public User findById(Long userId) {
        return this.userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User con id " + userId + " non trovato."));
    }

    public User findByIdAndUpdate(Long userId, UpdateUserDTO payload) {
        User found = this.findById(userId);

        if (payload.email() != null && !payload.email().isBlank() && !found.getEmail().equals(payload.email())) {
            this.userRepository.findByEmail(payload.email()).ifPresent(user -> {
                throw new BadRequestException("L'email " + user.getEmail() + " è già in uso!");
            });
            found.setEmail(payload.email());
        }


        if (payload.username() != null && !payload.username().isBlank() && !found.getUsername().equals(payload.username())) {
            this.userRepository.findByUsername(payload.username()).ifPresent(user -> {
                throw new BadRequestException("Lo username " + user.getUsername() + " è già in uso!");
            });
            found.setUsername(payload.username());
        }


        if (payload.password() != null && !payload.password().isBlank()) {
            found.setPassword(bcrypt.encode(payload.password()));
        }

        User modifiedUser = this.userRepository.save(found);

        log.info("L'utente con id " + found.getId() + " è stato modificato!");

        return modifiedUser;
    }


    public void findByIdAndDelete(Long userId) {
        User found = this.findById(userId);
        this.userRepository.delete(found);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }


}
