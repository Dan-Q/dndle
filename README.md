# DNDle

A [Wordle](https://www.nytimes.com/games/wordle)-clone with a [Dungeons & Dragons](https://dnd.wizards.com/) (5e) theme. Guess the "monster of the day" by either entering values for the six characteristics (STR, DEX, CON, INT, WIS, CHA) or by choosing a monster from the Monster Manual. You'll be told which values were correct (green = right value, right characteristic), present (yellow = right value, wrong characteristic), or absent (grey = wrong value). You have eight guesses to find the monster. A new monster appears every 24 hours.

Originally thrown together over a weekend. Apologies for some of the more-apalling bits of code.

## Play online

https://dndle.app/

## Building/developing

You'll need Node & NPM. Install dependencies:

`npm i`

Build JS:

`npm start`

Fire up your favourite development webserver so you can view `public/index.html` in your browser.

## License

Copyright (c) [Dan Q](https://danq.me/) 2022. Source code released under the MIT license.

Dungeons & Dragons is a trademark of Wizards of the Coast LLC, who are not affiliated with this project.

Uses the [Reef](https://reefjs.com/) framework, under the MIT license.

