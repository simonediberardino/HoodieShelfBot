const utils = require("../functions/utils");
const config = require("../../config.json");
const {db} = require("../../index");

const usage = {
    usage: "/rimuovi <ID>",
    args: 1
}

const func = (context, args) => {
    const productId = args[0];
    const usernameTelegram = context.message.from.username;
    
    utils.getUtenteByTelegram(usernameTelegram, (err, row) => {
        if(err || !row) 
            return utils.notLinked(context);

        const userId = row.id;

        db.get("SELECT * from carrello WHERE productId = ? AND userId = ?; DELETE FROM carrello WHERE productId = ? AND userId = ?;", [productId, userId], (err, row) => {
            if(!row) 
                utils.printError("Questo prodotto non è presente nel tuo carrello!", context);
            else 
                utils.printEmbed("📚 RIMOSSO! ✔️", "Il prodotto è stato rimosso al carrello con successo! (/carrello)", context);
        });
    })
}

module.exports = {
    usage, func
}