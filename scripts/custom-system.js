window.CUSTOM_SYSTEM = {};
// export const CUSTOM_SYSTEM = window.CUSTOM_SYSTEM || {};

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
    "vocal" : "Vocal",
    "somatique": "Somatique",
    "material": "Matériel",
}

CUSTOM_SYSTEM.componentsSpecial = {
    "ritual": "Rituel",
    "concentration": "Concentration"
}

// convertir les valeurs de l'API
CUSTOM_SYSTEM.castingUnitsFromAPI = {
    0 : "reaction",
    1 : "action",
    2 : "minute",
    3 : "hour",
    4 : "bonus"
}

// display
CUSTOM_SYSTEM.castingTimes = {
    "action": "action",
    "minute": "minute(s)",
    "hour": "heure(s)",
    "bonus": "action bonus",
    "reaction": "réaction",
};

// Convertir les valeurs pour l'UI
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
    "spec": "Spéciale",
    "dissip" : "Jusqu'à dissipation",
    "dissipcast" : "Jusqu'à déclenchement ou dissipation",
    "nextturn" : "Jusqu'à la fin du prochain tour du lanceur",
    "use" : "jusqu'à utilisation"
};


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