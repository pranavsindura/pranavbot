const fs = require("fs");
const Discord = require('discord.js');
const sql = require('sqlite3');
const db = new sql.Database('/pranavbot/points.sqlite');
const util = require('util');

db.get = util.promisify(db.get);

exports.run = (client, message, args) =>
{

	db.get(`select * from Guilds where id = ${message.guild.id};`)
	.then((row) => 
	{

    if(args.length)
    {
        message.channel.send(new Discord.RichEmbed()
        .setColor(0x00ae86)
        .setTitle("Usage:")
        .setDescription("**`" + row.prefix + "help`**"));
    }
    else
    {
    const embed = new Discord.RichEmbed()
        .setColor(0x00ae86)
        .setTitle("Help Menu");
    
    fs.readdir("/pranavbot/commands/", (err, files) =>
    {
        if(err)
        {
            return console.log(err);
        }

        let comm = [];
        files.forEach((file) =>
        {
            comm.push(file.split(".")[0]);
        });

        embed.addField("**Prefix:**", row.prefix);
        embed.addField("**Commands:**", comm.join(", "));
        embed.addField("Forgot Prefix?","To grab your current prefix, type,\n **`@PranavBot#5465 help`**");
        message.channel.send(embed);

    });
    }
}).catch(err => console.log(err));
}