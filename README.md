# Markdown Links


## Índice

- [Markdown Links](#markdown-links)
  - [Índice](#índice)
  - [1. Sobre o projeto](#1-sobre-o-projeto)
  - [2. Funcionalidades](#2-funcionalidades)
  - [3. Instruções de Uso](#3-instruções-de-uso)
  - [4. Considerações técnicas](#4-considerações-técnicas)
  - [5. Testes Unitários](#5-testes-unitários)
  - [6. Testes de Usabilidade](#6-testes-de-usabilidade)

***

## 1. Sobre o projeto

Este projeto é composto por uma ferramenta de linha de comando `(CLI)`, a qual permite que o usuário execute a biblioteca diretamente do terminal, através de um módulo do Node.js que analisa os arquivos em formato `Markdown`.

A `CLI` revela os links encontrados, indicando a rota do arquivo onde foi encontrado o link, a URL encontrada e o texto âncora. Também é possível validar os links e fornecer estatísticas sobre os mesmos.

A aplicação foi desenvolvida em três sprints, seguindo um planejamento definido previamente através de um fluxograma e detalhamento das tarefas no Trello.

## 2. Funcionalidades

As funcionalidades atualmente disponíveis são:

* `Listagem de links`: exibe os links encontrados nos arquivos Markdown, mostrando a rota do arquivo onde foi encontrado o link, a URL encontrada e o texto que aparece dentro do link. 

* `Validação de links`: verifica se os links encontrados nos arquivos Markdown estão funcionando corretamente, retornando o código de status HTTP da URL correspondente. Também são exibidas mensagens sobre a validação, fail em caso de falha ou ok em caso de sucesso.

* `Estatísticas de links`: exibe o número total de links encontrados, total de links únicos e o número de links que estão funcionando corretamente.

## 3. Instruções de Uso
Para instalar o módulo, execute o seguinte comando:
`npm install md-links-lab`

#### Interface com o usuário

Utilizando o comando `md-links ./caminhoDaPasta/nomeDoArquivo.md`, a informação retorna da seguinte maneira ao usuário:

<img width="871" alt="Captura de Tela 2023-04-21 às 09 41 10" src="https://user-images.githubusercontent.com/122550758/233638655-d300433f-5947-438e-9fb3-0e1d7dbd1729.png">

Caso o usuário insira a flag `--validate`:
<img width="966" alt="Captura de Tela 2023-04-21 às 09 42 09" src="https://user-images.githubusercontent.com/122550758/233638853-5fb9e7aa-6728-409f-8387-c4b581684d0a.png">


Inserindo a flag `--stats`:

<img width="223" alt="Captura de Tela 2023-04-21 às 09 42 29" src="https://user-images.githubusercontent.com/122550758/233638921-27bf8a13-47af-4295-ad1d-cae6b8e40509.png">


Por fim, quando as duas flags forem inseridas `--validate` e `--stats`:

<img width="214" alt="Captura de Tela 2023-04-21 às 09 42 57" src="https://user-images.githubusercontent.com/122550758/233639005-bc56e35b-57f5-487b-b22c-0318a9a260f0.png">

#### Mensagens de erro:
Arquivo com extensão que não seja markdown:

<img width="543" alt="Captura de Tela 2023-04-21 às 09 44 11" src="https://user-images.githubusercontent.com/122550758/233639235-6e81e7f5-b066-42ad-8db6-32f38ab410ec.png">


Diretório/arquivos inexistentes:

<img width="730" alt="Captura de Tela 2023-04-21 às 09 45 05" src="https://user-images.githubusercontent.com/122550758/233639398-84f39825-b023-40ab-8804-8214b4035115.png">

Arquivo que não possua links:

<img width="321" alt="Captura de Tela 2023-04-21 às 09 46 25" src="https://user-images.githubusercontent.com/122550758/233639626-8b15ac58-49f6-44d5-a081-b4f4e6502892.png">

## 4. Considerações técnicas

A implementação da ferramenta de linha de comando utiliza as bibliotecas `chalk`, `node-fetch` e `fs`. A biblioteca `chalk` é responsável por adicionar cores e estilos ao terminal, a `node-fetch` é utilizada para realizar requisições HTTP, e a biblioteca `fs` é responsável por realizar a manipulação de arquivos.

A biblioteca segue as práticas modernas de modularização de código em JavaScript, utilizando módulos import e export. Além disso, foram realizadas as configurações necessárias no arquivo `package.json` para gerenciamento de dependências, bem como nos arquivos `.eslintrc` e `.editorconfig`  para garantir a consistência do código. 

Também foi configurado o `jest.config.json` para a execução de testes automatizados.

## 5. Testes Unitários

Este projeto conta com uma `suíte completa de testes unitários` para garantir a qualidade do código e a confiabilidade da ferramenta de linha de comando. Os testes foram escritos utilizando a biblioteca de testes Jest.

A maioria dos testes unitários cobriram 100% dos statements, functions lines e branches.

<img width="586" alt="Captura de Tela 2023-04-21 às 09 47 39" src="https://user-images.githubusercontent.com/122550758/233639902-cfb04b38-edff-4a96-9425-08f416c02664.png">



## 6. Testes de Usabilidade
Os resultados do teste de usabilidade foram positivos, indicando que os usuários foram capazes de utilizar a biblioteca `md-links` com sucesso após a instalação do módulo.

<img width="513" alt="Captura de Tela 2023-04-21 às 09 57 11" src="https://user-images.githubusercontent.com/122550758/233641734-797b46e5-bd5d-4f16-8025-3507784a51c6.png">

<img width="622" alt="Captura de Tela 2023-04-21 às 09 59 48" src="https://user-images.githubusercontent.com/122550758/233642233-356a2075-067c-4bf9-9391-54bae8f8ac77.png">


<img width="660" alt="Captura de Tela 2023-04-21 às 09 57 44" src="https://user-images.githubusercontent.com/122550758/233641845-8891d305-50e9-4ddf-92e6-4bcef45d5f0f.png">
