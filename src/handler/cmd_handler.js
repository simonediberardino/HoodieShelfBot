const fs = require("fs");
const utils = require("../functions/utils");

module.exports = () => {
    /* COMMAND HANDLER; */
    fs.readdir("./src/commands/", (err, files) => {
        if (err) 
            return console.error(err);

        files.forEach(file => {
            const {bot} = require("../../index");
            const command = require(`../commands/${file}`);
            const commandName = file.split(".")[0];

            bot.command(commandName, (context) => {
                const args = context.message.text.trim().split(" ");
                args.shift();

                if(args.length < command.usage.args)
                    utils.printUsage(command.usage, context);
                else
                    command.func(context, args);
            });
        });
    });
}
