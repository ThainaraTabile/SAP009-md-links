import fs from 'fs';
import { checaStatus } from './http-validacao.js';
import { trataErro } from './exibe-erros.js';

function extrairLinksDoArquivo(caminhoDoArquivo) {
  const enconding = 'utf-8';
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

  return fs.promises.readFile(caminhoDoArquivo, enconding)
    .then((texto) => {
      const capturas = [...texto.matchAll(regex)];
      const resultados = capturas.map((captura) => ({
        href: captura[2],
        text: captura[1],
        file: caminhoDoArquivo,
      }));
      return resultados;
    })
    .catch((erro) => trataErro(erro));
}

function mdLinks(path, options) {
  const extensao = path.substr(path.lastIndexOf('.') + 1);
  if (extensao !== 'md') {
    return Promise.reject(new Error('extencao-invalida'));
  }

  if(!fs.existsSync(path)) {
    return Promise.reject(new Error('arquivo-inexistente'));
  }

  if (fs.lstatSync(path).isFile()) {
    return extrairLinksDoArquivo(path)
      .then((links) => {
        if (links.length === 0) {
          return Promise.reject(new Error('arquivo-sem-link'));
        }
        if (options.validate) {
          return checaStatus(links).then((validatedLinks) => validatedLinks);
        }

        return links;
      });
  }
}

export { mdLinks, extrairLinksDoArquivo };
