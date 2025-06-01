package com.example.backend.SpringSecurity.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Data
@ConfigurationProperties(prefix = "jwt.expiration")
public class JwtExpirationProperties {

    private long accessToken;
    private long refreshToken;

}
