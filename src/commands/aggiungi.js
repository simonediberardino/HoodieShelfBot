const utils = require("../functions/utils");
const config = require("../../config.json");
const {db} = require("../../index");

const usage = {
    usage: "/aggiungi <ID>",
    args: 1
}

const func = (context, args) => {
    const productId = args[0];
    const usernameTelegram = context.message.from.username;
    
    utils.getUtenteByTelegram(usernameTelegram, (err, row) => {
        if(err || !row) 
            return utils.notLinked(context);

        const userId = row.id;

        db.get("SELECT EXISTS (SELECT * FROM carrello WHERE productId = ? AND userId = ?); INSERT OR IGNORE INTO carrello(productId, userId) VALUES(?, ?);", [productId, userId], (err, exists) => {
            if(exists)
                utils.printError("Il prodotto è già presente nel tuo carrello.", context);
            else
                utils.printEmbed("📚 AGGIUNTO! ✔️", "Il prodotto è stato aggiunto al carrello con successo! (/carrello)", context);
        });
    })
}

module.exports = {
    usage, func
}