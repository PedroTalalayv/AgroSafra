# AgroSafra

Sistema web para gestão do ciclo de safra: plantio, crescimento, colheita e comercialização de talhões agrícolas.

Trabalho 2 da disciplina **Desenvolvimento de Software WEB** — Prof. Alexandre Cláudio de Almeida (PUC Goiás / ADS).

## Stack

- React 18 + Vite
- TypeScript (strict)
- Bootstrap 5.3 via CDN
- CSS externo para personalização

## Como rodar

```bash
npm install
npm run dev
```

## Estrutura de pastas

```
src/
├── components/
│   ├── Dashboard/       → Dashboard.tsx, CardContador.tsx
│   ├── Footer/          → Footer.tsx (com <address>)
│   ├── Header/          → Header.tsx (com <nav>)
│   ├── Sidebar/         → Sidebar.tsx (com <aside>)
│   └── Talhao/          → TalhaoCard.tsx, TalhaoList.tsx
├── data/
│   └── talhoes.ts       → dados iniciais mockados
├── styles/
│   └── global.css       → variáveis, paleta e estilos custom
├── types/
│   └── ITalhao.ts       → ITalhao, StatusSafra, TipoCultura
├── App.tsx              → composição, useState dos talhões
└── main.tsx
```

## Justificativa da arquitetura

A aplicação foi dividida em componentes organizados por **responsabilidade**, cada um em sua própria pasta, para facilitar manutenção e reuso:

- **`Header`**, **`Sidebar`** e **`Footer`** isolam as regiões fixas do layout. Assim, alterar o cabeçalho ou o rodapé não afeta o conteúdo principal.
- **`Dashboard`** agrega os contadores e recebe a lista de talhões via props. Ele não "sabe" como os dados são gerenciados — apenas deriva as métricas a partir do que lhe é passado. Isso mantém o componente puro e fácil de testar.
- **`CardContador`** foi extraído do Dashboard como componente reutilizável. Usa props tipadas (`ICardContadorProps`) com variação de cor, o que evita duplicação dos 7 cards.
- **`TalhaoCard`** e **`TalhaoList`** seguem o mesmo princípio: o card renderiza um único talhão e a lista apenas itera. O botão de avançar ciclo recebe a função `onAvancarStatus` por props, mantendo o card desacoplado do estado global.
- O **estado único** (`useState<ITalhao[]>`) vive no `App.tsx` e é compartilhado entre Dashboard e TalhaoList. Como os dois consomem a mesma referência, qualquer mudança reflete imediatamente nos contadores — cumprindo o requisito de atualização dinâmica.
- Os **tipos** (`ITalhao`, `StatusSafra`, `TipoCultura`) ficam em `types/` para serem importados em qualquer componente que precise conhecer o contrato do domínio.

A escolha pelo Bootstrap via CDN mantém o `bundle` leve e a estilização customizada fica em um único arquivo CSS externo (`global.css`), com variáveis CSS para a paleta agro (verde plantio, verde escuro, terra, bege).

## Requisitos atendidos

- [x] Componentização e organização em pastas
- [x] Interfaces TypeScript para todas as Props e estados
- [x] Grid responsivo assimétrico (3/9 no desktop, empilhado no mobile)
- [x] Bootstrap via CDN + CSS externo
- [x] Tags semânticas: `header`, `main`, `section`, `aside`, `address`
- [x] Dashboard com contadores dinâmicos
- [x] Mudança visual de status ao interagir (badge e opacidade)
- [x] Rodapé com identificação, disciplina e professor

## Autor

Pedro Talalay — PUC Goiás
