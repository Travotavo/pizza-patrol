class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.spritesheet('rocket', './assets/objects/toppings.png', {frameWidth: 32, frameHeight: 16, startFrame: 0, endFrame: 3});
        this.load.image('pizza', './assets/objects/blank-pizza.png');
        this.load.image('tomato', './assets/objects/placed-topping1.png');
        this.load.image('cheese', './assets/objects/placed-topping2.png');
        this.load.image('pepperoni', './assets/objects/placed-topping3.png');
        this.load.image('mushroom', './assets/objects/placed-topping4.png');
        this.load.image('starfield', './assets/space.png');
        this.load.image('belt', './assets/set/conveyor.png');
        this.load.spritesheet('explosion', './assets/animations/tomato-splat.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 13});
    }

    create(){
        //space tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);

        //Conveyors
        this.conveyors = [
            new Belt(this, borderUISize*4),
            new Belt(this, borderUISize*5 + borderPadding*2),
            new Belt(this, borderUISize*6 + borderPadding*4)
        ];
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        this.pizza01 = new Pizza(this, game.config.width + borderUISize*6, borderUISize*4, 'pizza', 0, 30, this.conveyors[0])//.setOrigin(0, 0);
        this.pizza02 = new Pizza(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'pizza', 0, 20, this.conveyors[1])//.setOrigin(0,0);
        this.pizza03 = new Pizza(this, game.config.width, borderUISize*6 + borderPadding*4, 'pizza', 0, 10, this.conveyors[2])//.setOrigin(0,0);
        
        this.livingShips = [this.pizza01, this.pizza02, this.pizza03];

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion',  {start: 0, end: 13, first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3b141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth:100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        this.gameOver = false;

        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart ← or for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update(){
        for (let i of this.conveyors){
            i.update();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play('sfx_select');
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if (!this.gameOver){
            this.p1Rocket.update();
        }

        for (let i of this.livingShips){
            if (!this.gameOver){
                i.update();
            }
            if(this.checkCollision(this.p1Rocket, i)) {
                this.p1Rocket.reset();
                this.pizzaSpread(i, this.p1Rocket.getTopping());
            }
        }
    }

    checkCollision(rocket, pizza) {
        // simple AABB checking
        if (!pizza.available){
            return false;
        }
        if (rocket.x < pizza.x + pizza.hitboxWidth && 
          rocket.x + rocket.width > pizza.x && 
          rocket.y < pizza.y + pizza.hitboxHeight &&
          rocket.height + rocket.y > pizza. y) {
          return true;
        } else {
          return false;
        }
    }

    pizzaSpread(pizza, toppin = 1){
        if (pizza.checkTopping(toppin)){
            let boom = this.add.sprite(pizza.x, pizza.y, 'explosion').setOrigin(0, 0.5);
            boom.anims.play('explode');
            boom.on('animationcomplete', () => {
                pizza.spreadTopping(toppin);
                pizza.reset();
                boom.destroy();
            });
            this.p1Score += pizza.points;
            this.scoreLeft.text = this.p1Score;
            this.sound.play('sfx_explosion');
        }
    }
}