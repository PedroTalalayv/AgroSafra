import type { ITalhao, StatusSafra } from '../../types/ITalhao'

interface ITalhaoCardProps {
  talhao: ITalhao
  onAvancarStatus: (id: number) => void
}

const classeBadge: Record<StatusSafra, string> = {
  Plantio: 'bg-info text-dark',
  Crescimento: 'bg-success',
  Colheita: 'bg-warning text-dark',
  Comercializado: 'bg-secondary',
}

function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

function TalhaoCard({ talhao, onAvancarStatus }: ITalhaoCardProps) {
  const ehComercializado = talhao.status === 'Comercializado'

  return (
    <article className={`card h-100 shadow-sm ${ehComercializado ? 'opacity-75' : ''}`}>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h3 className="h6 fw-bold mb-0">{talhao.nome}</h3>
          <span className={`badge ${classeBadge[talhao.status]}`}>
            {talhao.status}
          </span>
        </div>

        <p className="small text-muted mb-2">{talhao.cultura}</p>

        <ul className="list-unstyled small mb-3">
          <li>
            <strong>Área:</strong> {talhao.areaHectares} ha
          </li>
          <li>
            <strong>Produção estimada:</strong>{' '}
            {talhao.produtividadeEstimadaSacas.toLocaleString('pt-BR')} sacas
          </li>
          <li>
            <strong>Plantio:</strong> {formatarData(talhao.dataPlantio)}
          </li>
        </ul>

        <button
          type="button"
          className="btn btn-sm btn-outline-success mt-auto"
          onClick={() => onAvancarStatus(talhao.id)}
        >
          {ehComercializado ? 'Iniciar nova safra' : 'Avançar ciclo'}
        </button>
      </div>
    </article>
  )
}

export default TalhaoCard
