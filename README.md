# Kvasir
A Discord bot for use with the Ironsworn RPG.

Development is ongoing, this version is much more a proof of concept than a fully realized bot. You can add Kvasir to your server using [this](https://discord.com/api/oauth2/authorize?client_id=809058483932495895&permissions=2048&scope=bot) link.

## Commands
### !k [number]
Kvasir rolls your Action Die and Challenge Dice, does some math, then sends a message back. It tags the user who sent the command along with all of the dice results and the outcome of the roll.
### !k oracle
Kvasir rolls a d100 for you.
### !k move [search term] [number?]
Kvasir looks for the first move with a name that matches your search term. Removing spaces in the search term will not cause any problems; "Endure Stress" will return the Endure Harm move, since I've stored the Endure Harm move before the Endure Stress move, but "endurestress" will return Endure Stress. Be sure to be specific for the best results.

The optional argument duplicates the functionality of the basic !k [number] command once the move has been returned.
### !k asset [search term]
Kvasir looks for the first asset with a name that matches your search term. Removing spaces in the search term will not cause any problems; "Young Wyvern" will return the Young Wyvern asset, but that's because it has "Young" in the title. "youngwyvern" will also return the Young Wyvern asset, but you'll be sure that's what you're getting.

## Packages Used
* [Node.js](https://nodejs.org/)
* [discord.js](https://discord.js.org/)
* [Dotenv](https://github.com/motdotla/dotenv)
* [Rando.js](https://randojs.com/)

## Licenses
This work is based on [Ironsworn](ironswornrpg.com), created by Shawn Tomkin, and licensed for our use under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International license](creativecommons.org/licenses/by-nc-sa/4.0/).