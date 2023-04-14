import fetch from 'node-fetch';
import { manejaErros } from './exibe-erros.js';

function checaStatus(listaLinks) {
  return Promise.all(
    listaLinks.map((link) => fetch(link.href)
      .then((response) => ({
        ...link,
        status: response.status,
        ok:
        !!response.ok,
      }))

      .catch((erro) => ({ ...link, ok: false, status: manejaErros(erro) }))),
  );
}

export { checaStatus };
