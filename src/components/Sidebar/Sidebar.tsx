function Sidebar() {
  return (
    <aside className="barra-lateral p-3 rounded shadow-sm">
      <h2 className="h6 text-uppercase text-muted mb-3">Filtros</h2>
      <ul className="list-unstyled small mb-4">
        <li className="mb-2">Todas as culturas</li>
        <li className="mb-2">Soja</li>
        <li className="mb-2">Milho</li>
        <li className="mb-2">Café</li>
        <li className="mb-2">Cana-de-açúcar</li>
        <li className="mb-2">Algodão</li>
      </ul>

      <h2 className="h6 text-uppercase text-muted mb-3">Ciclo da Safra</h2>
      <ol className="small ps-3">
        <li>Plantio</li>
        <li>Crescimento</li>
        <li>Colheita</li>
        <li>Comercializado</li>
      </ol>
    </aside>
  )
}

export default Sidebar
