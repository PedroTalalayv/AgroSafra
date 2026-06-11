package br.pucgo.agrosafra.dto;

import br.pucgo.agrosafra.model.StatusSafra;
import br.pucgo.agrosafra.model.Talhao;
import br.pucgo.agrosafra.model.TipoCultura;

import java.math.BigDecimal;
import java.time.LocalDate;

/** Representação de um talhão na API (não expõe a entidade JPA). */
public record TalhaoResponse(
        Long id,
        String nome,
        TipoCultura cultura,
        BigDecimal areaHectares,
        Integer produtividadeEstimadaSacas,
        LocalDate dataPlantio,
        StatusSafra status) {

    public static TalhaoResponse de(Talhao t) {
        return new TalhaoResponse(t.getId(), t.getNome(), t.getCultura(), t.getAreaHectares(),
                t.getProdutividadeEstimadaSacas(), t.getDataPlantio(), t.getStatus());
    }
}
