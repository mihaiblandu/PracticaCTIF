package com.example.backend.SpringSecurity.security;

import com.example.backend.SpringSecurity.config.JwtExpirationProperties;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.vault.core.VaultTemplate;
import org.springframework.vault.support.Versioned;

import java.security.*;
import java.security.spec.*;
import java.util.*;
import java.util.function.Function;

@Component
public class JwtTokenUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenUtil.class);

    //TO-DO: Save keys in cache to avoid multiple calls to Vault
    private volatile PrivateKey privateKey;
    private volatile PublicKey publicKey;

    @Autowired
    private JwtExpirationProperties jwtExpirationProperties;

    @Autowired
    private VaultTemplate vaultTemplate;

    private PrivateKey getPrivateKey() {
        if (privateKey == null) {
            synchronized (this) {
                if (privateKey == null) {
                    logger.debug("Loading private key from Vault...");
                    privateKey = loadPrivateKeyFromVault();
                    logger.debug("Private key loaded successfully");
                }
            }
        }
        return privateKey;
    }


    private PublicKey getPublicKey() {
        if (publicKey == null) {
            synchronized (this) {
                if (publicKey == null) {
                    logger.debug("Loading public key from Vault...");
                    publicKey = loadPublicKeyFromVault();
                    logger.debug("Public key loaded successfully");
                }
            }
        }
        return publicKey;
    }

    public PrivateKey loadPrivateKeyFromVault() {
        try {
            logger.debug("Reading private key from Vault at path: secret/backend/jwt");
            Versioned<Map<String, Object>> response = vaultTemplate
                    .opsForVersionedKeyValue("secret")
                    .get("backend/jwt");

            if (response == null || response.getData() == null) {
                String msg = "Could not read keys from Vault at path: secret/backend/jwt";
                logger.error(msg);
                throw new RuntimeException(msg);
            }

            String privateKeyPem = (String) response.getData().get("private_key");
            logger.debug("Private key PEM fetched: {}", privateKeyPem != null ? "YES" : "NO");
            return loadPrivateKeyFromPem(privateKeyPem);
        } catch (Exception e) {
            logger.error("Failed to load private key from Vault", e);
            throw new RuntimeException("Failed to load private key from Vault", e);
        }
    }

    public PublicKey loadPublicKeyFromVault() {
        try {
            logger.debug("Reading public key from Vault at path: secret/backend/jwt");
            Versioned<Map<String, Object>> response = vaultTemplate
                    .opsForVersionedKeyValue("secret")
                    .get("backend/jwt");

            if (response == null || response.getData() == null) {
                String msg = "Could not read keys from Vault at path: secret/backend/jwt";
                logger.error(msg);
                throw new RuntimeException(msg);
            }

            String publicKeyPem = (String) response.getData().get("public_key");
            logger.debug("Public key PEM fetched: {}", publicKeyPem != null ? "YES" : "NO");
            return loadPublicKeyFromPem(publicKeyPem);
        } catch (Exception e) {
            logger.error("Failed to load public key from Vault", e);
            throw new RuntimeException("Failed to load public key from Vault", e);
        }
    }

    private PrivateKey loadPrivateKeyFromPem(String pem) throws Exception {
        logger.debug("Parsing private key PEM");
        pem = pem.replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replaceAll("\\s+", "");
        byte[] keyBytes = Base64.getDecoder().decode(pem);
        PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);
        PrivateKey key = KeyFactory.getInstance("RSA").generatePrivate(spec);
        logger.debug("Private key parsed successfully");
        return key;
    }

    private PublicKey loadPublicKeyFromPem(String pem) throws Exception {
        logger.debug("Parsing public key PEM");
        pem = pem.replace("-----BEGIN PUBLIC KEY-----", "")
                .replace("-----END PUBLIC KEY-----", "")
                .replaceAll("\\s+", "");
        byte[] keyBytes = Base64.getDecoder().decode(pem);
        X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
        PublicKey key = KeyFactory.getInstance("RSA").generatePublic(spec);
        logger.debug("Public key parsed successfully");
        return key;
    }

    public String generateToken(CustomUserDetails userDetails) {
        logger.debug("Generating JWT token for user: {}", userDetails.getUsername());
        Map<String, Object> claims = new HashMap<>();
        claims.put("jti", UUID.randomUUID().toString());
        claims.put("roles", userDetails.getAuthorities());
        claims.put("userId", userDetails.getUsername());
        claims.put("email", userDetails.getEmail());
        claims.put("origin","http://localhost:8081");
        claims.put("type", "access");
//        // setup origin //
//        //   origin
//        //   id token
//        //   Assuming username is the user ID, adjust as needed
        String token = createToken(claims, userDetails.getUsername(), jwtExpirationProperties.getAccessToken());
        logger.debug("Token generated successfully");
        return token;
    }

    public String generateRefreshToken(CustomUserDetails userDetails){
        logger.debug("Generating JWT refresh token for user: {}",userDetails.getUsername());

        Map<String,Object>claims = new HashMap<>();
        claims.put("jti", UUID.randomUUID().toString());
        claims.put("sub", userDetails.getUsername());
        claims.put("type", "refresh");

        String token = createToken(claims, userDetails.getUsername(),jwtExpirationProperties.getRefreshToken());
        logger.debug("Refresh token generated successfully");

        return token;
    }

    public Boolean validateRefreshToken(String token){
        logger.debug("Validating JWT refresh token");

        try {
            // Just try parsing it
            Jwts.parserBuilder()
                    .setSigningKey(getPublicKey())
                    .build()
                    .parseClaimsJws(token);
            logger.debug("Refresh token parsed OK");
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            logger.warn("Invalid refresh token: {}", e.getMessage());
            return false;
        }
    }



    private String createToken(Map<String, Object> claims, String subject, long expirationTimeMs) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTimeMs))
                .signWith(getPrivateKey(), SignatureAlgorithm.RS256)
                .compact();
    }


    public Boolean validateToken(String token) {
        logger.debug("Validating JWT token");
        try {
            final String type = extractType(token);
            final String origin = extractOrigin(token);
            boolean valid = (!isTokenExpired(token)
                    && "access".equals(type) && "http://localhost:8081".equals(origin));
            logger.debug("Token valid: {}", valid);
            return valid;
        } catch (JwtException | IllegalArgumentException e) {
            logger.warn("Invalid JWT token", e);
            return false;
        }
    }



    public Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getPublicKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }



    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    public String extractJwtId(String token) {
        return extractClaim(token, claims -> claims.get("jti", String.class));
    }
    public String extractOrigin(String token) {
        return extractClaim(token, claims -> claims.get("origin", String.class));
    }
    public String extractUserId(String token) {
        return extractClaim(token, claims -> claims.get("userId", String.class));
    }

    public String extractType(String token) {
        return extractClaim(token, claims -> claims.get("type", String.class));
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getPublicKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
