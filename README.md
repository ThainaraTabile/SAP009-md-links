# Markdown Links


## Índice

- [Markdown Links](#markdown-links)
  - [Índice](#índice)
  - [1. Sobre o projeto](#1-sobre-o-projeto)
  - [2. Funcionalidades](#2-funcionalidades)
  - [3. Instruções de Uso](#3-instruções-de-uso)
  - [4. Considerações técnicas](#4-considerações-técnicas)

***

## 1. Sobre o projeto

Este projeto é composto por uma ferramenta de linha de comando `(CLI)`, a qual permite que o usuário execute a biblioteca diretamente do terminal, através de um módulo do Node.js que analisa os arquivos em formato `Markdown`.

A `CLI` revela os links encontrados, indicando a rota do arquivo onde foi encontrado o link, a URL encontrada e o texto que aparece dentro de um link. Também pode validar os links e fornecer estatísticas sobre os mesmos.

A aplicação foi desenvolvida em três sprints, seguindo um planejamento definido previamente através de um fluxograma e detalhamento das tarefas no Trello.

## 2. Funcionalidades

As funcionalidades atualmente disponíveis são:

* `Listagem de links`: exibe os links encontrados nos arquivos Markdown, mostrando a rota do arquivo onde foi encontrado o link, a URL encontrada e o texto que aparece dentro do link. 

* `Validação de links`: verifica se os links encontrados nos arquivos Markdown estão funcionando corretamente, retornando o código de status HTTP da URL correspondente. Também são exibidas mensagens sobre a validação, fail em caso de falha ou ok em caso de sucesso.

* `Estatísticas de links`: exibe o número total de links encontrados, total de links únicos e o número de links que estão funcionando corretamente.

## 3. Instruções de Uso
(inserir comando)

** Interface com o usuário

Utilizando o comando `md-links ./caminhoDaPasta/nomeDoArquivo.md`, a informação retorna da seguinte maneira ao usuário:
(inserir img)

Caso o usuário insira a flag `--validate`:
(inserir img)

Inserindo a flag `--stats`:
(inserir img)

Por fim, quando as duas flags forem inseridas `--validate` e `--stats`:
(inserir img)

** Mensagens de erro:
Arquivo com extensão que não seja markdown:

(inserir img)

Diretório/arquivos inexistentes:
(inserir img)

Arquivo que não possua links:
(inserir img)

## 4. Considerações técnicas

A implementação da ferramenta de linha de comando utiliza as bibliotecas `chalk`, `node-fetch` e `fs`. A biblioteca `chalk` é responsável por adicionar cores e estilos ao terminal, a `node-fetch` é utilizada para realizar requisições HTTP, e a biblioteca `fs` é responsável por realizar a manipulação de arquivos.

A biblioteca segue as práticas modernas de modularização de código em JavaScript, utilizando módulos import e export. Além disso, foram realizadas as configurações necessárias no arquivo `package.json` para gerenciamento de dependências, bem como nos arquivos `.eslintrc` e `.editorconfig`  para garantir a consistência do código. 

Também foi configurado o `jest.config.json` para a execução de testes automatizados.

##5. Testes Unitários

Este projeto conta com uma `suíte completa de testes unitários` para garantir a qualidade do código e a confiabilidade da ferramenta de linha de comando. Os testes foram escritos utilizando a biblioteca de testes Jest.
(inserir cobertura dos testes)
