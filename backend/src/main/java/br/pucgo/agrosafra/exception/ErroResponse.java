package br.pucgo.agrosafra.exception;

import java.util.Map;

/** Formato padronizado de erro retornado pela API. */
public record ErroResponse(int status, String mensagem, Map<String, String> detalhes) {
    public ErroResponse(int status, String mensagem) {
        this(status, mensagem, null);
    }
}
