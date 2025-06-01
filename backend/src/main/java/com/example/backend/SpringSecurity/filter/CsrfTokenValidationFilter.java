package com.example.backend.SpringSecurity.filter;

import com.example.backend.SpringSecurity.security.CsrfRepository;
import com.example.backend.SpringSecurity.security.JwtTokenUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class CsrfTokenValidationFilter extends OncePerRequestFilter {

    private final CsrfRepository csrfRepository;
    private final JwtTokenUtil jwtTokenUtil;

    public CsrfTokenValidationFilter(CsrfRepository csrfRepository, JwtTokenUtil jwtTokenUtil) {
        this.csrfRepository = csrfRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String csrfToken = request.getHeader("X-XSRF-TOKEN");
        String jwt = extractJwtFromRequest(request);

        if (jwt != null) {
            Claims claims;
            try {
                claims = jwtTokenUtil.parseClaims(jwt);
            } catch (JwtException e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid JWT token");
                return;
            }

            String jti = claims.getId();
            if (!"GET".equalsIgnoreCase(request.getMethod()) &&
                    !csrfRepository.validateToken(jti, csrfToken)) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("Invalid CSRF Token");
                return;
            }
            System.out.println("XSRF header = " + request.getHeader("X-XSRF-TOKEN"));
            System.out.println("JWT = " + jwt);
            System.out.println("JWT ID = " + jti);
            System.out.println("CSRF Token = " + csrfToken);
        }


        filterChain.doFilter(request, response);
    }

    private String extractJwtFromRequest(HttpServletRequest request) {
        String uri = request.getRequestURI();

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

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.equals("/api/auth/login") || path.equals("/api/auth/refresh");
    }

}
