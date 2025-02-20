// HandleBar Helpers - eq
export const registerHandlebarsHelpers = () => {
    // Egalité
    Handlebars.registerHelper('eq', function(v1, ...v2) {
        let nbValues = v2.length-1;
        let result = false;
        for(let i=0;i<nbValues;i++) {
            result ||= v2[i] == v1;
        }
        return result;
    }); 

    // Include (array)
    Handlebars.registerHelper('inside', function(v1, v2) {
        return v1.includes(v2.toString());
    }); 

    // config[val]
    Handlebars.registerHelper('array', function(v1, v2) {
        let result = [];
        if(Array.isArray(v2)) {
            v2.forEach(key => {
                if (v1[key] !== undefined) {
                    result.push(v1[key]);
                }
            });
            return result.join(', ');
        } else {
            result.push(v1[v2]);
        }
        return result;
    });

    Handlebars.registerHelper("inc", function(value) {
        return parseInt(value) + 1;
    });
    
    Handlebars.registerHelper("eqmod", function(value, modulo) {
        return (parseInt(value) % modulo) === 0;
    });
    Handlebars.registerHelper("eqnotmod", function(value, modulo) {
        return (parseInt(value) % modulo) != 0;
    });
    
    Handlebars.registerHelper('isChecked', function(array, value) {
        return (Array.isArray(array) && array.includes(value)) ? "checked" : "";
    });
};

