# Pix-Certif-AutoResult
 
Permet de télécharger en un clic les résultats de toutes classes dans un unique csv (au lieu de devoir le faire classe par classe).

![image](https://github.com/DegrangeM/Pix-Certif-AutoResult/assets/53106394/7e59d5e9-7340-4a20-a66f-1b5520b723c7)

## Fonctionnement

### Installation du script

- Cliquez sur le lien [installation du script](https://degrangem.github.io/Pix-Certif-AutoResult/) et suivez les instructions pour installer le script. Revenez ensuite sur cette page et suivez le reste des instructions.

### Exécution du script

- Accédez et connectez vous à Pix Orga dans l'onglet "Certification" : https://orga.pix.fr/certifications

- Sans quitter la page, cliquez sur le marque-page créé à l'étape d'installation du script

- Patientez jusqu'à ce qu'un message indique que tout est terminé ! Il faut compter environ 1 seconde par classe dans l'établissement (y compris ne passant pas la certification Pix). Immédiatement après le message, le fichier csv est proposé au téléchargement.

- Remarque : le fichier csv obtenu est strictement identique à celui donné par Pix via la méthode normale, à ceci près qu'une colonne "Classe" est ajouté.

## Attention

Je ne suis pas réponsable si ça casse tout :)

Pensez à vérifier rapidement qu'il n'y ait pas eu d'erreur dans le fichier obtenu !

En particulier, les données de certifications précédentes peuvent se retrouver présentes.

## Version alernative (multi fichiers)

Si vous préférez avoir un fichier par classe, une version alternative est également proposée.
Dans ce cas là, la colonne classe n'est pas rajoutée dans le fichier obtenu puisqu'elle peut être obtenue depuis le nom du fichier.
Le fichier est alors identique à celui que vous auriez téléchargez vous même depuis Pix.
Cette version alternative permet de gagner du temps : il n'est plus nécessaire de choisir une classe, appuyer sur le bouton, attendre, choisir une autre classe, appuyer, attendre, etc.
Il suffit de lancer le script, de patienter, et ensuite de valider l'enregistrement de chaque fichier.

