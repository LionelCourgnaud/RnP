// HandleBar Helpers - eq
export const registerHandlebarsHelpers = () => {
    Handlebars.registerHelper('eq', function(v1, v2) {
        
        return v1 == v2;
    }); 
};


  