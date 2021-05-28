module.exports = (bot) => {
    bot.start((context) => {
        const WELCOME_MSG = `📚 BENVENUTO AL BOT UFFICIALE DI HOODIESHELF! 👋

✔️ INTRODUZIONE:
▪ Questo è il bot ufficiale di hoodieshelf.latina.it, un portale dedicato alla vendita di libri usati nel territorio di Latina. 
Utilizzando questo bot potrai accedere alle informazioni relative al tuo profilo e al sito in modo più semplice e veloce.
Non sai come? Dai un'occhiata ai comandi disponibili!
Ricorda che per usare la maggior parte delle funzionalità è necessario collegare il tuo account telegram sul nostro sito!

✔️ COMANDI DISPONIBILI:
▪ /lista: Mostra le informazioni relative ai tuoi prodotti;
▪ /carrello: Mostra i prodotti nel tuo carrello;
▪ /aggiungi <ID>: Aggiungi un prodotto al tuo carrello;
▪ /info: Mostra le informazioni relative al tuo profilo;
▪ /ricerca <ID/Nome>: Ricerca il prodotto nel database, restituendone il relativo ID da usare col comando /aggiungi. Verrà inoltre visualizzato il relativo link della pagina web;

✔️ CREDITI:
▪ Sviluppatori: Daniele Calisti, Simone Di Berardino;
▪ Grafici: Nicolas Fiocco;`;

        context.reply(WELCOME_MSG);
    });
}