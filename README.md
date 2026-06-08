# Cadastro de Tarefas - Front-end

Aplicativo mobile desenvolvido com React Native e Expo para gerenciamento de tarefas.

## Objetivo

Este projeto foi desenvolvido como atividade prática de desenvolvimento Fullstack, permitindo realizar operações de cadastro, listagem, edição e exclusão de tarefas através da comunicação com uma API própria.

## Funcionalidades

* Cadastrar tarefas
* Listar tarefas cadastradas
* Editar tarefas existentes
* Excluir tarefas
* Integração com API REST

## Tecnologias Utilizadas

* React Native
* Expo
* Axios
* JavaScript

## Estrutura do Projeto

```text
App.js
assets/
package.json
```

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/maricmoutinho/Cadastro-de-Tarefas-Front-end.git
```

2. Acesse a pasta:

```bash
cd Cadastro-de-Tarefas-Front-end
```

3. Instale as dependências:

```bash
npm install
```

4. Execute o projeto:

```bash
npx expo start
```

## Integração com API

A aplicação consome a API através do Axios.

Exemplo:

```javascript
const API = "http://SEU_IP:3000/tarefas";
```

## Autor

Maria Clara Moutinho
