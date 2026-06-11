import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import type { IHistorico, ITalhao } from '../../types/ITalhao'
import { ROTULO_STATUS } from '../../types/ITalhao'

interface IHistoricoModalProps {
  talhao: ITalhao
  onFechar: () => void
}

function formatarDataHora(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR')
}

/** Modal com a linha do tempo de movimentações de status do talhão. */
function HistoricoModal({ talhao, onFechar }: IHistoricoModalProps) {
  const [historico, setHistorico] = useState<IHistorico[] | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    api
      .listarHistorico(talhao.id)
      .then(setHistorico)
      .catch(() => setErro('Não foi possível carregar o histórico'))
  }, [talhao.id])

  return (
    <>
      <div className="modal d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Histórico — {talhao.nome}</h5>
              <button type="button" className="btn-close" onClick={onFechar} aria-label="Fechar" />
            </div>

            <div className="modal-body">
              {erro && <div className="alert alert-danger py-2 small">{erro}</div>}
              {!erro && historico === null && <p className="text-muted">Carregando…</p>}
              {historico && historico.length === 0 && (
                <p className="text-muted mb-0">
                  Nenhuma movimentação registrada — o talhão ainda não avançou de etapa.
                </p>
              )}
              {historico && historico.length > 0 && (
                <ul className="list-group list-group-flush">
                  {historico.map((mov) => (
                    <li key={mov.id} className="list-group-item px-0">
                      <strong>{ROTULO_STATUS[mov.statusAnterior]}</strong>
                      {' → '}
                      <strong>{ROTULO_STATUS[mov.statusNovo]}</strong>
                      <span className="d-block small text-muted">
                        {formatarDataHora(mov.dataMovimentacao)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onFechar}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  )
}

export default HistoricoModal
