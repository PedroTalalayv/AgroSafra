package br.pucgo.agrosafra.dto;

import br.pucgo.agrosafra.model.HistoricoStatus;
import br.pucgo.agrosafra.model.StatusSafra;

import java.time.Instant;

/** Uma movimentação de status na linha do tempo do talhão. */
public record HistoricoResponse(
        Long id,
        StatusSafra statusAnterior,
        StatusSafra statusNovo,
        Instant dataMovimentacao) {

    public static HistoricoResponse de(HistoricoStatus h) {
        return new HistoricoResponse(h.getId(), h.getStatusAnterior(), h.getStatusNovo(),
                h.getDataMovimentacao());
    }
}
