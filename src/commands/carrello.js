const utils = require("../functions/utils");
const {db} = require("../../index");

const usage = {
    usage: "/carrello",
    args: 0
}

const func = (context) => {
    const telegramUsername = context.message.from.username;

    /*utils.getUtenteByTelegram(telegramUsername, (err, user) => {
        if(user == null)
            return utils.notLinked(context);

        db.query("SELECT * FROM carrello INNER JOIN prodotti ON carrello.productId = prodotti.id AND carrello.userId = ?;", [user.id], async (err, row) => {
            if(err || !row || row.length == 0)
                return utils.printError("Il tuo carrello è vuoto!", context);
        
            const title = "📚 IL TUO CARRELLO! 🔍";
            let body = new String();
        
            for(el of row)
                body = utils.addField(body, el.titolo + " ("+el.codiceVolume+"): "+el.costo+"€ ("+el.stato+")");
        
            utils.printEmbed(title, body, context);
        });
    });*/
}

const getProdottoById = (productId) => {
    return new Promise((resolve) => {
        db.all("SELECT * FROM prodotti WHERE id = ?", [productId], (err, row) => {
            resolve(row);
        })
    });
}

module.exports = {
    usage, func
}