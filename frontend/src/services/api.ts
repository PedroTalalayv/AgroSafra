import type { IHistorico, ISessao, ITalhao, ITalhaoForm } from '../types/ITalhao'

/**
 * Camada única de comunicação com o back-end.
 * Injeta o token JWT em toda requisição e trata 401 deslogando o usuário.
 */

const CHAVE_SESSAO = 'agrosafra_sessao'

export function obterSessao(): ISessao | null {
  const bruto = localStorage.getItem(CHAVE_SESSAO)
  return bruto ? (JSON.parse(bruto) as ISessao) : null
}

export function salvarSessao(sessao: ISessao): void {
  localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao))
}

export function limparSessao(): void {
  localStorage.removeItem(CHAVE_SESSAO)
}

/** Erro de negócio vindo da API (formato ErroResponse do back). */
export class ErroApi extends Error {
  constructor(
    public status: number,
    mensagem: string,
    public detalhes?: Record<string, string>,
  ) {
    super(mensagem)
  }
}

async function requisicao<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opcoes.headers as Record<string, string>),
  }
  const sessao = obterSessao()
  if (sessao) headers.Authorization = `Bearer ${sessao.token}`

  const resposta = await fetch(`/api${caminho}`, { ...opcoes, headers })

  // Token expirado/inválido: limpa a sessão e recarrega — o App cai na tela de login
  if (resposta.status === 401 && sessao) {
    limparSessao()
    window.location.reload()
  }

  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => null)
    throw new ErroApi(
      resposta.status,
      corpo?.mensagem ?? `Erro ${resposta.status}`,
      corpo?.detalhes ?? undefined,
    )
  }

  if (resposta.status === 204) return undefined as T
  return (await resposta.json()) as T
}

export const api = {
  login: (email: string, senha: string) =>
    requisicao<ISessao>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    }),

  registrar: (nome: string, email: string, senha: string) =>
    requisicao<ISessao>('/auth/registro', {
      method: 'POST',
      body: JSON.stringify({ nome, email, senha }),
    }),

  listarTalhoes: () => requisicao<ITalhao[]>('/talhoes'),

  criarTalhao: (dados: ITalhaoForm) =>
    requisicao<ITalhao>('/talhoes', { method: 'POST', body: JSON.stringify(dados) }),

  atualizarTalhao: (id: number, dados: ITalhaoForm) =>
    requisicao<ITalhao>(`/talhoes/${id}`, { method: 'PUT', body: JSON.stringify(dados) }),

  excluirTalhao: (id: number) =>
    requisicao<void>(`/talhoes/${id}`, { method: 'DELETE' }),

  avancarStatus: (id: number) =>
    requisicao<ITalhao>(`/talhoes/${id}/avancar-status`, { method: 'PATCH' }),

  listarHistorico: (id: number) => requisicao<IHistorico[]>(`/talhoes/${id}/historico`),
}
