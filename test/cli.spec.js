import { imprimeLista }  from '../src/cli.js';
import { jest } from '@jest/globals'; 
import chalk from 'chalk';

const consoleLog = jest.spyOn(global.console, 'log');


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
  