package com.example.backend.SpringSecurity.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.vault.core.VaultTemplate;
import org.springframework.vault.support.VaultResponse;
import org.springframework.vault.support.Versioned;

import java.util.Map;

@Service
public class HmacSecretService {

    @Autowired
    private VaultTemplate vaultTemplate;

    public String getSecretKey() {
        try {
            Versioned<Map<String, Object>> response = vaultTemplate
                    .opsForVersionedKeyValue("secret")
                    .get("backend/hmac-secret");

            if (response == null || response.getData() == null) {
                throw new IllegalStateException("HMAC secret key not found in Vault at path: secret/backend/hmac-secret");
            }

            String key = (String) response.getData().get("key");
            if (key == null || key.isBlank()) {
                throw new IllegalStateException("HMAC secret key exists but is empty");
            }

            return key;
        } catch (Exception e) {
            throw new IllegalStateException("Failed to retrieve HMAC secret key from Vault", e);
        }
    }
}
