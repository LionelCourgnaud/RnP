import { CustomActor } from "./actor/actor-sheet.js";
import { CustomItemSheet } from "./item/item-sheet.js";

Hooks.once('init', async function() {
    console.log('RnP | Initialisation du système');

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
