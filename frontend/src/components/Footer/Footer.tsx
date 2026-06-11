function Footer() {
  const anoAtual = new Date().getFullYear()

  return (
    <footer className="rodape mt-5 py-4">
      <div className="container">
        <address className="mb-0 small text-center">
          <strong>Pedro Talalay</strong>
          <br />
          Desenvolvimento de Software WEB — Prof. Alexandre Cláudio de Almeida
          <br />
          PUC Goiás · {anoAtual}
        </address>
      </div>
    </footer>
  )
}

export default Footer
