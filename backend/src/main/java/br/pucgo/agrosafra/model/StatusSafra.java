package br.pucgo.agrosafra.model;

/**
 * Etapas do ciclo de safra de um talhão.
 * O ciclo é fixo e circular: ao comercializar, o talhão volta ao plantio.
 */
public enum StatusSafra {
    PLANTIO, CRESCIMENTO, COLHEITA, COMERCIALIZADO;

    /** Retorna a próxima etapa do ciclo (COMERCIALIZADO reinicia em PLANTIO). */
    public StatusSafra proximo() {
        return switch (this) {
            case PLANTIO -> CRESCIMENTO;
            case CRESCIMENTO -> COLHEITA;
            case COLHEITA -> COMERCIALIZADO;
            case COMERCIALIZADO -> PLANTIO;
        };
    }
}
