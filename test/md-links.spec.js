// import mdLinks from './index.js';

// describe('mdLinks', () => {
//   it('deve retornar os links de um arquivo formato md', (links) => {
//     mdLinks ('diretorio/exemplo.md').then((resultado) => {
//       expect(resultado.length).toBe(1)
//     })
//     links()
//   });
// });

import { mdLinks } from '../src/md-links.js'; 

describe('mdLinks', () => {
  describe('quando a extensão do arquivo é inválida', () => {
    it('deve rejeitar a promessa com uma mensagem de erro', () => {
      const path = 'arquivo.txt';
      const options = {};
      const resultado = mdLinks(path, options);

      return resultado.catch((erro) => {
        expect(erro).to.be.an.instanceof(Error);
        expect(erro.message).to.equal('extencao-invalida');
      });
    });
  });

  describe('quando o arquivo não contém links', () => {
    it('deve rejeitar a promessa com uma mensagem de erro', () => {
    });
  });

  describe('quando a opção "validate" é falsa', () => {
    it('deve retornar os links do arquivo', () => {
    });
  });

  describe('quando a opção "validate" é verdadeira', () => {
    it('deve retornar os links do arquivo com a validação de status', () => {
    });
  });
});

// test('deve verificar se oa arquivo fornecido possui extensão md', () => {
//   const textoEsperado = arquivo.md;
//   const retornado = mdLinks(arquivo.js)

//   expect(retornado).toBe(textoEsperado)
// }
// )