import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'
import Dashboard from './components/Dashboard/Dashboard'
import TalhaoList from './components/Talhao/TalhaoList'
import Login from './components/Login/Login'
import { api, limparSessao, obterSessao, salvarSessao } from './services/api'
import type { ISessao, ITalhao } from './types/ITalhao'

/**
 * Raiz da aplicação: controla a sessão (login) e o estado dos talhões,
 * carregados da API e compartilhados entre Dashboard e lista.
 */
function App() {
  const [sessao, setSessao] = useState<ISessao | null>(() => obterSessao())
  const [talhoes, setTalhoes] = useState<ITalhao[]>([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

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
    const atualizado = await api.avancarStatus(id)
    setTalhoes((anteriores) => anteriores.map((t) => (t.id === id ? atualizado : t)))
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
              <h2 className="h4 mb-3">Talhões</h2>

              {erro && <div className="alert alert-danger">{erro}</div>}
              {carregando && <p className="text-muted">Carregando talhões…</p>}

              {!carregando && !erro && (
                <TalhaoList talhoes={talhoes} onAvancarStatus={avancarStatus} />
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
