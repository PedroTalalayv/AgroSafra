package br.pucgo.agrosafra.repository;

import br.pucgo.agrosafra.model.Talhao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/** Acesso a dados de talhões. */
public interface TalhaoRepository extends JpaRepository<Talhao, Long> {
    List<Talhao> findAllByOrderByNomeAsc();
}
