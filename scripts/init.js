import { CustomActor } from "./actor/actor-sheet.js";
import { CustomItemSheet } from "./item/item-sheet.mjs";
import { registerHandlebarsHelpers } from "./helpers.js";
import { ALL_SORTS } from "../refs/sorts_api.js";
import { Translation } from "../refs/sorts_api.js";

Hooks.once('init', async function() 
{
    console.log('RnP | Initialisation du système');

    // Register HB Helpers
    registerHandlebarsHelpers();

    // Enregistrement des feuilles d'items
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("RnP", CustomItemSheet, {
        makeDefault: true,
        types: ['object', 'spell', 'capacity', 'don', 'aptitude']
    });
    

    // Enregistrement des feuilles d'acteurs -- A FAIRE
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("RnP", CustomActor, {
        makeDefault: true,
        types: ['character']
    });

    // Enregistrement des paramètres du système
    game.settings.register("RnP", "systemMigrationVersion", {
        name: "Version du système",
        scope: "world",
        config: false,
        type: String,
        default: ""
    });


});

Hooks.once('ready', async function() {

    console.log('RnP | Initialisation du Compendium de Sorts');
    new Dialog({
        title: "Générer le compendium des Sorts",
        content: "Voulez-vous générer le compendium des sorts ?",
        buttons: {
            yes: {
                label: "Oui",
                callback: createSortsCompendium
            },
            no: {
                label: "Non",
                callback: existSortsCompendium
            }
        }
    }).render(true);

});


function existSortsCompendium() {
    console.log("RnP | Création des sorts abandonné ...");
}

async function createSortsCompendium() {

    console.log("RnP | Création des sorts ...");
    console.log(game);

    // Identifier le compendium
    const packName = "spells";
    const packLabel = "RnP.spells";
    
    // Tenter de récupérer le compendium existant
    let pack = game.packs.get(packLabel);
    if (!pack) {
        console.log("Création d'un nouveau compendium");
        try {
            pack = await CompendiumCollection.createCompendium({
                name: packName,
                label: "Sorts",
                package: "RnP",
                type: "Item"
            });
        } catch (error) {
            // Si le compendium existe déjà dans le monde
            if (error.message.includes("already exists")) {
                // Réessayer de le récupérer
                pack = game.packs.get(packLabel);
                if (!pack) {
                    console.error("Le compendium existe mais ne peut pas être récupéré");
                    return;
                }
            } else {
                console.error("Erreur lors de la création du compendium:", error);
                return;
            }
        }
    }
    console.log("Compendium trouvé:", pack);

    let translated = new Translation();

    // ALL_SORTS.forEach(element => {
    //     // console.log(element.duration.units);
    //     // translated.convert(element.duration.units);
    //     translated.giveme("duration.units");
    // });
    console.log(translated.giveme("duration.units"));

    return;

    for(let i=0;i<ALL_SORTS.length;i++) //ALL_SORTS.length
    {
        // if(ALL_SORTS[i].title!="Aspersion acide") {
        //     continue;
        // };

        const spellItem = {
            name: ALL_SORTS[i].title,
            type: "spell",
            img: 'systems/RnP/assets/icons/edit/scroll_light.svg',
            system : {
                "name" : ALL_SORTS[i].title,
                "spellLevel": ALL_SORTS[i].level,
                "incantationtype" : "",
                "incantationvalue" : 0,
                "durationtype" : translated.convert(ALL_SORTS[i].duration.units),
                "durationvalue" : 0,
                "concentration" : 0,
                "classes" : [],
                "effect" : "",
                "save" : "",
                "rangetype" : "",
                "rangevalue" : "",
                "rangeunit" : "",
                "target" : "",
                "area" : "",
                "damages" : "",
                "evolution": [],
                "visual" : "",
                "limits" : "",
                "components" : [],
                "componentslist" : "",
                "componentscost" : 0,
                "preview" : false
            }
        }
        try {
            // Vérifier si la race existe déjà dans le compendium
            const index = await pack.getIndex();
            const existingItem = index.find(i => i.name === spellItem.name);
           
            if (!existingItem) {
                await Item.create(spellItem, {pack: pack.collection});
                console.log(`Sort ${spellItem.name} ajoutée au compendium`);
            } else {
                console.log(`Sort ${spellItem.name} existe déjà dans le compendium`);
            }
        } catch (error) {
            console.error(`Erreur lors de l'ajout/mise à jour du Sort ${spellItem.name}:`, error);
            console.error(error);
        }
    }
}
