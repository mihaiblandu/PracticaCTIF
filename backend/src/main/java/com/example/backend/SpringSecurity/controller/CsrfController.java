package com.example.backend.SpringSecurity.controller;

import com.example.backend.SpringSecurity.security.CsrfRepository;

import com.example.backend.SpringSecurity.security.JwtTokenUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CsrfController {

    private final CsrfRepository csrfRepository;
    private final JwtTokenUtil jwtTokenUtil; // your JWT utility to parse JWT and get ID

    public CsrfController(CsrfRepository csrfRepository, JwtTokenUtil jwtTokenUtil) {
        this.csrfRepository = csrfRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @GetMapping("/api/csrf-token")
    public String csrfToken(HttpServletRequest request, HttpServletResponse response) {
        // Extract JWT token from cookie or Authorization header
        String jwt = extractJwtFromRequest(request);

        if (jwt == null) {
            return null;
        }

        String jwtId = jwtTokenUtil.extractJwtId(jwt);  // extract JWT ID from your JWT claims

        String csrfToken = csrfRepository.generateToken(jwtId);

        Cookie cookie = new Cookie("XSRF-TOKEN", csrfToken);
        cookie.setPath("/");
        cookie.setHttpOnly(false);
        cookie.setSecure(true); // true in prod with HTTPS
        response.addCookie(cookie);

        return csrfToken; // or return some JSON with the token if you prefer
    }

    // Helper method to get JWT from cookie or header
    private String extractJwtFromRequest(HttpServletRequest request) {
        // e.g. get from cookie named "JWT"
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("JWT".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        // Or from Authorization Bearer header
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
}
