const utils = require("../functions/utils");
const {db} = require("../../index");

const usage = {
    usage: "/info",
    args: 0
}

const func = (context, args) => {
    const telegramUsername = context.message.from.username;

    utils.getUtenteByTelegram(telegramUsername, (err, row) => {
        if(err || !row) return utils.notLinked(context);

        const nome = row.nome;
        const cognome = row.cognome;
        const email = row.email;
        const id = row.id;
    
        const titolo = "👤 IL TUO ACCOUNT! 🔍";

        let description = new String();
        description = utils.addField(description, "Nome: "+nome);
        description = utils.addField(description, "Cognome: "+cognome);
        description = utils.addField(description, "Email: "+email);
        description = utils.addField(description, "Account ID: "+id);
        
        getRecensioni(id, (n_recensioni, n_stelle) => {
            description = utils.addField(description, "Numero recensioni: "+n_recensioni);

            let stelle_str = "Valutazione: ";

            if(n_stelle > 0){
                for(let i = 0; i < n_stelle; i++)
                    stelle_str += "⭐";
            }else stelle_str += "Nessuna";

            description = utils.addField(description, stelle_str);

            utils.printEmbed(titolo, description, context);
        });
    });
}

const getRecensioni = (id, callback) => {
    db.all("SELECT stelle FROM recensioni WHERE userId = ?", [id], (err, row) => {
        if(row.length == 0) return callback(0, 0);
        const media = Math.trunc(row.reduce((a, b) => a.stelle + b.stelle) / row.length);
        callback(row.length, media);
    });
}

module.exports = {
    usage, func
}