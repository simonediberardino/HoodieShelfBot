const utils = require("../functions/utils");
const config = require("../../config.json");
const {db} = require("../../index");

const usage = {
    usage: "/ricerca <ID>",
    args: 1
}

const func = (context, args) => {
    const codiceVolume = args[0];
    
    queryLibro(codiceVolume, (row) => {
        if(row){
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

const queryLibro = (codiceVolume, callback) => {
	db.all("SELECT * FROM prodotti WHERE codiceVolume = ?;", [codiceVolume], (err, row) => {
        return callback(row);
	});
}

module.exports = {
    usage, func
}