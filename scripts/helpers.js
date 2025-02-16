// HandleBar Helpers - eq
export const registerHandlebarsHelpers = () => {
    // Egalité
    Handlebars.registerHelper('eq', function(v1, ...v2) {
        console.log("IN");
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
};

