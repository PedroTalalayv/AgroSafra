import type { ITalhao, StatusSafra } from '../../types/ITalhao'
import CardContador from './CardContador'

interface IDashboardProps {
  talhoes: ITalhao[]
}

function contarPorStatus(talhoes: ITalhao[], status: StatusSafra): number {
  return talhoes.filter((t) => t.status === status).length
}

function Dashboard({ talhoes }: IDashboardProps) {
  const totalTalhoes = talhoes.length
  const areaTotal = talhoes.reduce((soma, t) => soma + t.areaHectares, 0)
  const sacasEstimadas = talhoes.reduce(
    (soma, t) => soma + t.produtividadeEstimadaSacas,
    0,
  )

  const emPlantio = contarPorStatus(talhoes, 'Plantio')
  const emCrescimento = contarPorStatus(talhoes, 'Crescimento')
  const emColheita = contarPorStatus(talhoes, 'Colheita')
  const comercializados = contarPorStatus(talhoes, 'Comercializado')

  return (
    <section id="dashboard" className="mb-4">
      <h2 className="h4 mb-3">Dashboard</h2>

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-4">
          <CardContador
            titulo="Talhões cadastrados"
            valor={totalTalhoes}
            descricao="Total em operação"
            cor="verde"
          />
        </div>
        <div className="col-12 col-md-4">
          <CardContador
            titulo="Área total"
            valor={`${areaTotal} ha`}
            descricao="Hectares monitorados"
            cor="terra"
          />
        </div>
        <div className="col-12 col-md-4">
          <CardContador
            titulo="Produção estimada"
            valor={sacasEstimadas.toLocaleString('pt-BR')}
            descricao="Sacas previstas na safra"
            cor="amarelo"
          />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-6 col-md-3">
          <CardContador titulo="Plantio" valor={emPlantio} cor="azul" />
        </div>
        <div className="col-6 col-md-3">
          <CardContador titulo="Crescimento" valor={emCrescimento} cor="verde" />
        </div>
        <div className="col-6 col-md-3">
          <CardContador titulo="Colheita" valor={emColheita} cor="amarelo" />
        </div>
        <div className="col-6 col-md-3">
          <CardContador titulo="Comercializado" valor={comercializados} cor="terra" />
        </div>
      </div>
    </section>
  )
}

export default Dashboard
