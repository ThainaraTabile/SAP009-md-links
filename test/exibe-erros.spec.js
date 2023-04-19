import { trataErro, erroNaExtensao, arquivoInexistente } from '../src/exibe-erros.js';
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
        // it('deve exibir mensagem de erro quando a extensão não form md', () => {
        //     const consoleLog = console.log;
        //     const arquivo = 'file.txt';
        //     let consoleOutput = (`\n O arquivo encontrado em '${chalk.hex('#FA3473').underline(arquivo)}' não é formato markdown. \n`);
        //     erroNaExtensao(arquivo);
        //     //expect(consoleOutput.trim()).toEqual(`\n O arquivo encontrado em '${chalk.hex('#FA3473').underline(arquivo)}' não é formato markdown.\n`);
        //     expect(consoleOutput).toEqual(`\n O arquivo encontrado em '${chalk.hex('#FA3473').underline(arquivo)}' não é formato markdown. \n`);
        //     console.log = consoleLog;
        // });
    });

    describe('trataErro', () => {
        it('deve gerar um erro com o código e a mensagem', () => {
            const erro = { code: 'ENOENT' };
            expect(() => {
                trataErro(erro);
            }).toThrowError(new Error(chalk.red(erro.code, 'Não há arquivo no diretório')));
        });
    });
});

