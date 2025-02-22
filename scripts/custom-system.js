window.CUSTOM_SYSTEM = {};

// --------------------------
//  Liste pour les sorts
// --------------------------
CUSTOM_SYSTEM.classeTypes = {
    "bard": "Barde",
    "cleric" : "Clerc",
    "druid" : "Druide",
    "sorcerer" : "Ensorceleur",
    "wizard" : "Magicien",
    "shadowblade" : "Ombrelame",
    "paladin" : "Paladin",
    "ranger" : "Rôdeur",
    "warlock" : "Sorcier"
};

CUSTOM_SYSTEM.componentsTypes = {
    0: "Vocal",
    10: "Somatique",
    20: "Matériel"
}

CUSTOM_SYSTEM.incantationTypes = {
    0: "1 action",
    10: "action bonus",
    15: "1 Réaction",
    20: "instantanné",
    25: "heure(s)",
    30: "minute(s)",
    32: "round(s)",
};

CUSTOM_SYSTEM.spellLevels = {
    0: "0 (Tour de Magie)",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9"
};

CUSTOM_SYSTEM.durationTypes = {
    "inst" : "Instantané",
    "round": "Round(s)",
    "minute": "Minute(s)",
    "hour": "Heure(s)",
    "day": "Jour(s)",
    "perm": "Permanent",
    "spec": "Spéciale"
};

// CUSTOM_SYSTEM.durationTypes = {
//     0: "Instantané",
//     5: "Round(s)",
//     10: "Minute(s)",
//     20: "Heure(s)",
//     30: "Jour(s)",
//     40: "Permanent",
//     45: "Spéciale",
//     90: "Jusqu'à dissipation",
//     95: "Jusqu’à dissipation ou déclenchement",
//     100: "Jusqu'à la fin du prochain tour du lanceur"
// };



// Helpers pour le système
CUSTOM_SYSTEM.utils = {

    getKey: function(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    },

    // Fonction pour lancer un dé
    rollDice: async function(formula, actor = null, options = {}) {
        let roll = new Roll(formula);
        let result = await roll.evaluate({async: true});
        
        if(game.dice3d) {
            await game.dice3d.showForRoll(roll);
        }
        
        // Création du message dans le chat
        let messageData = {
            speaker: ChatMessage.getSpeaker({actor: actor}),
            content: result.total,
            type: CONST.CHAT_MESSAGE_TYPES.ROLL,
            roll: result
        };
        
        ChatMessage.create(messageData);
        return result;
    },

    // Fonction pour calculer les modificateurs
    calculateModifier: function(value) {
        return Math.floor((value - 10) / 2);
    },

    // Fonction pour formater le prix
    formatPrice: function(price) {
        return `${price} po`;
    }
};

// Configuration des enrichissements de texte personnalisés
CUSTOM_SYSTEM.enrichers = {
    // Exemple d'enrichisseur personnalisé
    customEnricher: function(text) {
        // Logique d'enrichissement du texte
        return text;
    }
};
Hooks.on("renderChatMessage", (message , html , messageData ) => {
    // Personnalisation des messages de chat
    const currentUser = game.user;

    // Afficher des informations sur l'utilisateur dans la console
    console.log('Utilisateur connecté:', currentUser.name);
    // console.log('ID de l\'utilisateur:', currentUser.id);
    // console.log('role l\'utilisateur:', currentUser.role);

    // html.find('.message-sender').remove();
    // // Ajouter le nom de l'utilisateur au message dans le chat
    // let userNameHtml = $(`<div class="user-name">${currentUser.name}</div>`);
    // html.find(".message-content").prepend(userNameHtml);
});
// Hooks spécifiques au système
Hooks.on("chatMessage", (message, html, data) => {
    // Personnalisation des messages de chat
    // console.log('ici message', message, data)
    // if(data.user !== 'wbuQ5wLYNHfXLzap') {
    //     console.log('message du gamemaster');
    // }
});


Hooks.on("updateItem", (item, changes, options, userId) => {
    // console.log('Mise à jour d\'un item : '+item.name, "\nUser ID : " ,userId, "\n== item ==", item, "\n== changes ==\n", changes )
});

// Hook sur la fermeture d'une ItemSheet
Hooks.on("closeItemSheet", (item) => {
    console.log(item.constructor.name);
    item._togglePreview(false);
});

// uniquement à la création
Hooks.once("renderItemSheet", (app, html) => {
});