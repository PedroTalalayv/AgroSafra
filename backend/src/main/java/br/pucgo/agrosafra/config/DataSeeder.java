package br.pucgo.agrosafra.config;

import br.pucgo.agrosafra.model.StatusSafra;
import br.pucgo.agrosafra.model.Talhao;
import br.pucgo.agrosafra.model.TipoCultura;
import br.pucgo.agrosafra.model.Usuario;
import br.pucgo.agrosafra.repository.TalhaoRepository;
import br.pucgo.agrosafra.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Popula o banco na primeira execução: usuário demo + 6 talhões de exemplo.
 * Idempotente: se já houver usuários, não faz nada.
 * Usa CommandLineRunner (e não data.sql) para gerar o hash BCrypt em runtime.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final TalhaoRepository talhaoRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UsuarioRepository usuarioRepository, TalhaoRepository talhaoRepository,
                      PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.talhaoRepository = talhaoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (usuarioRepository.count() > 0) {
            return;
        }
        Usuario demo = new Usuario();
        demo.setNome("Usuário Demo");
        demo.setEmail("demo@agrosafra.com");
        demo.setSenhaHash(passwordEncoder.encode("agrosafra123"));
        usuarioRepository.save(demo);

        criarTalhao(demo, "Talhão Boa Vista", TipoCultura.SOJA, "120", 7200,
                LocalDate.of(2025, 10, 15), StatusSafra.CRESCIMENTO);
        criarTalhao(demo, "Talhão Córrego Fundo", TipoCultura.MILHO, "85", 12750,
                LocalDate.of(2025, 9, 20), StatusSafra.COLHEITA);
        criarTalhao(demo, "Talhão Serra Azul", TipoCultura.CAFE, "40", 1600,
                LocalDate.of(2025, 11, 2), StatusSafra.PLANTIO);
        criarTalhao(demo, "Talhão Pau-Brasil", TipoCultura.CANA_DE_ACUCAR, "210", 0,
                LocalDate.of(2025, 7, 10), StatusSafra.COMERCIALIZADO);
        criarTalhao(demo, "Talhão Rio Claro", TipoCultura.ALGODAO, "95", 3800,
                LocalDate.of(2025, 10, 28), StatusSafra.CRESCIMENTO);
        criarTalhao(demo, "Talhão Sete Lagoas", TipoCultura.SOJA, "160", 9600,
                LocalDate.of(2025, 10, 5), StatusSafra.PLANTIO);
    }

    private void criarTalhao(Usuario autor, String nome, TipoCultura cultura, String area,
                             int sacas, LocalDate plantio, StatusSafra status) {
        Talhao t = new Talhao();
        t.setNome(nome);
        t.setCultura(cultura);
        t.setAreaHectares(new BigDecimal(area));
        t.setProdutividadeEstimadaSacas(sacas);
        t.setDataPlantio(plantio);
        t.setStatus(status);
        t.setUsuario(autor);
        talhaoRepository.save(t);
    }
}
