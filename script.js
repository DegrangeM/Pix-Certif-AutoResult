if (location.href === "https://orga.pix.fr/certifications") {
  function wait() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
  let classes = Array.from(document.querySelector('ul.pix-select__options').querySelectorAll('li')).map(x=>x.textContent.replaceAll(/\s/g,'')).slice(1);
  if (classes && classes.length) {

    document.body.style.cursor = 'wait';

    let ACCESS_TOKEN;
    let USER_ID;
    let ORGA_ID;

    let csv = '';


    Promise.resolve().then(() => {
        /* ETAPE 1 : On récupère le token de session */

      ACCESS_TOKEN = JSON.parse(localStorage.getItem('ember_simple_auth-session')).authenticated.access_token;
      USER_ID = JSON.parse(localStorage.getItem('ember_simple_auth-session')).authenticated.user_id;
      ORGA_ID = false;

      /* ETAPE 2 : On récupère l'ID d'établissement */
    }).then(() => fetch("https://orga.pix.fr/api/prescription/prescribers/"+USER_ID, {
      "headers": {
        "accept": "application/vnd.api+json",
        "accept-language": "fr",
        "authorization": "Bearer " + ACCESS_TOKEN,
        "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    })).then(response => response.json())
      .then(json => {
        ORGA_ID = json.included[0].id;
      })
      .then(wait)
      .then(() => {

        /* ETAPE 3 : On récupère les résultats */

        let p = Promise.resolve();
        for (let classe of classes) {
          p = p.then(
            () => fetch("https://orga.pix.fr/api/organizations/" + ORGA_ID + "/certification-results?division="+classe+"&lang=fr", {
              "headers": {
                "accept": "application/vnd.api+json",
                "accept-language": "fr",
                "authorization": "Bearer " + ACCESS_TOKEN,
                "content-type": "application/vnd.api+json",
                "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
              },
              "referrer": "https://orga.pix.fr/certifications",
              "referrerPolicy": "origin-when-cross-origin",
              "method": "GET",
              "mode": "cors",
              "credentials": "include"
            })
          ).then(response => response.text())
            .then(text => {
              /* if(csv !== '') { // On retire l'en-tête si on l'a déjà récupéré
                text = text.slice(text.indexOf('\n')) // le saut à la lign est gardé
              }
              */
              let resultats = text.split('\n');
              if(csv === '') {
                // on récupère l'en-tête et on ajoute une colonne pour la classe
                csv = resultats[0] + ';Classe\n';
              } else {
                csv += '\n';
              }
              resultats = resultats.slice(1); // On retire l'en-tête
              resultats = resultats.map(x => x + ';' + classe); // On ajoute la classe à chaque ligne
              text = resultats.join('\n');
              csv += text;
            })
            .then(wait);
        }
        return p;
      }).then(() => { document.body.style.cursor = 'default'; alert('Terminé !'); 

      /* ETAPE 4 : On télécharge le fichier */
      let blob = new Blob([csv], { type: 'text/csv' });
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = 'certifications.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      })
      .catch((e) => { document.body.style.cursor = 'not-allowed'; alert('Erreur : ' + e); });
  }
} else {
  alert('Ce script doit être utilisé sur la page certification du site de Pix Orga !');
}
