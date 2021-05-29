const utils = require("../functions/utils");
const config = require("../../config.json");
const {db} = require("../../index");

const usage = {
    usage: "/ricerca <CODICE_VOLUME>",
    args: 1
}

const func = (context, args) => {
    const codiceVolume = args[0];
    
    db.all("SELECT * FROM prodotti WHERE codiceVolume = ?;", [codiceVolume], (err, row) => {
        if(row.length > 0){
            const title = "📚 LIBRO TROVATO! ✔️ (/aggiungi)";
            let body = new String();

            row.forEach(elem => {
                body = utils.addField(body, elem.titolo+" (ID: "+elem.id+"): "+config.sito+"/product/"+elem.id);
            });

            utils.printEmbed(title, body, context);
        }else{
            utils.printError("Il libro non è stato trovato.", context);
        }
    });
}

module.exports = {
    usage, func
}