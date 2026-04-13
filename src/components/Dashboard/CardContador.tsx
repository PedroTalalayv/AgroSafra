interface ICardContadorProps {
  titulo: string
  valor: string | number
  descricao?: string
  cor?: 'verde' | 'terra' | 'azul' | 'amarelo'
}

function CardContador({ titulo, valor, descricao, cor = 'verde' }: ICardContadorProps) {
  return (
    <div className={`card-contador card-contador--${cor} h-100 p-3 rounded shadow-sm`}>
      <span className="small text-uppercase fw-semibold opacity-75">{titulo}</span>
      <strong className="d-block fs-3 mt-1">{valor}</strong>
      {descricao && <span className="small opacity-75">{descricao}</span>}
    </div>
  )
}

export default CardContador
