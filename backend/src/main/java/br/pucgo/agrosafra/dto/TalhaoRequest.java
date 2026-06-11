package br.pucgo.agrosafra.dto;

import br.pucgo.agrosafra.model.TipoCultura;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

/** Dados de criação/edição de um talhão (o status é controlado pelo sistema). */
public record TalhaoRequest(
        @NotBlank(message = "Nome é obrigatório") String nome,
        @NotNull(message = "Cultura é obrigatória") TipoCultura cultura,
        @NotNull(message = "Área é obrigatória")
        @Positive(message = "Área deve ser maior que zero") BigDecimal areaHectares,
        @NotNull(message = "Produtividade é obrigatória")
        @PositiveOrZero(message = "Produtividade não pode ser negativa") Integer produtividadeEstimadaSacas,
        @NotNull(message = "Data de plantio é obrigatória") LocalDate dataPlantio) {
}
