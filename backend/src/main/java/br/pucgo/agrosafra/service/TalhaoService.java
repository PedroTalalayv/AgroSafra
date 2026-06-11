package br.pucgo.agrosafra.service;

import br.pucgo.agrosafra.dto.HistoricoResponse;
import br.pucgo.agrosafra.dto.TalhaoRequest;
import br.pucgo.agrosafra.dto.TalhaoResponse;
import br.pucgo.agrosafra.exception.RecursoNaoEncontradoException;
import br.pucgo.agrosafra.model.HistoricoStatus;
import br.pucgo.agrosafra.model.StatusSafra;
import br.pucgo.agrosafra.model.Talhao;
import br.pucgo.agrosafra.model.TipoCultura;
import br.pucgo.agrosafra.model.Usuario;
import br.pucgo.agrosafra.repository.HistoricoStatusRepository;
import br.pucgo.agrosafra.repository.TalhaoRepository;
import br.pucgo.agrosafra.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Regras de negócio dos talhões: CRUD, avanço do ciclo de safra
 * (com gravação de histórico) e consulta da linha do tempo.
 */
@Service
public class TalhaoService {

    private final TalhaoRepository talhaoRepository;
    private final HistoricoStatusRepository historicoRepository;
    private final UsuarioRepository usuarioRepository;

    public TalhaoService(TalhaoRepository talhaoRepository,
                         HistoricoStatusRepository historicoRepository,
                         UsuarioRepository usuarioRepository) {
        this.talhaoRepository = talhaoRepository;
        this.historicoRepository = historicoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Lista talhões com filtros opcionais.
     * Filtragem em memória: o volume de talhões de uma fazenda é pequeno e isso
     * evita query dinâmica; com crescimento real, migraria para Specifications.
     */
    public List<TalhaoResponse> listar(StatusSafra status, TipoCultura cultura, String busca) {
        return talhaoRepository.findAllByOrderByNomeAsc().stream()
                .filter(t -> status == null || t.getStatus() == status)
                .filter(t -> cultura == null || t.getCultura() == cultura)
                .filter(t -> busca == null || busca.isBlank()
                        || t.getNome().toLowerCase().contains(busca.toLowerCase()))
                .map(TalhaoResponse::de)
                .toList();
    }

    public TalhaoResponse buscarPorId(Long id) {
        return TalhaoResponse.de(buscarEntidade(id));
    }

    /** Cria um talhão sempre em PLANTIO, registrando o usuário autor. */
    public TalhaoResponse criar(TalhaoRequest dados, String emailUsuario) {
        Usuario autor = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado"));

        Talhao talhao = new Talhao();
        aplicarDados(talhao, dados);
        talhao.setStatus(StatusSafra.PLANTIO);
        talhao.setUsuario(autor);
        return TalhaoResponse.de(talhaoRepository.save(talhao));
    }

    /** Atualiza os dados cadastrais (o status só muda via avancarStatus). */
    public TalhaoResponse atualizar(Long id, TalhaoRequest dados) {
        Talhao talhao = buscarEntidade(id);
        aplicarDados(talhao, dados);
        return TalhaoResponse.de(talhaoRepository.save(talhao));
    }

    /** Exclui o talhão e seu histórico (na mesma transação, para não violar a FK). */
    @Transactional
    public void excluir(Long id) {
        Talhao talhao = buscarEntidade(id);
        historicoRepository.deleteByTalhaoId(talhao.getId());
        talhaoRepository.delete(talhao);
    }

    /** Avança o ciclo de safra e grava a movimentação no histórico (transação única). */
    @Transactional
    public TalhaoResponse avancarStatus(Long id) {
        Talhao talhao = buscarEntidade(id);
        StatusSafra anterior = talhao.getStatus();
        talhao.setStatus(anterior.proximo());

        HistoricoStatus movimentacao = new HistoricoStatus();
        movimentacao.setTalhao(talhao);
        movimentacao.setStatusAnterior(anterior);
        movimentacao.setStatusNovo(talhao.getStatus());
        historicoRepository.save(movimentacao);

        return TalhaoResponse.de(talhaoRepository.save(talhao));
    }

    /** Linha do tempo de movimentações do talhão (mais recente primeiro). */
    public List<HistoricoResponse> listarHistorico(Long id) {
        buscarEntidade(id); // garante 404 se o talhão não existir
        return historicoRepository.findByTalhaoIdOrderByDataMovimentacaoDesc(id).stream()
                .map(HistoricoResponse::de)
                .toList();
    }

    private Talhao buscarEntidade(Long id) {
        return talhaoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Talhão não encontrado: id " + id));
    }

    private void aplicarDados(Talhao talhao, TalhaoRequest dados) {
        talhao.setNome(dados.nome());
        talhao.setCultura(dados.cultura());
        talhao.setAreaHectares(dados.areaHectares());
        talhao.setProdutividadeEstimadaSacas(dados.produtividadeEstimadaSacas());
        talhao.setDataPlantio(dados.dataPlantio());
    }
}
