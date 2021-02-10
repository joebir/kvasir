const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const {rando, randoSequence} = require('@nastyox/rando.js');

class action {
    constructor(actionDieBonus) {
        this.actionDieBonus = actionDieBonus;
        this.actionDie = rando(1, 6);
        this.actionResult = Math.min(actionDieBonus + this.actionDie, 10);
        this.challengeDie1 = rando(1, 10);
        this.challengeDie2 = rando(1, 10);
    }

    getOutcome = () => {
        if(this.actionResult > this.challengeDie1 && this.actionResult > this.challengeDie2) return "Strong Hit";
        else if(this.actionResult > this.challengeDie1 || this.actionResult > this.challengeDie2) return "Weak Hit";
        else return "Miss";
    }

    
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
    if (!msg.content.toLowerCase().startsWith('!k') || msg.author.bot) return;
    const args = msg.content.slice(2).trim().split(/ +/);

    // TODO: implement further functionality here, but dice rolling first
    const actionDieBonus = parseInt(args[0]);
    if (isNaN(actionDieBonus)) return;
    takeAction(actionDieBonus, msg);
});

client.login(process.env.BOT_TOKEN);