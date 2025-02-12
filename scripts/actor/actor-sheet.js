export class CustomActor extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["cof", "sheet", "actor"],
            template: "systems/COF2/templates/actor/actor-sheet.hbs",
            width: 750,
            height: 600,
            tabs: [{
                navSelector: ".sheet-tabs",
                contentSelector: ".sheet-body",
                initial: "attributes"
            }]
        });
    }

    getData() {
        const context = super.getData();
        context.config = CUSTOM_SYSTEM;
        
        // Calculer le modificateur de force
        const forceValue = context.actor.system.attributes.force.value;
        // console.log(context.actor.system);
        context.actor.system.attributes.force.mod = CUSTOM_SYSTEM.utils.calculateModifier(forceValue);
    
        context.itemsByRank = {
            1:  this.actor.items.filter(
                    item => { 
                        return item.type === 'voie' && item.system?.rank === 1;
                    })
                    .map(i => i.toObject()
                )};
        
        return context;
    }

    activateListeners(html) {
        super.activateListeners(html);
        if (!this.isEditable) return;

        //écouteur pour le bouton de jet de force
        html.find('.roll-force').click(this._onRollForce.bind(this));

        //écouteur lors de modification des input qui ont la classe css "stats"
        html.find('input.info').change(this._onStatsUpdate.bind(this));
        
        // Drag & drop des events
        html.find('.item-drop').on('dragover', this._onDragOver.bind(this));
        html.find('.item-drop').on('drop', this._onDrop.bind(this));

        if (this.actor.isOwner) {
            // Ajouter l'event listener pour la suppression
            html.find('.item-delete').click(this._onItemDelete.bind(this));
        }
    }

    //methode de modification des input qui ont la classe css stats
    async _onStatsUpdate(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const field = element.name;
        let value = element.value;

        // Conversion du type si nécessaire
        if (element.type === "number") {
            value = Number(value);
        } else if (element.type === "checkbox") {
            value = element.checked;
        }

        // Création de l'objet de mise à jour avec le chemin dynamique
        const updateData = {};
        updateData[field] = value;
        if (event.currentTarget.dataset.type === 'carac') {
            const attributeName = event.currentTarget.dataset.name;
            // Calculer le nouveau modificateur
            const newMod = CUSTOM_SYSTEM.utils.calculateModifier(value);
            // Ajouter le modificateur à l'objet de mise à jour
            updateData[`system.attributes.${attributeName}.mod`] = newMod;
        }

        // Mise à jour de l'acteur
        await this.actor.update(updateData);
    }

    async _onRollForce(event) {
        event.preventDefault();

        // Lancer 1d20
        const rollFormula = `1d20`;
        const roll = await CUSTOM_SYSTEM.utils.rollDice(rollFormula, this.actor);

        // Si le jet est supérieur à 10, augmenter la force de 1
        if (roll.total >= 10) {
            await this.actor.update({
                "system.attributes.force.value": roll.total
            });
        }
    }


    /** @override */
    _onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        $(event.currentTarget).addClass('drag-hover');
    }

    /** @override */
    async _onDrop(event) {
        event.preventDefault();
        
        // Récupérer les données du drag try/catch
        let data;
        try {
            data = JSON.parse(event.originalEvent.dataTransfer.getData('text/plain'));
        } catch (err) {
            return false;
        }

        // Gérer les différents types de données
        switch (data.type) {
            case "Item":
                return this._onDropItem(event, data);
            case "Compendium":
                return this._onDropCompendium(event, data);
        }
    }

    async _onDropItem(event, data) {
        if (!this.actor.isOwner) return false;

        // Récupérer l'item source
        const item = await Item.fromDropData(data);
        
        // Modifier les données de l'item
        const itemData = item.toObject();
        itemData.type = "voie";  // Force le type à "voie"
        if (!itemData.system) {
            itemData.system = {};
        }
        itemData.system.rank = 1;  // Ajoute un rang par défaut
        
        // Créer l'item sur l'acteur avec les nouvelles données
        return this.actor.createEmbeddedDocuments("Item", [itemData]);
    }

    async _onDropCompendium(event, data) {
        if (!this.actor.isOwner) return false;
    
        const pack = game.packs.get(data.pack);
        if (!pack) return false;
    
        const document = await pack.getDocument(data.id);
        if (!document) return false;
    
        // Modifier les données de l'item
        const itemData = document.toObject();
        itemData.type = "voie";  // Force le type à "voie"
        if (!itemData.system) {
            itemData.system = {};
        }
        itemData.system.rank = 1;
    
        // Créer l'item sur l'acteur avec les nouvelles données
        const created = await this.actor.createEmbeddedDocuments("Item", [itemData]);
        
        return created;
    }

    async _onItemDelete(event) {
        event.preventDefault();
        
        // Récupérer l'élément cliqué
        const element = event.currentTarget;
        
        const itemElement = element.closest('[data-item-id]');        
        const itemId = itemElement.dataset.itemId;
        
        const confirmDelete = await Dialog.confirm({
            title: "Suppression d'objet",
            content: "Êtes-vous sûr de vouloir supprimer cet objet ?",
            yes: () => true,
            no: () => false,
            defaultYes: false
        });
        
        if (confirmDelete) {
            try {
                await this.actor.deleteEmbeddedDocuments("Item", [itemId]);
                ui.notifications.info("Item supprimé avec succès");
            } catch (error) {
                console.error("Error deleting item:", error);
                ui.notifications.error("Erreur lors de la suppression de l'item");
            }
        }
    }
    
}