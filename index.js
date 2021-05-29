var sql = require('node-sqlserver');

var conn_str = "Driver={SQL Server Native Client 11.0};Server=(31.11.39.53);Database=Sql1557649_1;Password=200100onicrauG!;User=Sql1557649;Trusted_Connection={Yes}";

sql.open(conn_str, function (err, conn) {
  	if (err) {
    	console.log("Impossibile stabilire una connessione!");
    	return;
  	}
  	conn.queryRaw("SELECT * FROM carrello", function (err, results) {
    	if (err) {
      	console.log("Errore nell'esecuzione della query!");
      	return;
    	}
+		console.log(results);
  	});
});

/*const config = require("./config.json");
const Telegraf = require('telegraf');
const bot = new Telegraf.Telegraf(config.token);
// const Database = require("sqlite3").Database;
// const db = new Database("./database/database.db");
const mysql = require("mysql");

const db = mysql.createPool({
	host: "31.11.39.53",
	user: "Sql1557649",
	password: "200100onicrauG!",
	database: "Sql1557649_1"
});

bot.launch(); 
onLaunch();

function onLaunch(){
	require("./src/functions/welcome")(bot);
	require("./src/handler/cmd_handler")(bot);
}

module.exports = {
	db, bot
}*/