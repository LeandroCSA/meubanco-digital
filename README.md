Este é um projeto de teste Frontend para a empresa Idez Digital.

Para acessar o projeto implementado nos servidores da **Vercel** acesse o link:
[https://meubanco-digital.vercel.app/](https://meubanco-digital.vercel.app/)

O escopo do projeto consiste em criar um banco digital, apresentando as informações básica que um banco deve apresentar, como login, página com dados do cliente, transações financeiras e detalhes da transação.

Como tecnologia, foi escolhido para utilizar o framework [Next.js](https://nextjs.org) que pode ser inicializado com o comando [`npx create-next-app@latest`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

No caso deste projeto, basta clonar este repositório [`Ver documentação`](https://cli.github.com/)

```bash
gh repo clone LeandroCSA/meubanco-digital
```
## Getting Started

Após clonar o repositório rode os seguintes comandos no servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Após rodar o projeto, abra em seu navegador o endereço [http://localhost:3000](http://localhost:3000) para ver o projeto.

Você pode começar a editar o arquivo `app/page.tsx` por exemplo e ver as atualizações em tempo real.


## Deploy na Vercel

A melhor forma de fazer um deploy de um projeto Next.js é através da plataforma da [Vercel Platform](https://vercel.com/).

Para mais detalhes, veja a [documentação oficial do Next.js](https://nextjs.org/docs/app/building-your-application/deploying).


## O projeto foi criado:

- [x] NextJs (SSR)
- [x] Tailwind
- [x] Hooks
- [ ] Redux Hooks / Zustand
- [ ] NextAuth
- [ ] MySQL / Firebase / MongoDB / Supabase

#### React Icons
Biblioteca com ícones SVG prontos para uso, usados na interface do usuário.
`npm install react-icons --save`

#### Lodash
Biblioteca de utilitários para otimizar funções como debounce, throttle, cloneDeep, entre outras.
`npm install lodash`
`npm install --save-dev @types/lodash`

#### json2csv
Biblioteca que converte de forma otimizada dados JSON em CSV.
`npm install json2csv`
`npm install --save-dev @types/json2csv`

#### jsPDF + jsPDF AutoTable
Biblioteca para geração de arquivos PDF, utilizada na exportação de transações. Extensão do jspdf para gerar tabelas formatadas automaticamente nos PDFs.
`npm install jspdf jspdf-autotable`

## Informação importantes
##### Sobre a autenticação

A autenticação para acessar as páginas através do uso de um formulário de login, esta sendo feita de forma fake em a implementação de autenticação com banco de dados ou outro formato.

Para acessar basta usar as credenciais de **CPF:** 12345678900 e **Senha:** password


##### Consumo de API

O consumo dos dados das transações esta sendo feita através da API pública como https://mockapi.io/ para gerar dados fictícios. 

Por conta disso, algumas informações não temos controle da forma e formato que são gerados. Um erro que foi detectado é que os avatares e fotos de perfil não estão sendo apresentados de forma correta na própria API, então para contornar a situação optei por utilizar uma outra api pública que gera as fotos de avatares, a API https://i.pravatar.cc/150 onde eu posso parrar um parâmetro `?img=xxx` e esse xxx pode ser o **ID da transação** para gerar fotos diferentes e não ser sempre a mesma foto na lista inteira.

Contudo essa implementação pode gerar algumas informações estranhas como a foto de uma pessoa de gênero feminino com nome de pessoa de gênero masculino, e vice-versa.


## Features atuais (com o escopo do projeto e outroas não)

- Login
- Home (List products)
- - Nome do cliente
- - Saldo em conta - (componente com icone de olho, para esconder e visualizar informações)
- - Botões para Enviar e Receber - **apenas visual, sem implementações**
- - Agência e Conta - (componente de botão de copiae e colar)
- - Lista com as 10 últimas transações - informações via API pública
- - Bloco de informações básica para Investir e Guardar dinheiro
- Transações
- - Total de valores Recebidos e Gastos - **com base nos valores da soma dos retorno da API**
- - Número total de transações
- - Botão para mudar valores dos itens da tabela para Real (BRL) e Dolar (USD)
- - Botão para exportar dados para CSV
- - Filtro dos dados pela data - **Como os valores estão vindo da API, temos apenas 2 dias**
- - Filtro de busca
- - Validação e mensagem quando os filtros retornam zero itens
- Detalhes da transação products
- - Botão para imprimir as informações da página
- - Botão para exportar os dados da transação em PDF
- Sobre

O projeto possui a feature de **tema Dark e Light** que pode ser alternado acessando o menu lateral esquerdo.

Também foi implementada a proteção de rotas privadas como Home (detalhes da conta), Transações, Detalhe daa transação e Sobre. A única página que é acessível sem estar **"logado"** no sistema é a página de login.

O Usuário estando logado e tentar acessar a página de login, será redirecionado para a página Home, e caso o usuário não esteja logado e tentar acessar qualquer página sem ser a de Login, será redirecionado para a página Login para fazer a validação de dados.

## Features futuras

- Autocomplete na busca da página de Transações
- Compartilhar dados da transação
- Enviar e Receber pagamento/dinheiro
- Tela de perfil do usuário
- Notificações
- Pwa
- Implementação de Banco de Dados