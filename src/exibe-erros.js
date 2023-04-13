import chalk from "chalk";

function trataErro(erro) {
    console.log(erro)
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório'));
  }

  function erroNaExtensao(arquivo) {
    console.log( chalk.hex('#FB80A7')(` \n O arquivo encontrado em '${chalk.hex('#FA3473').underline(arquivo)}' não é formato markdown. \n`));
  }
  
  function semLinksEncontrados() {
   console.log( chalk.hex('#FB69C3')(`
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