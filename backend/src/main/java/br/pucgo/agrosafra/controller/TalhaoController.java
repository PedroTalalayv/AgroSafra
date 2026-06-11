package br.pucgo.agrosafra.controller;

import br.pucgo.agrosafra.dto.HistoricoResponse;
import br.pucgo.agrosafra.dto.TalhaoRequest;
import br.pucgo.agrosafra.dto.TalhaoResponse;
import br.pucgo.agrosafra.model.StatusSafra;
import br.pucgo.agrosafra.model.TipoCultura;
import br.pucgo.agrosafra.service.TalhaoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** Endpoints de talhões — todos exigem JWT válido. */
@RestController
@RequestMapping("/api/talhoes")
public class TalhaoController {

    private final TalhaoService talhaoService;

    public TalhaoController(TalhaoService talhaoService) {
        this.talhaoService = talhaoService;
    }

    @GetMapping
    public List<TalhaoResponse> listar(@RequestParam(required = false) StatusSafra status,
                                       @RequestParam(required = false) TipoCultura cultura,
                                       @RequestParam(required = false) String busca) {
        return talhaoService.listar(status, cultura, busca);
    }

    @GetMapping("/{id}")
    public TalhaoResponse buscarPorId(@PathVariable Long id) {
        return talhaoService.buscarPorId(id);
    }

    @GetMapping("/{id}/historico")
    public List<HistoricoResponse> listarHistorico(@PathVariable Long id) {
        return talhaoService.listarHistorico(id);
    }

    @PostMapping
    public ResponseEntity<TalhaoResponse> criar(@Valid @RequestBody TalhaoRequest dados,
                                                Authentication autenticacao) {
        TalhaoResponse criado = talhaoService.criar(dados, autenticacao.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    @PutMapping("/{id}")
    public TalhaoResponse atualizar(@PathVariable Long id, @Valid @RequestBody TalhaoRequest dados) {
        return talhaoService.atualizar(id, dados);
    }

    @PatchMapping("/{id}/avancar-status")
    public TalhaoResponse avancarStatus(@PathVariable Long id) {
        return talhaoService.avancarStatus(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        talhaoService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
