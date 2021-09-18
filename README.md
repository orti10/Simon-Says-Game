## Simon Says Game

To read more about the game, Click here - [Simon Game](https://en.wikipedia.org/wiki/Simon_(game))
 
## [I deployed the game on a server - Click Here](https://simongameortal.000webhostapp.com/) 

- Another option is to run the game through a local server, 
Follow these steps to start play:
1. Download & Install - [Node.js](https://nodejs.org/en/download/) 
2. Start your React experience - Open cmd and Run:
```sh
a. npx create-react-app my-simon-game
b. cd my-simon-game
c. git clone https://github.com/orti10/my-simon-game.git
d. npm start
```
Wait while starting the development server and the game will open automatically through a new window in your browser 


# Welcome to the game guide section:
## Basic Game
To start, slide the Off/On button, Now Simon will play random step & sound and you should follow it.
The game will follow your steps and save the highest score you have reached.
If you make a mistake, the current step will be played again and you will be able to correct the mistake.

## Challenge!!!
If you wish to play in a more challenging way - slide the Strict button
Strict Mode - Unlike my basic stage, When you turn on Strict mode, your game will be reset after ONE mistake
and you will have to start all over again.

![simon controller](https://user-images.githubusercontent.com/44768171/133905399-862a611f-f793-4609-b4b6-c1056805e559.png)

## Learning and improving for the future
1. Implement a score table that shows the score of all past participants in the game, which appears in a pop-up window by pressing a button.
*Table Fields: Name, Score, Date(front to local time), Sort by high score*
All the details will be saved using json file as data-base. 
(I know that json file as data-base is not enough in the level of execution but it provides a temporary solution to show ability)
Use Grid table react - So that I do not have to exercise from scratch.

2. The goal was to bring out a product and Implement functionality!
   The next step is to upgrade and add more things and of course complete the required knowledge.
