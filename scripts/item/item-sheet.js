export class CustomItemSheet extends ItemSheet {    

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["rnp", "sheet", "item"],
            template: "systems/RnP/templates/item/object-sheet.hbs",
            width: 600,
            height: 600,
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

    // // Calculer le modificateur de force
    // const forceValue = context.actor.system.attributes.force.value;
    // // console.log(context.actor.system);
    // context.actor.system.attributes.force.mod = CUSTOM_SYSTEM.utils.calculateModifier(forceValue);

    async getData() 
    {
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
        switch (this.item.type) 
        {
            case 'object':
                console.log("************ OBJET ***************");
                break;
            case 'spell':
                // Données spécifiques pour les sorts
                console.log("************ SORT ***************");
                console.log(context.system);
                if(context.system.incantation != 30) {
                    context.system.incantationtimemins = 0;
                }
                console.log("************ SORT ***************");
                break;
            case 'capacity':
                // Données spécifiques pour les items
                console.log("************ CAPACITE ***************");
                break;
            case 'don':
                // Données spécifiques pour les items
                console.log("************ DON ***************");
            break;
            case 'aptitude':
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
        html.find('.incant').on('change', this._onChange.bind(this));
    }

    _onItemEdit(event) {
        console.log("Édition d'item");
        event.preventDefault();
    }

    async _onChange(event) {
        if(this.item.system.incantation != 30)
        {
            await this.item.update({
                "system.incantationtimemins" : 0
            })
        }
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