import { ALL_SORTS } from "./sorts.js"

const CONVERT = {
    // "min" : CUSTOM_SYSTEM.utils.getKey(CUSTOM_SYSTEM.durationTypes,"Minute(s)"),
    "min" : "minute"
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

    insertValue(tab,val) {
        if (val !== undefined && !tab.includes(val)) {
            tab.push(val);
        }
    }


  // giveme(keys) {
    //     let result = [];
    //     console.log(keys);
    //     let all_keys = keys.split(".");
    //     console.log(all_keys);
    //     ALL_SORTS.forEach(element => {
    //         let value = element;
    //         all_keys.forEach(key => {   // toutes les clés
    //             if (value !== undefined) {
    //                 if(Array.isArray(value[key])) {
    //                     value[key].forEach(all_values =>{
    //                         this.insertValue(result,all_values);
    //                     })
    //                 } else {
    //                     this.insertValue(result,value);
    //                 }
    //             }
    //         });
    //     });
    //     return result;
    // }

    // giveme(keys) {
    //     let result = [];
    //     console.log(keys);
    //     let all_keys = keys.split(".");
    //     console.log(all_keys);
    //     ALL_SORTS.forEach(element => {
    //         let value = element;
    //         all_keys.forEach(key => {
    //             if (value !== undefined) {
    //                 value = value[key];
    //             }
    //         });
    //         if (value !== undefined && !result.includes(value)) {
    //             result.push(value);
    //         }
    //     });
    //     return result;
    // }
}
