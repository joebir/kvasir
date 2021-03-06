const Discord = require('discord.js');
const client = new Discord.Client();
const {rando, randoSequence} = require('@nastyox/rando.js');
require('dotenv').config();
const assetData = require('./data/assets.json');
const moveData = require('./data/moves.json');

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
    const asset = assetData.find(e => e.name.toLowerCase().replace(/\s/g, "")
    .includes(searchTerm.toLowerCase()));
    if (typeof asset === 'undefined') {
        searchFail(searchTerm, msg);
    } else {
        let content = `${msg.author}\n__***${asset.name}***__\n*${asset.type}*\n`;
        if (asset.info) content += `${asset.info}\n`;
        content += `${asset.point1}\n${asset.point2}\n${asset.point3}`;
        if (asset.health) content += `\nHealth: ${asset.health}`;
        msg.channel.send(content);
    }
}

moveLookup = (args, msg) => {
    const searchTerm = args[1];
    const move = moveData.find(e => e.name.toLowerCase().replace(/\s/g, "")
        .includes(searchTerm.toLowerCase()));
    if (typeof move === 'undefined') {
        searchFail(searchTerm, msg);
    } else {
        let content = `${msg.author}\n__***${move.name}***__\n*${move.type}*\n`;
        if(move.progress) content += '*Progress Move*\n';
        content += move.text;
        msg.channel.send(content);
    }
    
    if(args.length > 2) {
        takeAction(args[2], msg);
    }
}

oracle = (msg) => {
    const num = rando(1, 100);
    msg.reply(`the magic number is ${num}.`);
}

searchFail = (searchTerm, msg) => {
    msg.channel.send(`Sorry ${msg.author}, I could not find anything matching "${searchTerm}".`)
}

takeAction = (actionDieBonus, msg) => {
    if (isNaN(actionDieBonus)) return;
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
    if(args.length === 0) return;

    if (args[0].toLowerCase() === "asset") {
        if (args.length === 1) return;
        assetLookup(args[1], msg);
    } else if (args[0].toLowerCase() === "oracle") {
        oracle(msg);
    } else if (args[0].toLowerCase() === "move") {
        if (args.length === 1) return;
        moveLookup(args, msg);
    } else {
        const actionDieBonus = parseInt(args[0]);
        takeAction(actionDieBonus, msg);
    }
});

client.login(process.env.BOT_TOKEN);