package com.example.backend.SpringSecurity.security;

import com.example.backend.SpringSecurity.service.HmacSecretService;
import org.springframework.stereotype.Component;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

@Component
public class CsrfRepository {

    private static final String HMAC_ALGORITHM = "HmacSHA256";
    private final HmacSecretService hmacSecretService;

    public CsrfRepository(HmacSecretService hmacSecretService) {
        this.hmacSecretService = hmacSecretService;
    }


    public String generateToken(String jwtId) {
        try {
            //origin
            String secretKey = hmacSecretService.getSecretKey();
            String randomValue = generateRandomValue();
            String origin = "http://localhost:8081";
            String message = jwtId.length() + "!" + jwtId + "!" + randomValue.length() + "!" + origin + "!" + randomValue;
            String hmac = hmacSha256(secretKey, message);
            return hmac + "." + randomValue;
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate CSRF token", e);
        }
    }

    public boolean validateToken(String jwtId, String csrfTokenFromRequest) {
        if (csrfTokenFromRequest == null || !csrfTokenFromRequest.contains(".")) {
            return false;
        }

        String[] parts = csrfTokenFromRequest.split("\\.");
        if (parts.length != 2) return false;

        String receivedHmac = parts[0];
        String randomValue = parts[1];

        String secretKey = hmacSecretService.getSecretKey();
        String origin = "http://localhost:8081";

        String message = jwtId.length() + "!" + jwtId + "!" + randomValue.length() + "!" + origin + "!" + randomValue;

        String expectedHmac = hmacSha256(secretKey, message);
        return MessageDigest.isEqual(
                expectedHmac.getBytes(StandardCharsets.UTF_8),
                receivedHmac.getBytes(StandardCharsets.UTF_8)
        );
    }


    private String hmacSha256(String key, String data) {
        try {
            Mac mac = Mac.getInstance(HMAC_ALGORITHM);
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), HMAC_ALGORITHM);
            mac.init(secretKey);
            byte[] hmacBytes = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(hmacBytes);
        } catch (Exception e) {
            throw new RuntimeException("Failed to compute HMAC", e);
        }
    }

    private String generateRandomValue() {
        byte[] randomBytes = new byte[32];
        new SecureRandom().nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }
}
