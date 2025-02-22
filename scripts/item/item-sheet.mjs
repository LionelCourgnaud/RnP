export class CustomItemSheet extends ItemSheet {    

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["rnp", "item"],
            template: "systems/RnP/templates/item/object-sheet.hbs",
            width: 580,
            height: 750,
            tabs: [{
                navSelector: ".sheet-tabs",
                contentSelector: ".sheet-body",
                initial: "description"
            }],
            resizable : false
        });
    }

    get template() {
        const type = this.item.type.toLowerCase();
        return `systems/RnP/templates/item/${type}-sheet.hbs`;
    }

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
                // console.log("************ OBJET ***************");
                break;
            case 'spell':
                console.log("************ SORT ***************");
                break;
            case 'capacity':
                // console.log("************ CAPACITE ***************");
                break;
            case 'don':
                // console.log("************ DON ***************");
            break;
            case 'aptitude':
                // console.log("************ APTITUDE ***************");
            break;
        }

        return context;
    }
    
    // Listeners - capte les classes HTML + callback
    activateListeners(html) {
        super.activateListeners(html);
        // Activer les écouteurs uniquement si la feuille est éditable
        if (!this.isEditable) return;
        // Ajouter des écouteurs d'événements si nécessaire
        html.find('.item-edit').click(this._onItemEdit.bind(this));
        html.find('.incant').on('change', this._onIncantChange.bind(this));
        html.find('.duration').on('change', this._onDurationChange.bind(this));
        html.find('.classe-click').click(this._onClassEdit.bind(this));
        html.find('.component-click').click(this._onComponentsEdit.bind(this));
        html.find('.preview').click(this._togglePreview.bind(this));
    }


    _togglePreview(value) {
        const pview = value == false ? false : !this.item.system.preview;
        this.item.update({"system.preview": pview});
    }

    // Callback .item-edit (click)
    _onItemEdit(event) {
        console.log("Édition d'item");
        event.preventDefault();
    }

    // Callback .classe-click (click)
    async _onClassEdit(event) 
    {
        const context = await this.getData();
        let currentClasses = context.item.system.classes;
        if(!currentClasses.includes(event.currentTarget.value)) {
            currentClasses.push(event.currentTarget.value);
        } else {
            currentClasses = currentClasses.filter(item => item != event.currentTarget.value.toString());
        }      
        await this.item.update({
            "system.classes" : currentClasses
        })
        event.preventDefault();
    }

    // Callback .component-click (click)
    async _onComponentsEdit(event) {
        const context = await this.getData();
        let currentComponents = context.item.system.components;
        if(!currentComponents.includes(event.currentTarget.value)) {
            currentComponents.push(event.currentTarget.value);
        } else {
            currentComponents = currentComponents.filter(item => item != event.currentTarget.value.toString());
        }      
        await this.item.update({
            "system.components" : currentComponents
        })
        event.preventDefault();
    }

    // Callback .duration (change)
    async _onDurationChange(event) {
        console.log(this.item.system.duration.units);
        if(this.item.system.duration.units != "round" 
            && this.item.system.duration.units != "minute"
            && this.item.system.duration.units != "hour"
            && this.item.system.duration.units != "day") {
            await this.item.update({
                "system.duration.value" : 0
            })
        }
        event.preventDefault(); 
    }

    // Callback .incantation (change)
    async _onIncantChange(event) {
        // 25: "heure(s)"",30: "minute(s)",32: "round(s)",
        if(this.item.system.incantationtype != 30 
            && this.item.system.incantationtype != 25 
            && this.item.system.incantationtype != 32) {
            await this.item.update({
                "system.incantationvalue" : 0
            })
        }
        event.preventDefault(); 
    }

    // Callback ?? (??)
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