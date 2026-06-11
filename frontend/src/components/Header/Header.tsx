interface IHeaderProps {
  nomeUsuario: string
  onSair: () => void
}

function Header({ nomeUsuario, onSair }: IHeaderProps) {
  return (
    <header className="cabecalho shadow-sm">
      <div className="container py-3 d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <h1 className="h3 mb-0 fw-bold">AgroSafra</h1>
          <small className="text-light-emphasis">
            Gestão de talhões e ciclos de safra
          </small>
        </div>
        <nav aria-label="Navegação principal">
          <ul className="nav align-items-center">
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
            <li className="nav-item d-flex align-items-center gap-2 ms-3">
              <span className="small text-white-50">Olá, {nomeUsuario}</span>
              <button
                type="button"
                className="btn btn-sm btn-outline-light"
                onClick={onSair}
              >
                Sair
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
