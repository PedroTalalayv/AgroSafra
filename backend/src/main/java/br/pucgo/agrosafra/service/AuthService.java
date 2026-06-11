package br.pucgo.agrosafra.service;

import br.pucgo.agrosafra.dto.LoginRequest;
import br.pucgo.agrosafra.dto.LoginResponse;
import br.pucgo.agrosafra.dto.RegistroRequest;
import br.pucgo.agrosafra.exception.RecursoNaoEncontradoException;
import br.pucgo.agrosafra.model.Usuario;
import br.pucgo.agrosafra.repository.UsuarioRepository;
import br.pucgo.agrosafra.security.JwtService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/** Regras de registro e login de usuários. */
@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder,
                       JwtService jwtService, AuthenticationManager authenticationManager) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    /** Cria a conta (senha com BCrypt) e já devolve o token — o usuário entra logado. */
    public LoginResponse registrar(RegistroRequest dados) {
        if (usuarioRepository.existsByEmail(dados.email())) {
            throw new DataIntegrityViolationException("E-mail já cadastrado");
        }
        Usuario usuario = new Usuario();
        usuario.setNome(dados.nome());
        usuario.setEmail(dados.email());
        usuario.setSenhaHash(passwordEncoder.encode(dados.senha()));
        usuarioRepository.save(usuario);

        return new LoginResponse(jwtService.gerarToken(usuario.getEmail()),
                usuario.getNome(), usuario.getEmail());
    }

    /** Valida as credenciais via AuthenticationManager e devolve o token. */
    public LoginResponse login(LoginRequest dados) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dados.email(), dados.senha()));

        Usuario usuario = usuarioRepository.findByEmail(dados.email())
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado"));

        return new LoginResponse(jwtService.gerarToken(usuario.getEmail()),
                usuario.getNome(), usuario.getEmail());
    }
}
