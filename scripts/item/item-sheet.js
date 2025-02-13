export class CustomItemSheet extends ItemSheet {    

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["rnp", "sheet", "item"],
            template: "systems/RnP/templates/item/objet-sheet.hbs",
            width: 540,
            height: 480,
            tabs: [{
                navSelector: ".sheet-tabs",
                contentSelector: ".sheet-body",
                initial: "description"
            }]
        });
    }

    get template() {
        const type = this.item.type.toLowerCase();
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
        // 'objet', 'sort', 'capacite', 'don', 'aptitude'
        switch (this.item.type) {
            case 'Objet':
                // Données spécifiques pour les voies
                // context.rangs = {
                //     rang1: context.system.rangs?.rang1 || {},
                //     rang2: context.system.rangs?.rang2 || {},
                //     rang3: context.system.rangs?.rang3 || {},
                //     rang4: context.system.rangs?.rang4 || {},
                //     rang5: context.system.rangs?.rang5 || {}
                // };
                console.log("************ OBJET ***************");
                break;
            case 'Sort':
                // Données spécifiques pour les sorts
                console.log("************ SORT ***************");
                console.log(context);
                break;
            case 'Capacité':
                // Données spécifiques pour les items
                console.log("************ CAPACITE ***************");
                break;
            case 'Don':
                // Données spécifiques pour les items
                console.log("************ DON ***************");
            break;
            case 'Aptitude':
                // Données spécifiques pour les items
                console.log("************ APTITUDE ***************");
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