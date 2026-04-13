import { useState } from 'react'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'
import Dashboard from './components/Dashboard/Dashboard'
import TalhaoList from './components/Talhao/TalhaoList'
import { talhoesIniciais } from './data/talhoes'
import type { ITalhao, StatusSafra } from './types/ITalhao'

const proximoStatus: Record<StatusSafra, StatusSafra> = {
  Plantio: 'Crescimento',
  Crescimento: 'Colheita',
  Colheita: 'Comercializado',
  Comercializado: 'Plantio',
}

function App() {
  const [talhoes, setTalhoes] = useState<ITalhao[]>(talhoesIniciais)

  function avancarStatus(id: number) {
    setTalhoes((anteriores) =>
      anteriores.map((t) =>
        t.id === id ? { ...t, status: proximoStatus[t.status] } : t,
      ),
    )
  }

  return (
    <>
      <Header />

      <main className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-lg-3">
            <Sidebar />
          </div>

          <div className="col-12 col-lg-9">
            <Dashboard talhoes={talhoes} />

            <section id="talhoes">
              <h2 className="h4 mb-3">Talhões</h2>
              <TalhaoList talhoes={talhoes} onAvancarStatus={avancarStatus} />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
