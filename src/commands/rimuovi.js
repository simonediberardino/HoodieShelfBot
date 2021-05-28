const utils = require("../functions/utils");
const config = require("../../config.json");
const {db} = require("../../index");

const usage = {
    usage: "/rimuov <ID>",
    args: 1
}

const func = (context, args) => {
    const productId = args[0];
    const usernameTelegram = context.message.from.username;
    
    utils.getUtenteByTelegram(usernameTelegram, (err, row) => {
        if(err || !row) 
            return utils.notLinked(context);

        const userId = row.id;

        db.get("SELECT * FROM prodotti WHERE id = ?", [productId], (err, row) => {
            if(err || !row || row.isVenduto)
                return utils.printError("Il prodotto è inesistente o è già stato venduto.", context);

            db.get("SELECT * FROM carrello WHERE productId = ? AND userId = ?", [productId, userId], (err, exists) => {
                if(!exists)
                    return utils.printError("Il prodotto non è presente nel tuo carrello.", context);
                
                db.run("DELETE FROM carrello WHERE productId = ? AND userId = ?", [productId, userId], (err, row) => {
                    console.log(err)
                    if(err)
                        utils.unknownError(context);
                    else
                        utils.printEmbed("📚 RIMOSSO! ✔️", "Il prodotto è stato rimosso al carrello con successo! (/carrello)", context);
                });
            });
        });
    })
}

module.exports = {
    usage, func
}