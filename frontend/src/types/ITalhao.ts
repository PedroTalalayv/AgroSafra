/** Etapas do ciclo de safra — valores idênticos ao enum StatusSafra do back-end. */
export type StatusSafra = 'PLANTIO' | 'CRESCIMENTO' | 'COLHEITA' | 'COMERCIALIZADO'

/** Culturas — valores idênticos ao enum TipoCultura do back-end. */
export type TipoCultura = 'SOJA' | 'MILHO' | 'CAFE' | 'CANA_DE_ACUCAR' | 'ALGODAO'

/** Rótulos amigáveis para exibição (o back trafega os nomes dos enums). */
export const ROTULO_STATUS: Record<StatusSafra, string> = {
  PLANTIO: 'Plantio',
  CRESCIMENTO: 'Crescimento',
  COLHEITA: 'Colheita',
  COMERCIALIZADO: 'Comercializado',
}

export const ROTULO_CULTURA: Record<TipoCultura, string> = {
  SOJA: 'Soja',
  MILHO: 'Milho',
  CAFE: 'Café',
  CANA_DE_ACUCAR: 'Cana-de-açúcar',
  ALGODAO: 'Algodão',
}

export const LISTA_STATUS: StatusSafra[] = [
  'PLANTIO',
  'CRESCIMENTO',
  'COLHEITA',
  'COMERCIALIZADO',
]

export const LISTA_CULTURAS: TipoCultura[] = [
  'SOJA',
  'MILHO',
  'CAFE',
  'CANA_DE_ACUCAR',
  'ALGODAO',
]

/** Talhão como retornado pela API (TalhaoResponse). */
export interface ITalhao {
  id: number
  nome: string
  cultura: TipoCultura
  areaHectares: number
  produtividadeEstimadaSacas: number
  dataPlantio: string
  status: StatusSafra
}

/** Dados do formulário de criar/editar (sem id nem status). */
export interface ITalhaoForm {
  nome: string
  cultura: TipoCultura
  areaHectares: number
  produtividadeEstimadaSacas: number
  dataPlantio: string
}

/** Movimentação de status retornada por GET /api/talhoes/{id}/historico. */
export interface IHistorico {
  id: number
  statusAnterior: StatusSafra
  statusNovo: StatusSafra
  dataMovimentacao: string
}

/** Sessão autenticada retornada pelo login/registro. */
export interface ISessao {
  token: string
  nome: string
  email: string
}
