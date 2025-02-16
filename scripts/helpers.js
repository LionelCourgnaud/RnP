// HandleBar Helpers - eq
export const registerHandlebarsHelpers = () => {
    // Egalité
    Handlebars.registerHelper('eq', function(v1, ...v2) {
        console.log("IN");
        let nbValues = v2.length-1;
        let result = false;
        let interat = 0;
        for(let i=0;i<nbValues;i++) {
            console.log("v1 " + v1 + " / v2 "+v2[i]);
            result ||= v2[i] == v1;
            console.log(v2[i] == v1);
        }
        console.log("V1 "+v1);
        console.log("V2 "+v2);
        console.log(result);
        console.log("OUT");
        return result;
    }); 
    // Include (array)
    Handlebars.registerHelper('inside', function(v1, v2) {

        return v1.includes(v2.toString());
    }); 
};

