import { useState, type FormEvent } from 'react'
import { ErroApi } from '../../services/api'
import type { ITalhao, ITalhaoForm, TipoCultura } from '../../types/ITalhao'
import { LISTA_CULTURAS, ROTULO_CULTURA } from '../../types/ITalhao'

interface ITalhaoFormModalProps {
  /** Talhão em edição, ou null para criação. */
  talhao: ITalhao | null
  onSalvar: (dados: ITalhaoForm) => Promise<void>
  onFechar: () => void
}

/** Modal de criação/edição de talhão, com validação e erros da API. */
function TalhaoFormModal({ talhao, onSalvar, onFechar }: ITalhaoFormModalProps) {
  const [nome, setNome] = useState(talhao?.nome ?? '')
  const [cultura, setCultura] = useState<TipoCultura>(talhao?.cultura ?? 'SOJA')
  const [areaHectares, setAreaHectares] = useState(String(talhao?.areaHectares ?? ''))
  const [produtividade, setProdutividade] = useState(
    String(talhao?.produtividadeEstimadaSacas ?? ''),
  )
  const [dataPlantio, setDataPlantio] = useState(talhao?.dataPlantio ?? '')
  const [erro, setErro] = useState<string | null>(null)
  const [salvando, setSalvando] = useState(false)

  async function aoEnviar(evento: FormEvent) {
    evento.preventDefault()
    setErro(null)

    const area = Number(areaHectares)
    if (!Number.isFinite(area) || area <= 0) {
      setErro('Área deve ser um número maior que zero')
      return
    }

    setSalvando(true)
    try {
      await onSalvar({
        nome: nome.trim(),
        cultura,
        areaHectares: area,
        produtividadeEstimadaSacas: Number(produtividade) || 0,
        dataPlantio,
      })
    } catch (e) {
      setErro(e instanceof ErroApi ? e.message : 'Erro ao salvar talhão')
      setSalvando(false)
    }
  }

  return (
    <>
      <div className="modal d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={aoEnviar}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {talhao ? 'Editar talhão' : 'Novo talhão'}
                </h5>
                <button type="button" className="btn-close" onClick={onFechar} aria-label="Fechar" />
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="talhao-nome" className="form-label">Nome</label>
                  <input
                    id="talhao-nome"
                    className="form-control"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="talhao-cultura" className="form-label">Cultura</label>
                  <select
                    id="talhao-cultura"
                    className="form-select"
                    value={cultura}
                    onChange={(e) => setCultura(e.target.value as TipoCultura)}
                  >
                    {LISTA_CULTURAS.map((c) => (
                      <option key={c} value={c}>{ROTULO_CULTURA[c]}</option>
                    ))}
                  </select>
                </div>

                <div className="row">
                  <div className="col-6 mb-3">
                    <label htmlFor="talhao-area" className="form-label">Área (ha)</label>
                    <input
                      id="talhao-area"
                      type="number"
                      min="0.01"
                      step="0.01"
                      className="form-control"
                      value={areaHectares}
                      onChange={(e) => setAreaHectares(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label htmlFor="talhao-sacas" className="form-label">Sacas estimadas</label>
                    <input
                      id="talhao-sacas"
                      type="number"
                      min="0"
                      className="form-control"
                      value={produtividade}
                      onChange={(e) => setProdutividade(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="talhao-data" className="form-label">Data de plantio</label>
                  <input
                    id="talhao-data"
                    type="date"
                    className="form-control"
                    value={dataPlantio}
                    onChange={(e) => setDataPlantio(e.target.value)}
                    required
                  />
                </div>

                {erro && <div className="alert alert-danger py-2 small mb-0">{erro}</div>}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={onFechar}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-success" disabled={salvando}>
                  {salvando ? 'Salvando…' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  )
}

export default TalhaoFormModal
