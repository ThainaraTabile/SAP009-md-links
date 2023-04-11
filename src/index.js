
import fs from 'fs';
import chalk from 'chalk';
import { checaStatus } from './http-validacao.js'
import calculaStats from './calcula-stats.js';

function trataErro(erro) {
  console.log(erro)
  throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório'));
}

function extrairLinksDoArquivo(caminhoDoArquivo) {
  const enconding = 'utf-8';
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

  return fs.promises.readFile(caminhoDoArquivo, enconding)
    .then(texto => {
      const capturas = [...texto.matchAll(regex)];
      const resultados = capturas.map(captura => ({
        href: captura[2],
        text: captura[1],
        file: caminhoDoArquivo
      }));
      
      return resultados;
    })
    .catch(erro => trataErro(erro));
}

// function extrairLinksDoDiretorio(path) {
//   return fs.promises.readdir(path)
//     .then(nomesDosArquivos => {
//       return nomesDosArquivos.map(nomeDoArquivo => {
//         const pathDoArquivo = `${path}/${nomeDoArquivo}`;
//         if (fs.lstatSync(pathDoArquivo).isFile()) {
//           return extrairLinksDoArquivo(pathDoArquivo).then(link => link)
//         }

//         // return extrairLinksDoDiretorio(pathDoArquivo);
//       });
//     })
// }


function mdLinks(path, options) {
  if (fs.lstatSync(path).isFile()) {
    return extrairLinksDoArquivo(path)
      .then(links => {
        
        if (options.validate) {
          return checaStatus(links).then(validatedLinks => {
            if(options.stats) {
              return calculaStats(validatedLinks)
            }

            return validatedLinks;
          })
        }

        if (options.stats) {
            return calculaStats(links)
        }

        return links

      })
  } 
} 





export default mdLinks; 

