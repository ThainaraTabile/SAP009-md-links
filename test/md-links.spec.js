

import { mdLinks} from '../src/md-links.js'; 
import fs from 'fs';

describe('mdLinks', () => {
  describe('quando a extensão do arquivo é inválida', () => {
    it('deve rejeitar a promessa com uma mensagem de erro', () => {
      const path = 'arquivo.txt';
      const options = {};
      const resultado = mdLinks(path, options);

      return resultado.catch((erro) => {
        expect(erro.message).toEqual('extencao-invalida');
      });
    });
  });

  describe('quando o arquivo ou diretório não existem', () => {
    it('deve rejeitar a promessa com uma mensagem de erro', () => {
      const path = '../src/arquivo/teste.md';
      const options = {};
      const resultado = mdLinks(path,options);
      return resultado.catch((erro) => {
        expect(erro.message).toEqual('arquivo-inexistente');
      });
    });
  });

  describe('quando o arquivo fornecido não possui links', () => {
    it('deve rejeitar a promessa com uma mensagem de erro', () => {
      const path = './arquivos/texto-sem-link.md';
      const options = {};
      const resultado = mdLinks(path, options);
          return resultado.catch((erro) => {
            expect(erro.message).toEqual('arquivo-sem-link');
          });
        }
      );
    });

  // describe('quando o arquivo fornecido não possui links', () => {
  //   it('deve rejeitar a promessa com uma mensagem de erro', () => {
  //     const path = '../arquivos/texto-sem-link.md';
  //     const resultado = mdLinks(path);
  //     const options = {};
  //     return resultado.catch((erro) => {
  //       expect(erro.message).toContain('arquivo-sem-link');
  //     });
  //   });
  // });
  
  describe('quando a opção "validate" é passada', () => {
    it('deve retornar um array de objetos com os atributos "href", "text", e "status"', () => {
      const path = './arquivos/texto.md';
      const options = { validate: true };
      return mdLinks(path, options).then((links) => {
        expect(Array.isArray(links)).toBe(true);
        expect(links.length).toBeGreaterThan(0);
        links.forEach((link) => {
          expect(link).toHaveProperty('href');
          expect(link).toHaveProperty('text');
          expect(link).toHaveProperty('status');
        });
      });
    });
  });
  
});
