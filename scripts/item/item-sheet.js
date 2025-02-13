export class CustomItemSheet extends ItemSheet {            //ItemSheetV2
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["cof", "sheet", "item"],
            template: "systems/RnP/templates/item/item-sheet.hbs",
            width: 520,
            height: 480,
            tabs: [{
                navSelector: ".sheet-tabs",
                contentSelector: ".sheet-body",
                initial: "description"
            }]
        });
    }

    get template() {
        const type = this.item.type;
        return `systems/RnP/templates/item/${type}-sheet.hbs`;
    }

    async getData() {
        // Récupérer les données de base
        const context = await super.getData();
        // S'assurer que nous avons un objet system
        context.system = context.item.system || {};
        // Ajouter CUSTOM_SYSTEM au contexte
        context.config = CUSTOM_SYSTEM;
        // Ajouter les types de données pour les champs - optional
        context.dtypes = ["String", "Number", "Boolean"];

        // Ajout de données spécifiques selon le type
        switch (this.item.type) {
            case 'voie':
                // Données spécifiques pour les voies
                context.rangs = {
                    rang1: context.system.rangs?.rang1 || {},
                    rang2: context.system.rangs?.rang2 || {},
                    rang3: context.system.rangs?.rang3 || {},
                    rang4: context.system.rangs?.rang4 || {},
                    rang5: context.system.rangs?.rang5 || {}
                };
                break;
            case 'spell':
                // Données spécifiques pour les sorts
                break;
            case 'item':
                // Données spécifiques pour les items
                break;
        }

        return context;
    }
    
    activateListeners(html) {
        super.activateListeners(html);
        // Activer les écouteurs uniquement si la feuille est éditable
        if (!this.isEditable) return;
        // Ajouter des écouteurs d'événements si nécessaire
        html.find('.item-edit').click(this._onItemEdit.bind(this));
    }

    _onItemEdit(event) {
        console.log("Édition d'item");
        event.preventDefault();
    }

    async _onItemDelete(event) {        // to test
        console.log("onItemDelete");
        event.preventDefault();
        const li = event.currentTarget.closest(".item");
        const item = this.actor.items.get(li.dataset.itemId);
        await item.delete();
        //animation slide pour fermer la fenetre 
        li.slideUp(200, () => this.render(false));
    }
}