package com.mypetbnb.petbnb.services;

import com.mypetbnb.petbnb.entities.User;
import com.mypetbnb.petbnb.exceptions.UnauthorizedException;
import com.mypetbnb.petbnb.payload.UserLoginDTO;
import com.mypetbnb.petbnb.tools.JwtTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTools bcrypt;

    public String generateToken(UserLoginDTO payload) {
        User user = userService.findByEmail(payload.email());

        if (passwordEncoder.matches(payload.password(), user.getPassword())) {
            return bcrypt.createToken(user);
        } else {
            throw new UnauthorizedException("Credenziali sbagliate");
        }
    }
}
