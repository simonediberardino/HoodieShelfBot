const addField = (string, field) => {
    if(!string) 
        string = "";
    return string + "▪ " + field + ".\n";
}

const getUtenteByTelegram = (telegramUsername, callback) => {
    const {db} = require("../../index");

    db.get("SELECT * FROM utenti WHERE telegramUsername = ?;", [telegramUsername], (err, row) => {
        callback(err, row);
    });
}

const notLinked = (context) => {
    printError("Questo account telegram non è associato a nessun venditore.", context);
}

const unknownError = (context) => {
    printError("Errore sconosciuto.", context);
}

const printDBError = (context) => {
    printError("Non è stato possibile connettersi al database.", context);
}

const printEmbed = (title, body, context) => {
    context.reply(title + "\n" + body);
}

const printUsage = (usage, context) => {
    printError("Utilizzo corretto: " + usage.usage + ".", context);
}

const printError = (errore, context) => {
    context.reply("❌ Ooops, errore! \n▪ " + errore);
}

module.exports = {
    printError, printUsage, printEmbed, notLinked, printDBError, getUtenteByTelegram, addField, unknownError
}
