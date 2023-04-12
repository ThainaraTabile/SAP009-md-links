
import fetch from "node-fetch";
import {manejaErros} from "./exibe-erros.js";

function extraiLinks(arrLinks) {
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
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

export { checaStatus}
