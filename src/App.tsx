import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Header />

      <main className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-lg-3">
            <Sidebar />
          </div>

          <div className="col-12 col-lg-9">
            <section id="dashboard" className="mb-4">
              <h2 className="h4 mb-3">Dashboard</h2>
              <p className="text-muted">
                Em breve: contadores da safra.
              </p>
            </section>

            <section id="talhoes">
              <h2 className="h4 mb-3">Talhões</h2>
              <p className="text-muted">Em breve: listagem de talhões.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
