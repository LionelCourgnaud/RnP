const fs = require('fs');
const https = require('https');

function findChains(max) {
    let spells = [];

    for(let l=1;l<=max;l++) {
        // Lire le contenu du fichier
        let fileContent = fs.readFileSync("toparse"+l+".txt", 'utf8');
        // NIVEAU
        const rNiveau = /<div class="text-center font-smallcaps col-md-1 col-2"><span>(.*?)<\/span>/g;
        // NOM DU SORT
        // const rNom = /<div class="font-smallcaps text-lg col-md-4 col-8">\s*([\s\Sà-ÿÀ-Ÿ]*?)\s*<\/div>/g;
        const rNom = /<div class="font-smallcaps text-lg col-md-4 col-8">\s*([à-ÿÀ-Ÿ\s\w]*)\s*<\/div>/gu;
        // TYPE DE SORT
        const rTypeSort = /spell-subtitle" data-v-1c06af89><div data-v-1c06af89>(.*?)<\/div>/g;
        // TEMPS D'INCANTATION
        // text-uppercase text-sm">Temps d'incantation</div> <div>1 action</div>
        const rTIncant = /text-uppercase text-sm">Temps d'incantation<\/div> <div>(.*?)<\/div>/g;
        // DUREE
        // <div class="font-weight-bold text-uppercase text-sm">Durée</div> <div>instantané</div>
        const rDuree = /<div class="font-weight-bold text-uppercase text-sm">Durée<\/div> <div>(.*?)<\/div>/g;
        // PORTEE
        const rPortee = /col-12"><div class="font-weight-bold text-uppercase text-sm">(.*?)<\/div> <div><\/div>/g;
        // CIBLE
        const rCible = /text-uppercase text-sm">Cible<\/div> <div>(.*?)<\/div>/g;


        regExStack = [];

        regExStack.push(rNiveau);
        regExStack.push(rNom);
        // regExStack.push(rTypeSort);
        // regExStack.push(rTIncant);
        // regExStack.push(rDuree);
        // regExStack.push(rPortee);
        // regExStack.push(rCible);
        
        for (let i = 0; i <= 5; i++) {
            let currentSpell = [];
            for(let j=0;j<regExStack.length;j++) {
                let matchNom = regExStack[j].exec(fileContent);
                if (matchNom !== null) {
                    field = matchNom[1].trim();
                    currentSpell.push(field);
                    startPos = matchNom.index + matchNom[0].length;
                    fileContent = fileContent.slice(startPos);
                }
            }

            spells.push(currentSpell);       
            // Réinitialiser les expressions régulières
            rNiveau.lastIndex = 0;
            rNom.lastIndex = 0;
            rTypeSort.lastIndex = 0;
            rTIncant.lastIndex = 0;
            rCible.lastIndex = 0;
            rPortee.lastIndex = 0;
        }
    }
    console.table(spells);
    return(spells);
}

// function getUrltoText(urltoget, filenametosave) {

//     // URL à télécharger
//     let url = urltoget;

//     // Nom du fichier de destination
//     let filePath = filenametosave;

//     // Fonction pour télécharger le contenu de l'URL et l'enregistrer dans un fichier
//     https.get(url, (response) => {
//         let data = '';

//         // Accumuler les données reçues
//         response.on('data', (chunk) => {
//             data += chunk;
//         });

//         // Une fois toutes les données reçues, les écrire dans un fichier
//         response.on('end', () => {
//             fs.writeFile(filePath, data, (err) => {
//                 if (err) {
//                     console.error('Erreur lors de l\'écriture du fichier:', err);
//                 } else {
//                     console.log('Le contenu a été téléchargé et enregistré dans', filePath);
//                 }
//             });
//         });

//     }).on('error', (err) => {
//         console.error('Erreur lors du téléchargement:', err);
//     });
// }

// for(let i=1;i<=19;i++) {
//     getUrltoText("https://drs.rolenplay.fr/sorts?page="+i+"&sortBy=level&sortDesc=false","toparse"+i+".txt");
// }


findChains(19);

