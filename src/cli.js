#!/usr/bin/env node

import chalk from 'chalk';
import { mdLinks } from './md-links.js';
import { semLinksEncontrados, erroNaExtensao } from './exibe-erros.js';
import calculaStats from './calcula-stats.js';

function imprimeLista(resultado) {
  const lista = resultado.map((item) => {
    const linha = `${chalk.black.bgCyan(item.file)} | ${chalk.cyan(item.href)} | ${chalk.cyan(item.text)}`;
    return linha;
  }).join('\n\n');

  console.log(
    chalk.hex('#4BFAF4')(
      '\n',
      `   ╔══════════════════════╗
    ║ Lista de links \ud83d\udd0d \ud83d\udcc4  ║
    ╚══════════════════════╝`,
    ),
    '\n\n',
    lista,
  );
}

function imprimeListaValidada(resultado) {
  const lista = resultado.map((item) => {
    const linha = `${item.ok ? chalk.green('\u2714') : chalk.red('\u2718')} ${chalk.black.bgCyan(item.file)} | ${chalk.cyan(item.href)} | ${chalk.cyan(item.text)} | ${item.ok ? chalk.green('ok') : chalk.red('fail')} | ${item.status === undefined ? '' : item.status}`;
    return linha;
  }).join('\n\n');

  console.log(
    chalk.hex('#4BFAF4')(
      '\n',
      `   ╔══════════════════════╗
    ║ Lista de links \ud83d\udd0d \ud83d\udcc4 ║
    ╚══════════════════════╝`,
    ),
    '\n\n',
    lista,
  );
}

function imprimeCalculoStats(links) {
  const stats = calculaStats(links);
  let retorno = '';

  retorno += chalk.hex('#F56327')(
    '\n',
    `     ╔═════════════════════════════╗
      ║ Estatísticas dos Links \ud83d\udcca   ║
      ╚═════════════════════════════╝`,
  );

  retorno += `\n\n${chalk.hex('#FA956F')('Total de links:')} ${chalk.yellow(stats.total)}`;
  retorno += `\n${chalk.hex('#FA956F')('Links únicos:')} ${chalk.yellow(stats.unique)}`;

  if (stats.broken) {
    retorno += `\n${chalk.hex('#FA956F')('Links quebrados:')} ${chalk.red(stats.broken)}`;
  }

  console.log(retorno);
}

const caminho = process.argv[2];
const validate = process.argv.some((argumento) => argumento === '--validate');
const stats = process.argv.some((argumento) => argumento === '--stats');

const options = {
  validate,
  stats,
};

mdLinks(caminho, options)
  .then((resultado) => {
    if (options.stats) {
      imprimeCalculoStats(resultado);
      return;
    }

    if (options.validate) {
      return imprimeListaValidada(resultado);
    }

    imprimeLista(resultado);
  })
  .catch((err) => {
    switch (err.message) {
      case 'extencao-invalida':
        erroNaExtensao(caminho);
        break;
      case 'arquivo-sem-link':
        semLinksEncontrados();
        break;
      case 'arquivo-inexistente':
        console.log('diretório ou arquivo inexistentes')
        break;
      default:
        console.log(err);
    }
  });
