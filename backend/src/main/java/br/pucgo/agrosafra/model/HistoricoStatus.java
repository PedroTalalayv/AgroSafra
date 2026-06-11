package br.pucgo.agrosafra.model;

import jakarta.persistence.*;
import java.time.Instant;

/**
 * Registro de movimentação de status de um talhão.
 * Uma linha é gravada a cada avanço do ciclo de safra, formando a linha do tempo.
 */
@Entity
@Table(name = "historico_status")
public class HistoricoStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "talhao_id", nullable = false)
    private Talhao talhao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_anterior", nullable = false)
    private StatusSafra statusAnterior;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_novo", nullable = false)
    private StatusSafra statusNovo;

    @Column(name = "data_movimentacao", nullable = false, updatable = false)
    private Instant dataMovimentacao;

    @PrePersist
    void aoCriar() {
        this.dataMovimentacao = Instant.now();
    }

    public Long getId() { return id; }
    public Talhao getTalhao() { return talhao; }
    public void setTalhao(Talhao talhao) { this.talhao = talhao; }
    public StatusSafra getStatusAnterior() { return statusAnterior; }
    public void setStatusAnterior(StatusSafra statusAnterior) { this.statusAnterior = statusAnterior; }
    public StatusSafra getStatusNovo() { return statusNovo; }
    public void setStatusNovo(StatusSafra statusNovo) { this.statusNovo = statusNovo; }
    public Instant getDataMovimentacao() { return dataMovimentacao; }
}
