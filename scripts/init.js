import { CustomActor } from "./actor/actor-sheet.js";
import { CustomItemSheet } from "./item/item-sheet.js";

Hooks.once('init', async function() {
    console.log('COF2 | Initialisation du système');

    // Enregistrement des feuilles d'items
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("COF2", CustomItemSheet, {
        makeDefault: true,
        types: ['item', 'spell', 'voie']
    });

    // Enregistrement des feuilles d'acteurs -- A FAIRE
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("COF2", CustomActor, {
        makeDefault: true,
        types: ['character']
    });

    // Enregistrement des paramètres du système
    game.settings.register("COF2", "systemMigrationVersion", {
        name: "Version du système",
        scope: "world",
        config: false,
        type: String,
        default: ""
    });

});
