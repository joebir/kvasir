# Kvasir
A Discord bot for use with the Ironsworn RPG.

Development is ongoing, this version is much more a proof of concept than a fully realized bot. You can add Kvasir to your server using [this](https://discord.com/api/oauth2/authorize?client_id=809058483932495895&permissions=2048&scope=bot) link.

## Commands
### !k [number]
Kvasir rolls your Action Die and Challenge Dice, does some math, then sends a message back. It tags the user who sent the command along with all of the dice results and the outcome of the roll.
### !k oracle
Kvasir rolls a d100 for you.
### !k asset [search term]
Kvasir looks for the first asset with a name that matches your search term. At this time Kvasir doesn't like reading more than one word.

## Packages Used
* [Node.js](https://nodejs.org/)
* [discord.js](https://discord.js.org/)
* [Dotenv](https://github.com/motdotla/dotenv)
* [Rando.js](https://randojs.com/)

## Licenses
This work is based on [Ironsworn](ironswornrpg.com), created by Shawn Tomkin, and licensed for our use under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International license](creativecommons.org/licenses/by-nc-sa/4.0/).
