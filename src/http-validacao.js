import chalk from "chalk";
import fetch from "node-fetch";

function extraiLinks(arrLinks) {
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}



function manejaErros(erro) {
  if (erro.code === "ENOTFOUND") {
    return "link não encontrado";
  } else {
    return "ocorreu algum erro";
  }
}

 function checaStatus(listaLinks) {
  return Promise.all(
    listaLinks.map((link) => {
      return fetch(link.href)
      .then((response) => ({ ...link, status: response.status, ok:
        response.ok ? true : false }))

        .catch((erro) => ({ ...link, ok: false, status: manejaErros(erro) }));
    })
  );
}

export { checaStatus, manejaErros }
