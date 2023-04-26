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