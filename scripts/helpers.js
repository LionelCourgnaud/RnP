// HandleBar Helpers - eq
export const registerHandlebarsHelpers = () => {
    // Egalité
    Handlebars.registerHelper('eq', function(v1, v2) {
        
        return v1 == v2;
    }); 
    // Include (array)
    Handlebars.registerHelper('inside', function(v1, v2) {
        console.table(v1);
        console.log(v1.includes(v2.toString()));
        return v1.includes(v2.toString());
    }); 
};

