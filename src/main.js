/*
* Code by Travis Carlen, heavily modified from Rocket Patrol tutorial provided by Nathan Altice
*
* Pizza Patrol - The Rocket Patrol Game
*
* ~ 18 Hours Total Project time
* 
*
* (10) 4 New Visual "Explosions": Instead of being randomized, they are implemented via the different toppings 
*        (technically random implementation is identical, just using a random number 1-4)
* (10) New Title Screen: With reformatted explanation text placed under "help"
* (15) Custom Mod (Topping System): The "rocket" has cycle-able tags that must be applied in order to hit the ships in various states
* (5) Scrolling tile: A new scrolling tile (the conveyor belts) have been added
* (5) Background Music
* (5) Increase of speed at 30 seconds (Additional swap of bgm)
* (5) Player can control rocket after it is fired
*/
let config = {
    type:Phaser.CANVAS,
    width:640,
    height: 480,
    scene:[Menu, Play]
}

let game = new Phaser.Game(config);

let keyF, keyR, keyQ, keyE, keyLEFT, keyRIGHT, keyLEFTa, keyRIGHTa, confirm1, confirm2;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize/3;