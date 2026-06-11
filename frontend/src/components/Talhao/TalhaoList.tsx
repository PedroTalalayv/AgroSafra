import type { ITalhao } from '../../types/ITalhao'
import TalhaoCard from './TalhaoCard'

interface ITalhaoListProps {
  talhoes: ITalhao[]
  onAvancarStatus: (id: number) => void
}

function TalhaoList({ talhoes, onAvancarStatus }: ITalhaoListProps) {
  if (talhoes.length === 0) {
    return <p className="text-muted">Nenhum talhão cadastrado.</p>
  }

  return (
    <div className="row g-3">
      {talhoes.map((talhao) => (
        <div key={talhao.id} className="col-12 col-md-6 col-xl-4">
          <TalhaoCard talhao={talhao} onAvancarStatus={onAvancarStatus} />
        </div>
      ))}
    </div>
  )
}

export default TalhaoList
