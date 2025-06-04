package com.example.backend.SpringSecurity.filter;

import com.example.backend.SpringSecurity.security.CustomUserDetails;
import com.example.backend.SpringSecurity.service.CustomUserDetailsService;
import com.example.backend.SpringSecurity.security.JwtTokenUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Log4j2
public class JwtRequestFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;
    private final CustomUserDetailsService userDetailsService;

    public JwtRequestFilter(JwtTokenUtil jwtTokenUtil, CustomUserDetailsService userDetailsService) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String token = null;
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        } else {

            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if ("jwt".equals(cookie.getName())) {
                        token = cookie.getValue();
                        break;
                    }
                }
            }
        }

        if (token != null) {
            try {
                if (jwtTokenUtil.validateToken(token)) {
                    Claims claims = jwtTokenUtil.parseClaims(token);

                    String username = claims.getSubject();
                    String email = claims.get("email", String.class);
                    String userId = claims.get("userId", String.class);
                    String type = claims.get("type", String.class);

                    if (!"access".equals(type)) {
                        logger.warn("Token is not an access token");
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token type");
                        return;
                    }

                    List<Map<String, String>> rolesRaw = (List<Map<String, String>>) claims.get("roles");
                    List<SimpleGrantedAuthority> authorities = rolesRaw.stream()
                            .map(roleMap -> new SimpleGrantedAuthority(roleMap.get("authority")))
                            .collect(Collectors.toList());

                    CustomUserDetails userDetails = new CustomUserDetails(username, email, authorities);

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (Exception e) {
                logger.error("Failed to parse or validate JWT", e);
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }


    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        return requestURI.equals("/api/auth/refresh") || requestURI.equals("/api/auth/login");
    }

}