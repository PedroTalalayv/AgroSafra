export type StatusSafra =
  | 'Plantio'
  | 'Crescimento'
  | 'Colheita'
  | 'Comercializado'

export type TipoCultura =
  | 'Soja'
  | 'Milho'
  | 'Café'
  | 'Cana-de-açúcar'
  | 'Algodão'

export interface ITalhao {
  id: number
  nome: string
  cultura: TipoCultura
  areaHectares: number
  produtividadeEstimadaSacas: number
  dataPlantio: string
  status: StatusSafra
}
