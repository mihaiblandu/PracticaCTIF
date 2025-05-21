package com.example.backend.SpringSecurity.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.*;
import java.security.spec.*;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil {
    private PrivateKey privateKey;
    private PublicKey publicKey;
    private final long jwtExpirationInMs = 3600000;

    @PostConstruct
    public void loadKeys() {
        try (
                var privateKeyStream = getClass().getResourceAsStream("/keys/private_key.pem");
                var publicKeyStream = getClass().getResourceAsStream("/keys/public_key.pem")
        ) {
            if (privateKeyStream == null || publicKeyStream == null) {
                throw new RuntimeException("Key file not found in classpath");
            }

            byte[] privateKeyBytes = privateKeyStream.readAllBytes();
            PKCS8EncodedKeySpec privateSpec = new PKCS8EncodedKeySpec(stripPrivateKeyHeader(privateKeyBytes));
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            this.privateKey = keyFactory.generatePrivate(privateSpec);

            byte[] publicKeyBytes = publicKeyStream.readAllBytes();
            X509EncodedKeySpec publicSpec = new X509EncodedKeySpec(stripPublicKeyHeader(publicKeyBytes));
            this.publicKey = keyFactory.generatePublic(publicSpec);

        } catch (IOException | GeneralSecurityException e) {
            throw new RuntimeException("Failed to load RSA keys", e);
        }
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .signWith(privateKey, SignatureAlgorithm.RS256)
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(publicKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }


    private byte[] stripPrivateKeyHeader(byte[] pemBytes) {
        String pem = new String(pemBytes);
        pem = pem.replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replaceAll("\\s+", "");
        return Decoders.BASE64.decode(pem);
    }

    private byte[] stripPublicKeyHeader(byte[] pemBytes) {
        String pem = new String(pemBytes);
        pem = pem.replace("-----BEGIN PUBLIC KEY-----", "")
                .replace("-----END PUBLIC KEY-----", "")
                .replaceAll("\\s+", "");
        return Decoders.BASE64.decode(pem);
    }
}
