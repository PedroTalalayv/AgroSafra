import type { ITalhao } from '../../types/ITalhao'
import TalhaoCard from './TalhaoCard'

interface ITalhaoListProps {
  talhoes: ITalhao[]
  onAvancarStatus: (id: number) => void
  onEditar: (talhao: ITalhao) => void
  onExcluir: (talhao: ITalhao) => void
  onHistorico: (talhao: ITalhao) => void
}

function TalhaoList({ talhoes, onAvancarStatus, onEditar, onExcluir, onHistorico }: ITalhaoListProps) {
  if (talhoes.length === 0) {
    return <p className="text-muted">Nenhum talhão encontrado.</p>
  }

  return (
    <div className="row g-3">
      {talhoes.map((talhao) => (
        <div key={talhao.id} className="col-12 col-md-6 col-xl-4">
          <TalhaoCard
            talhao={talhao}
            onAvancarStatus={onAvancarStatus}
            onEditar={onEditar}
            onExcluir={onExcluir}
            onHistorico={onHistorico}
          />
        </div>
      ))}
    </div>
  )
}

export default TalhaoList
