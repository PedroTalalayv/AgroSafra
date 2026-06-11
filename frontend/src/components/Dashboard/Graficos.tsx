import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ITalhao, StatusSafra } from '../../types/ITalhao'
import {
  LISTA_CULTURAS,
  LISTA_STATUS,
  ROTULO_CULTURA,
  ROTULO_STATUS,
} from '../../types/ITalhao'

interface IGraficosProps {
  talhoes: ITalhao[]
}

/** Cores fixas por status — mesmas da paleta dos badges (global.css). */
const COR_STATUS: Record<StatusSafra, string> = {
  PLANTIO: '#5b9bd5',
  CRESCIMENTO: '#3a7d44',
  COLHEITA: '#e9b44c',
  COMERCIALIZADO: '#8d6e63',
}

/** Gráficos derivados da lista de talhões: distribuição por status e área por cultura. */
function Graficos({ talhoes }: IGraficosProps) {
  const dadosStatus = LISTA_STATUS.map((status) => ({
    nome: ROTULO_STATUS[status],
    quantidade: talhoes.filter((t) => t.status === status).length,
    cor: COR_STATUS[status],
  })).filter((d) => d.quantidade > 0)

  const dadosCultura = LISTA_CULTURAS.map((cultura) => ({
    nome: ROTULO_CULTURA[cultura],
    area: talhoes
      .filter((t) => t.cultura === cultura)
      .reduce((soma, t) => soma + t.areaHectares, 0),
  })).filter((d) => d.area > 0)

  if (talhoes.length === 0) return null

  return (
    <div className="row g-3 mb-3">
      <div className="col-12 col-lg-5">
        <div className="card h-100 shadow-sm p-3">
          <h3 className="h6 fw-bold mb-2">Talhões por status</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={dadosStatus}
                dataKey="quantidade"
                nameKey="nome"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {dadosStatus.map((d) => (
                  <Cell key={d.nome} fill={d.cor} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="col-12 col-lg-7">
        <div className="card h-100 shadow-sm p-3">
          <h3 className="h6 fw-bold mb-2">Área plantada por cultura (ha)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dadosCultura}>
              <XAxis dataKey="nome" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="area" name="Área (ha)" fill="#3a7d44" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Graficos
