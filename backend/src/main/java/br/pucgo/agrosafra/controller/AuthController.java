package br.pucgo.agrosafra.controller;

import br.pucgo.agrosafra.dto.LoginRequest;
import br.pucgo.agrosafra.dto.LoginResponse;
import br.pucgo.agrosafra.dto.RegistroRequest;
import br.pucgo.agrosafra.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/** Endpoints públicos de autenticação. */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/registro")
    public ResponseEntity<LoginResponse> registrar(@Valid @RequestBody RegistroRequest dados) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registrar(dados));
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest dados) {
        return authService.login(dados);
    }
}
