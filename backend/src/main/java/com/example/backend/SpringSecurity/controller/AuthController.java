package com.example.backend.SpringSecurity.controller;

import com.example.backend.SpringSecurity.config.JwtExpirationProperties;
import com.example.backend.SpringSecurity.dto.LoginRequest;
import com.example.backend.SpringSecurity.dto.RegisterRequest;
import com.example.backend.SpringSecurity.model.User;
import com.example.backend.SpringSecurity.repository.UserRepository;
import com.example.backend.SpringSecurity.security.CsrfRepository;
import com.example.backend.SpringSecurity.security.CustomUserDetails;
import com.example.backend.SpringSecurity.service.CustomUserDetailsService;
import com.example.backend.SpringSecurity.security.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final CustomUserDetailsService userDetailsService;
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CsrfRepository csrfRepository;

    @Autowired
    private JwtExpirationProperties jwtExpirationProperties;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtTokenUtil jwtTokenUtil,UserRepository userRepository,
                          CustomUserDetailsService userDetailsService,PasswordEncoder passwordEncoder,CsrfRepository csrfRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.csrfRepository = csrfRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword())
        );

        final CustomUserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
        final String token = jwtTokenUtil.generateToken(userDetails);
        final String refreshToken = jwtTokenUtil.generateRefreshToken(userDetails);

        String jti = jwtTokenUtil.extractClaim(token, claims -> claims.get("jti", String.class));
        String csrfToken = csrfRepository.generateToken(jti);

        ResponseCookie jwtCookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofHours(2))
                .sameSite("None")
                .build();

        ResponseCookie csrfCookie = ResponseCookie.from("XSRF-TOKEN", csrfToken)
                .httpOnly(false)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofHours(2))
                .sameSite("None")
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofDays(30))
                .sameSite("None")
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, jwtCookie.toString());
        headers.add(HttpHeaders.SET_COOKIE, csrfCookie.toString());
        headers.add(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        return ResponseEntity.ok()
                .headers(headers)
                .body(Map.of(
                        "csrfToken", csrfToken,
                        "message", "Login successful"
                ));
    }




    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("status", "success");

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole("ROLE_USER");

        userRepository.save(user);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@CookieValue(name = "refreshToken", required = false) String refreshToken,
                                          HttpServletResponse response) {
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token is missing");
        }

        try {

            if (!jwtTokenUtil.validateRefreshToken(refreshToken)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
            }
            System.out.println("refreshToken cookie = " + refreshToken);


            String username = jwtTokenUtil.extractUsername(refreshToken);


            CustomUserDetails userDetails = userDetailsService.loadUserByUsername(username);


            String newAccessToken = jwtTokenUtil.generateToken(userDetails);


            String jti = jwtTokenUtil.extractJwtId(newAccessToken);
            String csrfToken = csrfRepository.generateToken(jti);


            ResponseCookie jwtCookie = ResponseCookie.from("jwt", newAccessToken)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge(Duration.ofMillis(jwtExpirationProperties.getAccessToken()))
                    .sameSite("None")
                    .build();

            ResponseCookie csrfCookie = ResponseCookie.from("XSRF-TOKEN", csrfToken)
                    .httpOnly(false)
                    .secure(true)
                    .path("/")
                    .maxAge(Duration.ofMillis(jwtExpirationProperties.getAccessToken()))
                    .sameSite("None")
                    .build();


            response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());
            response.addHeader(HttpHeaders.SET_COOKIE, csrfCookie.toString());


            return ResponseEntity.ok(Map.of(
                    "csrfToken", csrfToken,
                    "message", "Access token refreshed successfully"
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Could not refresh token: " + e.getMessage());
        }
    }



    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("AuthController is working!");
    }
}

class AuthResponse {
    private final String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}