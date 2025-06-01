package com.example.backend.SpringSecurity.controller;

import com.example.backend.SpringSecurity.security.CsrfRepository;

import com.example.backend.SpringSecurity.security.JwtTokenUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class CsrfController {

    private final CsrfRepository csrfRepository;
    private final JwtTokenUtil jwtTokenUtil; // your JWT utility to parse JWT and get ID

    public CsrfController(CsrfRepository csrfRepository, JwtTokenUtil jwtTokenUtil) {
        this.csrfRepository = csrfRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @GetMapping("/api/csrf-token")
    public ResponseEntity<Map<String, String>> csrfToken(HttpServletRequest request, HttpServletResponse response) {
        String jwt = extractJwtFromRequest(request);
        if (jwt == null) {
            return null;
        }

        String jwtId = jwtTokenUtil.extractJwtId(jwt);
        String csrfToken = csrfRepository.generateToken(jwtId);

        // Set cookie manually with SameSite=None
        String cookieHeader = "XSRF-TOKEN=" + csrfToken +
                "; Path=/; Secure; HttpOnly=false; SameSite=None";
        response.setHeader("Set-Cookie", cookieHeader);

        Map<String, String> body = new HashMap<>();
        body.put("csrfToken", csrfToken); // Important!

        return ResponseEntity.ok(body);
    }

    // Helper method to get JWT from cookie or header
    private String extractJwtFromRequest(HttpServletRequest request) {
        String uri = request.getRequestURI();

        // Skip JWT extraction if this is the login endpoint
        if (uri.equals("/api/auth/login")) {
            return null;
        }

        System.out.println("Cookies in request:");
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                System.out.println(cookie.getName() + " = " + cookie.getValue());
                if (cookie.getName().equals("jwt")) {
                    return cookie.getValue();
                }
            }
        } else {
            System.out.println("No cookies received");
        }

        // Fallback: check Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }

        return null;
    }


}
