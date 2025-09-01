package services;

import entities.User;
import exceptions.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import payload.UserLoginDTO;
import tools.JwtTools;

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
