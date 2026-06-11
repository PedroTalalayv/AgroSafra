import type { StatusSafra, TipoCultura } from '../../types/ITalhao'
import {
  LISTA_CULTURAS,
  LISTA_STATUS,
  ROTULO_CULTURA,
  ROTULO_STATUS,
} from '../../types/ITalhao'

export interface IFiltros {
  busca: string
  status: StatusSafra | ''
  cultura: TipoCultura | ''
}

interface IFiltrosBarProps {
  filtros: IFiltros
  onChange: (filtros: IFiltros) => void
}

/** Barra de busca por nome + filtros de status e cultura (filtragem client-side). */
function FiltrosBar({ filtros, onChange }: IFiltrosBarProps) {
  return (
    <div className="row g-2 mb-3">
      <div className="col-12 col-md-6">
        <input
          type="search"
          className="form-control"
          placeholder="Buscar talhão por nome…"
          aria-label="Buscar talhão por nome"
          value={filtros.busca}
          onChange={(e) => onChange({ ...filtros, busca: e.target.value })}
        />
      </div>
      <div className="col-6 col-md-3">
        <select
          className="form-select"
          aria-label="Filtrar por status"
          value={filtros.status}
          onChange={(e) => onChange({ ...filtros, status: e.target.value as IFiltros['status'] })}
        >
          <option value="">Todos os status</option>
          {LISTA_STATUS.map((s) => (
            <option key={s} value={s}>{ROTULO_STATUS[s]}</option>
          ))}
        </select>
      </div>
      <div className="col-6 col-md-3">
        <select
          className="form-select"
          aria-label="Filtrar por cultura"
          value={filtros.cultura}
          onChange={(e) => onChange({ ...filtros, cultura: e.target.value as IFiltros['cultura'] })}
        >
          <option value="">Todas as culturas</option>
          {LISTA_CULTURAS.map((c) => (
            <option key={c} value={c}>{ROTULO_CULTURA[c]}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default FiltrosBar
