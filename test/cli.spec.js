import { imprimeLista, imprimeListaValidada, imprimeCalculoStats } from '../src/cli.js';
import { jest } from '@jest/globals';
import chalk from 'chalk';
import calculaStats from '../src/calcula-stats.js'
import { mdLinks } from '../src/md-links.js';

const consoleLog = jest.spyOn(global.console, 'log');

describe('cli', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe('imprimeLista', () => {

    it('deve imprimir uma lista de links formatada corretamente', () => {
      const links = [
        {
          file: 'exemplo/arquivo1.md',
          href: 'https://www.google.com',
          text: 'Google',
        },
        {
          file: 'exemplo/arquivo2.md',
          href: 'https://github.com',
          text: 'GitHub',
        },
      ];

      imprimeLista(links);
      const lista = links.map((item) => {
        const linha = `${chalk.black.bgCyan(item.file)} | ${chalk.cyan(item.href)} | ${chalk.cyan(item.text)}`;
        return linha;
      }).join('\n\n');

      expect(consoleLog).toBeCalledWith(
        chalk.hex('#4BFAF4')(
          '\n',
          `   ╔══════════════════════╗
    ║ Lista de links \ud83d\udd0d \ud83d\udcc4 ║
    ╚══════════════════════╝`,
        ),
        '\n\n',
        lista);
    });
  });
  describe('imprimeListaValidada', () => {

    it('deve imprimir uma lista de links formatada e validada', () => {
      const links = [
        {
          file: 'exemplo/arquivo1.md',
          href: 'https://www.google.com',
          text: 'Google',
        },
        {
          file: 'exemplo/arquivo2.md',
          href: 'https://github.com',
          text: 'GitHub',
        },
      ];
      imprimeListaValidada(links);
      const lista = links.map((item) => {
        const linha = `${item.ok ? chalk.green('\u2714') : chalk.red('\u2718')} ${chalk.black.bgCyan(item.file)} | ${chalk.cyan(item.href)} | ${chalk.cyan(item.text)} | ${item.ok ? chalk.green('ok') : chalk.red('fail')} | ${item.status === undefined ? '' : item.status}`;
        return linha;
      }).join('\n\n');

      console.log(
        chalk.hex('#4BFAF4')(
          '\n',
          `   ╔══════════════════════╗
    ║ Lista de links \ud83d\udd0d \ud83d\udcc4║
    ╚══════════════════════╝`,
        ),
        '\n\n',
        lista,
      );
    })
  });

  describe('imprimeCalculoStats', () => {
    it('deve imprimir o cálculo das estatísticas dos links', () => {
      const links = [
        { href: 'https://google.com', text: 'Google', ok: true },
        { href: 'https://github.com', text: 'GitHub', ok: true },
        { href: 'https://google.com', text: 'Google', ok: true },
        { href: 'https://twitter.com', text: 'Twitter', ok: false },
      ];

      imprimeCalculoStats(links);
      let resultado = ''
      resultado += chalk.hex('#F56327')('\n', `Estatísticas dos Links \ud83d\udcca`);
      resultado += `\n\n${chalk.hex('#FA956F')('Total de links:')} ${chalk.yellow(4)}`;
      resultado += `\n${chalk.hex('#FA956F')('Links únicos:')} ${chalk.yellow(3)}`;
      resultado += `\n${chalk.hex('#FA956F')('Links quebrados:')} ${chalk.red(1)}`;
      expect(consoleLog).toHaveBeenCalledWith(resultado);
    });

  });

  describe('mdLinks', () => {
    it('deve retornar um array de objetos com link, arquivo e texto', () => {
      const caminho = './arquivo/texto.md';
      const options = { validate: false, stats: false };
      return mdLinks(caminho, options)
        .then((resultado) => {
          expect(resultado).toEqual([
            {
              href: 'https://nodejs.org/',
              text: 'Node.js',
              file: './test/links-teste.md',
            },
            {
              href: 'https://jestjs.io/',
              text: 'Jest',
              file: './test/links-teste.md',
            },
          ]);
        })
        .catch((err) => {
          consoleLog('Erro no teste:', err);
        });
    });
  });


});