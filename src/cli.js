import chalk from "chalk";
import mdLinks from "../src/index.js";
import { semLinksEncontrados, erroNaExtensao } from "./exibe-erros.js";


function imprimeLista(resultado) {
    const lista = resultado.map(item => {
        const linha = `${chalk.black.bgCyan(item.file)} | ${chalk.cyan(item.href)} | ${chalk.cyan(item.text)}`
        return linha;
    }).join('\n\n');

    console.log(chalk.yellow('\n',
        `   ╔══════════════════════╗
    ║ Lista de links 🔍📄  ║
    ╚══════════════════════╝`),
        '\n\n', lista);
}

function imprimeListaValidada(resultado) {
    const lista = resultado.map(item => {
        const linha = `${item.ok ? chalk.green('\u2714') : chalk.red('\u2718')} ${chalk.black.bgCyan(item.file)} | ${chalk.cyan(item.href)} | ${chalk.cyan(item.text)} | ${item.ok ? chalk.green('ok') : chalk.red('fail')} | ${item.status === undefined ? '' : item.status}`
        return linha;
    }).join('\n\n');

    console.log(chalk.yellow('\n',
        `   ╔══════════════════════╗
    ║ Lista de links 🔍📄  ║
    ╚══════════════════════╝`),
        '\n\n', lista);
}

const caminho = process.argv[2];
const validate = process.argv.some(argumento => argumento === '--validate');
const stats = process.argv.some(argumento => argumento === '--stats');

const options = {
    validate: validate,
    stats: stats
}

mdLinks(caminho, options)
    .then((resultado) => {
        if (options.validate) {
            return imprimeListaValidada(resultado)
        } else {
            imprimeLista(resultado);
        }

    })
    .catch((err) => {
        switch (err.message) {
            case 'extencao-invalida':
                erroNaExtensao(caminho);
                break;
            case 'arquivo-sem-link':
                semLinksEncontrados();
                break;
            default:
                console.log(err)
        }
    });
    //.catch((err) => (manejaErros(err) ));

