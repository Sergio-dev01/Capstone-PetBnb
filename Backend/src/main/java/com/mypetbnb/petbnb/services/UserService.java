package com.mypetbnb.petbnb.services;

import com.mypetbnb.petbnb.entities.User;
import com.mypetbnb.petbnb.exceptions.BadRequestException;
import com.mypetbnb.petbnb.exceptions.NotFoundException;
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

    public User createUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new BadRequestException("Email già utilizzata");
        }
        user.setPassword(bcrypt.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Utente non trovato"));
    }

    public User updateUser(Long userId, User userData) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Utente non trovato"));

        if (!user.getEmail().equals(userData.getEmail()) && userRepository.findByEmail(userData.getEmail()).isPresent()) {
            throw new BadRequestException("Email già utilizzata");
        }

        user.setEmail(userData.getEmail());
        if (userData.getPassword() != null && !userData.getPassword().isBlank()) {
            user.setPassword(bcrypt.encode(userData.getPassword()));
        }
        return userRepository.save(user);
    }

}
