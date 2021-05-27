const utils = require("../functions/utils");
const {db} = require("../../index");

const usage = {
    usage: "/lista",
    args: 0
}

const func = (context) => {
    const telegramUsername = context.message.from.username;

    queryLibro(telegramUsername, (row) => {
        if(row == null)
            return utils.notLinked(context);

        if(row.length == 0)
            return utils.printError("Non è stato trovato nessun libro associato a questo venditore.", context);
    
        const title = "📚 I TUOI PRODOTTI! 🔍";
        let body = new String(); 

        row.forEach(elem => {
            const stato = elem.isVenduto ? "VENDUTO" : "IN VENDITA";
            body = utils.addField(body, elem.titolo+" ("+elem.codiceVolume+")"+": "+stato);
        });

        utils.printEmbed(title, body, context);
    });
}

const queryLibro = async (telegramUsername, callback) => {
    utils.getUtenteByTelegram(telegramUsername, (err, row) => {
        if(!row)
            return callback(null);

        const ID = row.id;

        db.all("SELECT * FROM prodotti WHERE userid = ?;", [ID], (err, row) => {
            callback(row);
        });
    });
}

module.exports = {
    usage, func
}