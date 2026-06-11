package br.pucgo.agrosafra.exception;

/** Lançada quando um recurso (talhão, usuário) não existe no banco. Vira HTTP 404. */
public class RecursoNaoEncontradoException extends RuntimeException {
    public RecursoNaoEncontradoException(String mensagem) {
        super(mensagem);
    }
}
