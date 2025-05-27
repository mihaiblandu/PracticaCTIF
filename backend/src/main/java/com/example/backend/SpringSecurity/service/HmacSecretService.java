package com.example.backend.SpringSecurity.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.vault.core.VaultTemplate;
import org.springframework.vault.support.VaultResponse;

@Service
public class HmacSecretService {

    @Autowired
    private VaultTemplate vaultTemplate;

    public String getSecretKey() {
        VaultResponse response = vaultTemplate.read("secret/backend/hmac-secret");
        if (response != null && response.getData() != null) {
            return (String) response.getData().get("key");
        }
        throw new IllegalStateException("HMAC secret key not found in Vault");
    }
}
