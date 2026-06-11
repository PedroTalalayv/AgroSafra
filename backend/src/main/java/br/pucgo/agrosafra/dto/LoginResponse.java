package br.pucgo.agrosafra.dto;

/** Resposta de autenticação: token JWT + dados básicos do usuário. */
public record LoginResponse(String token, String nome, String email) {
}
