# Protótipo de Sistema de Gestão de Regras

Este projeto é um **protótipo funcional** feito em **HTML, CSS e JavaScript**, com foco na criação, edição, visualização e gerenciamento de **regras de negócio** em uma interface simples e interativa.

---

## Funcionalidades

### Tela de Listagem
- Pesquisa por **Código**, **Cliente** e **Nome**
- Tabela com regras cadastradas
- Seis ações por regra:
  - **Visualizar**: exibe detalhes da regra (somente leitura)
  - **Alterar**: abre tela de edição da regra
  - **Excluir**: remove a regra da lista
  - **Ativar**: define a regra como ativada (`Sim`)
  - **Desativar**: define a regra como desativada (`Não`)
  - **Copiar**: duplica a regra, gerando uma nova com ID modificado

### Tela de Cadastro/Edição
- Campos obrigatórios: `ID`, `Nome`
- Campos adicionais:
  - `Descrição`
  - `Cliente` (ex: Planserv, Postal)
  - `Resposta` (Bloqueio, Negação, Autorização, Análise)
  - `Texto da Resposta`
  - `Ativada` (Sim/Não)
  - `Data de Criação`, `Data de Ativação`, `Autor` (fixos no protótipo)
- Tabelas dinâmicas para:
  - **Condições**
  - **Critérios**

### 🔍 Tela de Visualização
- Mostra todos os dados da regra selecionada
- Campos desabilitados (somente leitura)
- Botão para retornar à listagem

---

## 💡 Tecnologias utilizadas

- HTML5
- CSS3 (com Flexbox para organização de botões)
- JavaScript puro (sem bibliotecas externas)

---

## 📂 Organização

```bash
.
├── index.html         # Arquivo com o código HTML + CSS
├── script.js          # Arquivo com o código JS
├── README.md          # Este arquivo de instruções
