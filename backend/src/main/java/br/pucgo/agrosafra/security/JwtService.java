package br.pucgo.agrosafra.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * Geração e leitura de tokens JWT assinados com HS256.
 * O segredo e a expiração vêm de application.properties (app.jwt.*).
 */
@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String segredo;

    @Value("${app.jwt.expiracao-horas}")
    private long expiracaoHoras;

    private SecretKey chave() {
        return Keys.hmacShaKeyFor(segredo.getBytes(StandardCharsets.UTF_8));
    }

    /** Gera um token tendo o e-mail do usuário como subject. */
    public String gerarToken(String email) {
        Date agora = new Date();
        Date expiracao = new Date(agora.getTime() + expiracaoHoras * 3_600_000L);
        return Jwts.builder()
                .subject(email)
                .issuedAt(agora)
                .expiration(expiracao)
                .signWith(chave())
                .compact();
    }

    /**
     * Extrai o e-mail (subject) de um token válido.
     * Lança JwtException se o token for inválido ou expirado.
     */
    public String extrairEmail(String token) {
        return Jwts.parser()
                .verifyWith(chave())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}
