const config = require("/pranavbot/config.json");

exports.run = (client, message, args) =>
{
    if(message.author.id === config.ownerID)
    {
        message.delete();
        message.channel.send(args.join(" "));
   
    }
    else
    {
        message.channel.send("Wont work " + message.author + "!");
    }
}