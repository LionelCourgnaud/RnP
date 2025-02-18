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

