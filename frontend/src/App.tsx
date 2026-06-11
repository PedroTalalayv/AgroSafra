import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'
import Dashboard from './components/Dashboard/Dashboard'
import TalhaoList from './components/Talhao/TalhaoList'
import TalhaoFormModal from './components/Talhao/TalhaoFormModal'
import HistoricoModal from './components/Talhao/HistoricoModal'
import FiltrosBar, { type IFiltros } from './components/Talhao/FiltrosBar'
import Login from './components/Login/Login'
import { api, ErroApi, limparSessao, obterSessao, salvarSessao } from './services/api'
import type { ISessao, ITalhao, ITalhaoForm } from './types/ITalhao'

/**
 * Raiz da aplicação: controla a sessão (login) e o estado dos talhões,
 * carregados da API e compartilhados entre Dashboard e lista.
 */
function App() {
  const [sessao, setSessao] = useState<ISessao | null>(() => obterSessao())
  const [talhoes, setTalhoes] = useState<ITalhao[]>([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const [filtros, setFiltros] = useState<IFiltros>({ busca: '', status: '', cultura: '' })
  // 'novo' abre o modal vazio; um ITalhao abre em modo edição; null fecha
  const [modalForm, setModalForm] = useState<ITalhao | 'novo' | null>(null)
  const [historicoDe, setHistoricoDe] = useState<ITalhao | null>(null)

  const carregarTalhoes = useCallback(async () => {
    setCarregando(true)
    setErro(null)
    try {
      setTalhoes(await api.listarTalhoes())
    } catch {
      setErro('Não foi possível carregar os talhões. O back-end está rodando?')
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    if (sessao) carregarTalhoes()
  }, [sessao, carregarTalhoes])

  /** Filtragem client-side: busca por nome + status + cultura combinados. */
  const talhoesFiltrados = useMemo(
    () =>
      talhoes.filter(
        (t) =>
          (filtros.status === '' || t.status === filtros.status) &&
          (filtros.cultura === '' || t.cultura === filtros.cultura) &&
          (filtros.busca === '' ||
            t.nome.toLowerCase().includes(filtros.busca.toLowerCase())),
      ),
    [talhoes, filtros],
  )

  function aoAutenticar(novaSessao: ISessao) {
    salvarSessao(novaSessao)
    setSessao(novaSessao)
  }

  function sair() {
    limparSessao()
    setSessao(null)
    setTalhoes([])
  }

  async function avancarStatus(id: number) {
    try {
      const atualizado = await api.avancarStatus(id)
      setTalhoes((anteriores) => anteriores.map((t) => (t.id === id ? atualizado : t)))
    } catch (e) {
      setErro(e instanceof ErroApi ? e.message : 'Não foi possível avançar o ciclo do talhão.')
    }
  }

  async function salvarTalhao(dados: ITalhaoForm) {
    if (modalForm === 'novo') {
      const criado = await api.criarTalhao(dados)
      setTalhoes((anteriores) => [...anteriores, criado])
    } else if (modalForm) {
      const atualizado = await api.atualizarTalhao(modalForm.id, dados)
      setTalhoes((anteriores) =>
        anteriores.map((t) => (t.id === atualizado.id ? atualizado : t)),
      )
    }
    setModalForm(null)
  }

  async function excluirTalhao(talhao: ITalhao) {
    if (!window.confirm(`Excluir o talhão "${talhao.nome}"? O histórico também será removido.`)) {
      return
    }
    try {
      await api.excluirTalhao(talhao.id)
      setTalhoes((anteriores) => anteriores.filter((t) => t.id !== talhao.id))
    } catch (e) {
      setErro(e instanceof ErroApi ? e.message : 'Não foi possível excluir o talhão.')
    }
  }

  if (!sessao) {
    return <Login onAutenticado={aoAutenticar} />
  }

  return (
    <>
      <Header nomeUsuario={sessao.nome} onSair={sair} />

      <main className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-lg-3">
            <Sidebar />
          </div>

          <div className="col-12 col-lg-9">
            <Dashboard talhoes={talhoes} />

            <section id="talhoes">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h4 mb-0">Talhões</h2>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => setModalForm('novo')}
                >
                  + Novo talhão
                </button>
              </div>

              <FiltrosBar filtros={filtros} onChange={setFiltros} />

              {erro && <div className="alert alert-danger">{erro}</div>}
              {carregando && <p className="text-muted">Carregando talhões…</p>}

              {!carregando && !erro && (
                <TalhaoList
                  talhoes={talhoesFiltrados}
                  onAvancarStatus={avancarStatus}
                  onEditar={(t) => setModalForm(t)}
                  onExcluir={excluirTalhao}
                  onHistorico={(t) => setHistoricoDe(t)}
                />
              )}
            </section>
          </div>
        </div>
      </main>

      {modalForm !== null && (
        <TalhaoFormModal
          talhao={modalForm === 'novo' ? null : modalForm}
          onSalvar={salvarTalhao}
          onFechar={() => setModalForm(null)}
        />
      )}

      {historicoDe && (
        <HistoricoModal talhao={historicoDe} onFechar={() => setHistoricoDe(null)} />
      )}

      <Footer />
    </>
  )
}

export default App
