const config = require("./config.json");
const Telegraf = require('telegraf');
const bot = new Telegraf.Telegraf(config.token);
const Database = require("sqlite3").Database;
const db = new Database("./database/database.db");

bot.launch(); onLaunch();

function onLaunch(){
	require("./src/functions/welcome")(bot);
	require("./src/handler/cmd_handler")(bot);
}

module.exports = {
	db, bot
}