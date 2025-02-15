window.CUSTOM_SYSTEM = {};

// --------------------------
//  Liste pour les sorts
// --------------------------
CUSTOM_SYSTEM.classeTypes = {
    0: "Barde",
    10: "Clerc",
    20: "Druide",
    30: "Ensorceleur",
    40: "Magicien",
    50: "Ombrelame",
    60: "Paladin",
    70: "Rôdeur",
    80: "Sorcier"
};

CUSTOM_SYSTEM.incantationTimes = {
    0: "1 Action",
    10: "Action Bonus",
    20: "Instantanné",
    30: "Minutes"
};

CUSTOM_SYSTEM.spellLevels = {
    0: "Tour de Magie",
    1: "Niveau 1",
    2: "Niveau 2",
    3: "Niveau 3",
    4: "Niveau 4",
    5: "Niveau 5",
    6: "Niveau 6",
    7: "Niveau 7",
    8: "Niveau 8",
    9: "Niveau 9"
};

CUSTOM_SYSTEM.durationTypes = {
    0: "instantané",
    5: "round(s)",
    10: "minute(s)",
    20: "heure(s)",
    30: "jour(s)",
    90: "Jusqu'à dissipation"
};



// Helpers pour le système
CUSTOM_SYSTEM.utils = {
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
    console.log('mise à jour d\'un item', item, changes, userId )
});
