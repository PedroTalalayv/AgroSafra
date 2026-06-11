package br.pucgo.agrosafra.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

/**
 * Talhão agrícola: unidade de área da fazenda com uma cultura e um
 * status dentro do ciclo de safra. Guarda referência ao usuário que o criou.
 */
@Entity
@Table(name = "talhao")
public class Talhao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoCultura cultura;

    @Column(name = "area_hectares", nullable = false, precision = 10, scale = 2)
    private BigDecimal areaHectares;

    @Column(name = "produtividade_estimada_sacas", nullable = false)
    private Integer produtividadeEstimadaSacas;

    @Column(name = "data_plantio", nullable = false)
    private LocalDate dataPlantio;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusSafra status;

    /** Usuário que cadastrou o talhão (apenas registro de autoria, sem filtro por dono). */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Column(name = "criado_em", nullable = false, updatable = false)
    private Instant criadoEm;

    @Column(name = "atualizado_em")
    private Instant atualizadoEm;

    @PrePersist
    void aoCriar() {
        this.criadoEm = Instant.now();
        this.atualizadoEm = this.criadoEm;
    }

    @PreUpdate
    void aoAtualizar() {
        this.atualizadoEm = Instant.now();
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public TipoCultura getCultura() { return cultura; }
    public void setCultura(TipoCultura cultura) { this.cultura = cultura; }
    public BigDecimal getAreaHectares() { return areaHectares; }
    public void setAreaHectares(BigDecimal areaHectares) { this.areaHectares = areaHectares; }
    public Integer getProdutividadeEstimadaSacas() { return produtividadeEstimadaSacas; }
    public void setProdutividadeEstimadaSacas(Integer valor) { this.produtividadeEstimadaSacas = valor; }
    public LocalDate getDataPlantio() { return dataPlantio; }
    public void setDataPlantio(LocalDate dataPlantio) { this.dataPlantio = dataPlantio; }
    public StatusSafra getStatus() { return status; }
    public void setStatus(StatusSafra status) { this.status = status; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public Instant getCriadoEm() { return criadoEm; }
    public Instant getAtualizadoEm() { return atualizadoEm; }
}
