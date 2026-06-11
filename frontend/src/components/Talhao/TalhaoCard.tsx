import type { ITalhao, StatusSafra } from '../../types/ITalhao'
import { ROTULO_CULTURA, ROTULO_STATUS } from '../../types/ITalhao'

interface ITalhaoCardProps {
  talhao: ITalhao
  onAvancarStatus: (id: number) => void
  onEditar: (talhao: ITalhao) => void
  onExcluir: (talhao: ITalhao) => void
  onHistorico: (talhao: ITalhao) => void
}

const classeBadge: Record<StatusSafra, string> = {
  PLANTIO: 'badge-status badge-status--plantio',
  CRESCIMENTO: 'badge-status badge-status--crescimento',
  COLHEITA: 'badge-status badge-status--colheita',
  COMERCIALIZADO: 'badge-status badge-status--comercializado',
}

function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

function TalhaoCard({ talhao, onAvancarStatus, onEditar, onExcluir, onHistorico }: ITalhaoCardProps) {
  const ehComercializado = talhao.status === 'COMERCIALIZADO'

  return (
    <article className={`card talhao-card h-100 shadow-sm ${ehComercializado ? 'opacity-75' : ''}`}>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h3 className="h6 fw-bold mb-0">{talhao.nome}</h3>
          <span className={`badge ${classeBadge[talhao.status]}`}>
            {ROTULO_STATUS[talhao.status]}
          </span>
        </div>

        <p className="small text-muted mb-2">{ROTULO_CULTURA[talhao.cultura]}</p>

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

        <div className="d-flex gap-2 mt-auto">
          <button
            type="button"
            className="btn btn-sm btn-success flex-grow-1"
            onClick={() => onAvancarStatus(talhao.id)}
          >
            {ehComercializado ? 'Nova safra' : 'Avançar ciclo'}
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            title="Histórico de movimentações"
            onClick={() => onHistorico(talhao)}
          >
            🕓
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            title="Editar talhão"
            onClick={() => onEditar(talhao)}
          >
            ✏️
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            title="Excluir talhão"
            onClick={() => onExcluir(talhao)}
          >
            🗑️
          </button>
        </div>
      </div>
    </article>
  )
}

export default TalhaoCard
