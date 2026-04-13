function Header() {
  return (
    <header className="cabecalho shadow-sm">
      <div className="container py-3 d-flex align-items-center justify-content-between">
        <div>
          <h1 className="h3 mb-0 fw-bold">AgroSafra</h1>
          <small className="text-light-emphasis">
            Gestão de talhões e ciclos de safra
          </small>
        </div>
        <nav aria-label="Navegação principal">
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link text-white" href="#dashboard">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#talhoes">
                Talhões
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
