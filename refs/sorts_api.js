import { ALL_SORTS } from "./sorts.js"

const CONVERT = {
    // "min" : CUSTOM_SYSTEM.utils.getKey(CUSTOM_SYSTEM.durationTypes,"Minute(s)"),
    "min" : "minute",
    // wrap types de durée
    "jusqu’à dissipation" : "dissip",
    "jusqu'à utilisation" : "use",
    "jusqu'à dissipation" : "dissip",
    "jusqu’à dissipation ou déclenchement" : "dissipcast",
    "jusqu’à déclenchement ou dissipation" : "dissipcast",
    "jusqu’à la fin du prochain tour du lanceur" : "nextturn",
}

export class Translation {  


    all_sorts() {
        return ALL_SORTS;
    }

    wrap(key) {
        if(CONVERT[key]!=null)
            return CONVERT[key];
        return key;
    }

    wrapForeign(keysrc,keydst) {
        if(CONVERT[keysrc]!=null) {
            return CONVERT[keysrc];
        }
        return keydst;
    }

    parseCastingTime(value) {
        let parsed = value.split(".");
        console.log(parsed);
        let result = [];
        result.push(parseInt(parsed[0]));
        result.push(parsed.length > 1 ? parseInt(parsed[1]) : 0);
        return result;
    } 

    giveme(keys) {
        let result = [];
        console.log(keys);
        let all_keys = keys.split(".");
        console.log(all_keys);
        ALL_SORTS.forEach(element => {
            let value = element;
            all_keys.forEach(key => {   // toutes les clés
                if (value !== undefined) {
                    value = value[key]; // Accéder à la clé imbriquée
                }
            });
            if (value !== undefined) {
                if (Array.isArray(value)) {
                    value.forEach(all_values => {
                        this.insertValue(result, all_values);
                    });
                } else {
                    this.insertValue(result, value);
                }
            }
        });
        return result;
    }

    // insertValue(tab,val) {
    //     if (val !== undefined && !tab.includes(val)) {
    //         tab.push(val);
    //     }
    //     else
    //     {
    //         tab[val] += tab[val];
    //     }
    // }

    insertValue(tab, val) {
        if (val !== undefined) {
            if (tab[val] === undefined) {
                tab[val] = 1;
            } else {
                tab[val] += 1;
            }
        }
    }
}
