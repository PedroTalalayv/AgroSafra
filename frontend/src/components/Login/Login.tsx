import { useState, type FormEvent } from 'react'
import { api, ErroApi } from '../../services/api'
import type { ISessao } from '../../types/ITalhao'

interface ILoginProps {
  onAutenticado: (sessao: ISessao) => void
}

/** Tela de login/registro exibida quando não há sessão ativa. */
function Login({ onAutenticado }: ILoginProps) {
  const [modo, setModo] = useState<'login' | 'registro'>('login')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)

  async function aoEnviar(evento: FormEvent) {
    evento.preventDefault()
    setErro(null)
    setCarregando(true)
    try {
      const sessao =
        modo === 'login'
          ? await api.login(email, senha)
          : await api.registrar(nome, email, senha)
      onAutenticado(sessao)
    } catch (e) {
      setErro(e instanceof ErroApi ? e.message : 'Não foi possível conectar ao servidor')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="login-pagina d-flex align-items-center justify-content-center min-vh-100">
      <div className="login-card card shadow border-0 p-4" style={{ maxWidth: 420, width: '100%' }}>
        <div className="text-center mb-4">
          <span className="login-logo d-inline-block fs-1">🌱</span>
          <h1 className="h3 fw-bold mb-1">AgroSafra</h1>
          <p className="text-muted small mb-0">Gestão do ciclo de safra dos seus talhões</p>
        </div>

        <form onSubmit={aoEnviar}>
          {modo === 'registro' && (
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input
                id="nome"
                className="form-control"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="senha" className="form-label">Senha</label>
            <input
              id="senha"
              type="password"
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              minLength={6}
              required
            />
          </div>

          {erro && <div className="alert alert-danger py-2 small">{erro}</div>}

          <button type="submit" className="btn btn-success w-100" disabled={carregando}>
            {carregando ? 'Aguarde…' : modo === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <button
          type="button"
          className="btn btn-link w-100 mt-2 small"
          onClick={() => { setModo(modo === 'login' ? 'registro' : 'login'); setErro(null) }}
        >
          {modo === 'login' ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entrar'}
        </button>

        <p className="text-center text-muted small mt-3 mb-0">
          Demo: demo@agrosafra.com / agrosafra123
        </p>
      </div>
    </main>
  )
}

export default Login
