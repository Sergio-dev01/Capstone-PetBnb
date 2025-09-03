package com.mypetbnb.petbnb.services;

import com.mypetbnb.petbnb.entities.User;
import com.mypetbnb.petbnb.enums.Role;
import com.mypetbnb.petbnb.exceptions.BadRequestException;
import com.mypetbnb.petbnb.exceptions.NotFoundException;
import com.mypetbnb.petbnb.payload.NewUserDTO;
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
        User newUtente = new User(user.email(), bcrypt.encode(user.password()), Role.USER);
        return userRepository.save(newUtente);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Utente non trovato"));
    }

    public User findById(Long userId) {
        return this.userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User con id " + userId + " non trovato."));
    }

    public User findByIdAndUpdate(Long userId, NewUserDTO payload) {

        User found = this.findById(userId);


        if (!found.getEmail().equals(payload.email()))
            this.userRepository.findByEmail(payload.email()).ifPresent(user -> {
                throw new BadRequestException("L'email " + user.getEmail() + " è già in uso!");
            });
        found.setEmail(payload.email());
        found.setPassword(bcrypt.encode(payload.password()));

        User modifiedUser = this.userRepository.save(found);

        log.info("L'utente con id " + found.getId() + " è stato modificato!");

        return modifiedUser;
    }

    public void findByIdAndDelete(Long userId) {
        User found = this.findById(userId);
        this.userRepository.delete(found);
    }


}
