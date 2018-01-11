const Discord = require('discord.js');
const superagent = require("superagent");
const Client = new Discord.Client();
const OwnerID = "400886418575982592";

const prefix = ">>"



Client.on("ready", () => {
	console.log("online");
	Client.user.setPresence({ game: { name: `I'm being programmed beep boop!`, type: 0} });
});

// welcome message

Client.on("guildMemberAdd", member => {
   member.guild.defaultChannel.send("Welcome to: " + member.guild.name + " Hope you enjoy it here")
});

Client.on("guildMemberRemove", member => {
   member.guild.defaultChannel.send("Goodbye: " + member.user.username + " from " + member.guild.name)
});

Client.on("guildCreate", guild => {
	console.log("Some one added the test bot to a server created by: " + guild.owner.user.username)
});

Client.on("message", async (message) => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	
	let command = message.content.split(" ")[0];
	command = command.slice(prefix.length);
	
	let args = message.content.split(" ").slice(1);
	
	if (command === "ping") {
		message.channel.send(`Pong! Time took: ${Date.now() - message.createdTimestamp} ms`);
	} else

	if (command === "say") {
		message.delete()
                const embed = new Discord.RichEmbed()
		.setColor(0xCCCCFF)
		.setDescription(message.author.username + " says: " + args.join(" "));
		message.channel.send({embed})
	} else

   if (command === "cat") {
	   const { body } = await superagent
	   .get('http://random.cat/meow');
	   const embed = new Discord.RichEmbed()
	   .setColor(0xCCCCFF)
	   .setTitle("Meow :cat:")
	   .setImage(body.file)
	   message.channel.send({embed})
   } else

   if (command === "announcement") {
	   if (message.member.hasPermission("ADMINISTRATOR")) {
		   const text = args.join(" ")
		   if (text.length < 1) return message.channel.send("Can not announce nothing");
		   //const colour = args.slice(2).join("");
		   const embed = new Discord.RichEmbed()
		   .setColor(0xCCCCFF)
		   .setTitle("Important Announcement:")
		   .setDescription(text);
		   message.channel.send("@everyone")
		   message.channel.send({embed})
	   }
    }

	if (command == "help") {
		const embed = new Discord.RichEmbed()
		.setColor(0xCCCCFF)
		.setTitle("Command List:")
		.addField(">>help", "Will give the current command list")
		.addField(">>ping", "WIll show the ping time for the bot")
		.addField(">>say [text]", "Will make the bot say something")
		.addField(">>announcement [text]", "Will make the bot say an announcement and tag everyone (ADMIN ONLY)")
		.addField(">>cat", "Will send a random cat image");
		message.channel.send({embed})
	} 
});

Client.login("Secret smh");
