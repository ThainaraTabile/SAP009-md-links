import chalk from "chalk";

function trataErro(erro) {
    console.log(erro)
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório'));
  }

  function erroNaExtensao(arquivo) {
    console.log( chalk.red(` \n O arquivo/diretório '${arquivo}' não é formato markdown.`));
  }
  
  function semLinksEncontrados() {
   console.log( chalk.magentaBright(`
      ╭───────────────────────────────────────────╮
      │ Não encontramos nenhum link neste arquivo!│
      ╰───────────────────────────────────────────╯ \n`));
  }


  function manejaErros(erro) {
    if (erro.code === "ENOTFOUND") {
      return chalk.red("Link não encontrado");
    } else if (erro.code === 'ENOENT') {
      return "o arquivo ou diretório não foi encontrado no caminho especificado";
    } else {
      return "ocorreu algum erro";
    }
  }

  

  export {manejaErros, trataErro, erroNaExtensao,  semLinksEncontrados}