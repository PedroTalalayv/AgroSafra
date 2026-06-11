package br.pucgo.agrosafra.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * Converte exceções em respostas JSON padronizadas (ErroResponse),
 * mantendo os controllers livres de try/catch repetitivo.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RecursoNaoEncontradoException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErroResponse tratarNaoEncontrado(RecursoNaoEncontradoException e) {
        return new ErroResponse(404, e.getMessage());
    }

    /** Erros de Bean Validation nos DTOs: devolve um mapa campo → mensagem. */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErroResponse tratarValidacao(MethodArgumentNotValidException e) {
        Map<String, String> detalhes = new HashMap<>();
        for (FieldError erro : e.getBindingResult().getFieldErrors()) {
            detalhes.put(erro.getField(), erro.getDefaultMessage());
        }
        return new ErroResponse(400, "Dados inválidos", detalhes);
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErroResponse tratarCredenciaisInvalidas(BadCredentialsException e) {
        return new ErroResponse(401, "E-mail ou senha inválidos");
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErroResponse tratarIntegridade(DataIntegrityViolationException e) {
        return new ErroResponse(409, "Violação de integridade de dados (registro duplicado ou em uso)");
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErroResponse tratarGenerico(Exception e) {
        return new ErroResponse(500, "Erro interno no servidor");
    }
}
