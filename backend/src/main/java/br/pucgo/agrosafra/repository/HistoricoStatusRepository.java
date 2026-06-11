package br.pucgo.agrosafra.repository;

import br.pucgo.agrosafra.model.HistoricoStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/** Acesso a dados do histórico de movimentações de status. */
public interface HistoricoStatusRepository extends JpaRepository<HistoricoStatus, Long> {
    List<HistoricoStatus> findByTalhaoIdOrderByDataMovimentacaoDesc(Long talhaoId);
    void deleteByTalhaoId(Long talhaoId);
}
