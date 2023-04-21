import { imprimeLista, imprimeListaValidada, imprimeCalculoStats } from '../src/cli.js';
import { jest } from '@jest/globals';
import chalk from 'chalk';
import { executaMdLinks } from '../src/cli.js';

const consoleLog = jest.spyOn(global.console, 'log');

describe('cli', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe('executaMdLinks', () => {
    it('deve buscar e imprimir a lista de links corretamente', () => {
      const caminho = './arquivos/texto-teste.md';
      const options = { validate: false, stats: false };
      const linksEncontrados = [
        {
          href: 'https://gabrieluizramos.com.br/modulos-em-javascript',
          text: 'Gabriel Luiz Ramos',
          file: './arquivos/texto-teste.md',
        },
        {
          href: 'https://12313',
          text: 'Link quebrado',
          file: './arquivos/texto-teste.md',
        },
      ];

      const lista = linksEncontrados.map((item) => {
        const linha = `${chalk.black.bgCyan(item.file)} | ${chalk.cyan(item.href)} | ${chalk.cyan(item.text)}`;
        return linha;
      }).join('\n\n');

      return executaMdLinks(caminho, options)
        .then(() => {
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

    it('deve buscar, validar e imprimir a lista de links corretamente', () => {
      const caminho = './arquivos/texto-teste.md';
      const options = { validate: true, stats: false };
      const linksEncontrados = [
        {
          href: 'https://gabrieluizramos.com.br/modulos-em-javascript',
          text: 'Gabriel Luiz Ramos',
          file: './arquivos/texto-teste.md',
          status: 200,
          ok: true
        },
        {
          href: 'https://12313',
          text: 'Link quebrado',
          file: './arquivos/texto-teste.md',
          status: 'ocorreu algum erro',
          ok: false
        },
      ];

      const lista = linksEncontrados.map((item) => {
        const linha = `${item.ok ? chalk.green('\u2714') : chalk.red('\u2718')} ${chalk.black.bgCyan(item.file)} | ${chalk.cyan(item.href)} | ${chalk.cyan(item.text)} | ${item.ok ? chalk.green('ok') : chalk.red('fail')} | ${item.status === undefined ? '' : item.status}`;
        return linha;
      }).join('\n\n');

      return executaMdLinks(caminho, options)
        .then(() => {
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

    it('deve buscar, calcular as estatisticas e imprimi-las corretamente', () => {
      const caminho = './arquivos/texto-teste.md';
      const options = { validate: false, stats: true };

      return executaMdLinks(caminho, options)
        .then(() => {
          let resultado = ''
          resultado += chalk.hex('#F56327')('\n', `Estatísticas dos Links \ud83d\udcca`);
          resultado += `\n\n${chalk.hex('#FA956F')('Total de links:')} ${chalk.yellow(2)}`;
          resultado += `\n${chalk.hex('#FA956F')('Links únicos:')} ${chalk.yellow(2)}`;

          expect(consoleLog).toHaveBeenCalledWith(resultado);
        });
    });

    it('deve buscar, validar, calcular as estatisticas e imprimi-las corretamente', () => {
      const caminho = './arquivos/texto-teste.md';
      const options = { validate: true, stats: true };

      return executaMdLinks(caminho, options)
        .then(() => {
          let resultado = ''
          resultado += chalk.hex('#F56327')('\n', `Estatísticas dos Links \ud83d\udcca`);
          resultado += `\n\n${chalk.hex('#FA956F')('Total de links:')} ${chalk.yellow(2)}`;
          resultado += `\n${chalk.hex('#FA956F')('Links únicos:')} ${chalk.yellow(2)}`;
          resultado += `\n${chalk.hex('#FA956F')('Links quebrados:')} ${chalk.red(1)}`;

          expect(consoleLog).toHaveBeenCalledWith(resultado);
        });
    });

    it('deve imprimir mensagem de erro quando o arquivo informado não existe', () => {
      const caminho = './arquivos/inexistente.md';
      const options = { validate: false, stats: false };

      return executaMdLinks(caminho, options)
        .catch((err) => {
          expect(consoleLog).toHaveBeenCalledWith(chalk.hex('#FB80A7')(` \n O arquivo/diretório que você está tentando acessar em '${chalk.hex('#FA3473').underline(caminho)}' não existe.\nPor favor, verifique se você digitou corretamente o nome do arquivo/diretório e tente novamente. \n`));
        });
    });

    it('deve imprimir mensagem de erro quando o arquivo não contém links', () => {
      const caminho = './arquivos/texto-sem-link.md';
      const options = { validate: false, stats: false };

      return executaMdLinks(caminho, options)
        .catch((err) => {
          expect(consoleLog).toHaveBeenCalledWith(chalk.hex('#FB69C3')(`Não encontramos nenhum link neste arquivo!\n`));
        });
    });

    it('deve imprimir mensagem de erro quando a extensão do arquivo é inválida', () => {
      const caminho = './arquivos/texto.html';
      const options = { validate: false, stats: false };

      return executaMdLinks(caminho, options)
        .catch((err) => {
          expect(consoleLog).toHaveBeenCalledWith(chalk.hex('#FB80A7')(` \n O arquivo encontrado em '${chalk.hex('#FA3473').underline(arquivo)}' não é formato markdown. \n`));
        });
    });
  });
});