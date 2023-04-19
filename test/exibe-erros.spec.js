import { trataErro, erroNaExtensao, arquivoInexistente, semLinksEncontrados, manejaErros } from '../src/exibe-erros.js';
import chalk from 'chalk';
import { jest } from '@jest/globals';

const consoleLog = jest.spyOn(global.console, 'log');

describe('exibe-erros', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('arquivoInexistente deve exibir mensagem de erro quando o arquivo não existe', () => {
        const arquivo = '.teste/file.txt';
        arquivoInexistente(arquivo);
        expect(consoleLog).toBeCalledWith(chalk.hex('#FB80A7')(` \n O arquivo/diretório que você está tentando acessar em '${chalk.hex('#FA3473').underline(arquivo)}' não existe.\nPor favor, verifique se você digitou corretamente o nome do arquivo/diretório e tente novamente. \n`));
    });

    describe('erroNaExtensao', () => {
        it('deve exibir mensagem de erro quando a extensão não for md', () => {
            const arquivo = '.teste/file.txt';
            erroNaExtensao(arquivo);
            expect(consoleLog).toBeCalledWith(chalk.hex('#FB80A7')(` \n O arquivo encontrado em '${chalk.hex('#FA3473').underline(arquivo)}' não é formato markdown. \n`));
        });
    });

    describe('trataErro', () => {
        it('deve gerar um erro com o código e a mensagem', () => {
            const erro = { code: 'ENOENT' };
            expect(() => {
                trataErro(erro);
            }).toThrowError(new Error(chalk.red(erro.code, 'Não há arquivo no diretório')));
        });
    });
    describe('semLinksEncontrados', () => {
        it('deve exibir mensagem de erro quando o arquivo não possuir links', () => {
            const arquivo = '.teste/file.txt';
            semLinksEncontrados(arquivo);
            expect(consoleLog).toBeCalledWith(chalk.hex('#FB69C3')(`Não encontramos nenhum link neste arquivo!\n`));

        });
    });

    describe('manejaErros', () => {
        it('deve retornar "Link não encontrado" se o erro for ENOTFOUND', () => {
          const erro = { code: 'ENOTFOUND' };
          const resultado = manejaErros(erro);
          expect(resultado).toBe(chalk.red('Link não encontrado'));
        });
      
        it('deve retornar "ocorreu algum erro" se o erro não for ENOTFOUND', () => {
          const erro = { code: 'ECONNREFUSED' };
          const resultado = manejaErros(erro);
          expect(resultado).toBe('ocorreu algum erro');
        });
      });
});

