const Discord = require('discord.js');
const client = new Discord.Client();
const {rando, randoSequence} = require('@nastyox/rando.js');
require('dotenv').config();
const assetData = require('./data/assets.json');

class action {
    constructor(actionDieBonus) {
        this.actionDieBonus = actionDieBonus;
        this.actionDie = rando(1, 6);
        this.actionResult = Math.min(actionDieBonus + this.actionDie, 10);
        this.challengeDie1 = rando(1, 10);
        this.challengeDie2 = rando(1, 10);
    }

    getOutcome = () => {
        if (this.actionResult > this.challengeDie1 && this.actionResult > this.challengeDie2) return "Strong Hit";
        else if (this.actionResult > this.challengeDie1 || this.actionResult > this.challengeDie2) return "Weak Hit";
        else return "Miss";
    }
}

assetLookup = (searchTerm, msg) => {
    const asset = assetData.find(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (typeof asset === 'undefined') {
        msg.channel.send(`Sorry ${msg.author}, I could not find anything matching "${searchTerm}".`)
    } else {
        let content = `${msg.author}\n***${asset.name}***\n*${asset.type}*\n`;
        if (asset.info) content += `${asset.info}\n`;
        content += `${asset.point1}\n${asset.point2}\n${asset.point3}`;
        if (asset.health) content += `\nHealth: ${asset.health}`;
        msg.channel.send(content);
    }
}

oracle = (args, msg) => {
    const num = rando(1, 100);
    msg.reply(`the magic number is ${num}.`);
}

takeAction = (actionDieBonus, msg) => {
    const a = new action(actionDieBonus);
    const content = `${msg.author}\`\`\`Action Die: ${a.actionDie}\nChallenge Dice: ${a.challengeDie1}, ${a.challengeDie2}\`\`\`${a.getOutcome()}`;
    msg.channel.send(content);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (!msg.content.toLowerCase().startsWith(process.env.PREFIX) || msg.author.bot) return;
    const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/);

    if (args[0].toLowerCase() === "asset") {
        if (args.length === 1) return;
        assetLookup(args[1], msg);
    } else if (args[0].toLowerCase() === "oracle") {
        oracle(args, msg);
    } // TODO: implement further functionality here
    else {
        const actionDieBonus = parseInt(args[0]);
        if (isNaN(actionDieBonus)) return;
        takeAction(actionDieBonus, msg);
    }
});

client.login(process.env.BOT_TOKEN);