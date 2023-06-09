class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('floor', './assets/set/floor.png');
        this.load.image('counter', './assets/set/counter-bottom.png');
        this.load.image('counter-top', './assets/set/counter-top.png');
        this.load.spritesheet('rocket', './assets/objects/toppings.png', {frameWidth: 32, frameHeight: 16, startFrame: 0, endFrame: 3});
        this.load.image('pizza', './assets/objects/blank-pizza.png');
        this.load.image('tomato', './assets/objects/placed-topping1.png');
        this.load.image('cheese', './assets/objects/placed-topping2.png');
        this.load.image('pepperoni', './assets/objects/placed-topping3.png');
        this.load.image('mushroom', './assets/objects/placed-topping4.png');
        this.load.image('passerbys', './assets/set/people-1.png');
        this.load.image('passer-passerbys', './assets/set/people-2.png');
        this.load.image('belt', './assets/set/conveyor.png');
        this.load.spritesheet('explosion-1', './assets/animations/tomato-splat.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 13});
        this.load.spritesheet('explosion-2', './assets/animations/cheese-grate.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 13});
        this.load.spritesheet('explosion-3', './assets/animations/pepperoni-laying.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 11});
        this.load.spritesheet('explosion-4', './assets/animations/mushroom-slice.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 13});
    }

    init(data){
        this.carryOver = data.carryOver
    }

    create(){
        this.bgm = this.sound.add('game_bgm', {loop: true});
        this.bgm.play();


        //Set pieces
        this.add.sprite(0, game.config.height, 'floor').setOrigin(0, 1);

        this.parallax2 = this.add.tileSprite(0, borderUISize + borderPadding, 640, 63, 'passer-passerbys').setOrigin(0,0);
        this.parallax1 = this.add.tileSprite(0, borderUISize + borderPadding * 2, 640, 63, 'passerbys').setOrigin(0,0);
        //Conveyors
        let belt1 = new Belt(this, borderUISize*3 + borderPadding*2);
        this.add.sprite(0, borderUISize*3 + borderPadding*2 + 32, 'counter').setOrigin(0, 0);
        this.add.sprite(0, borderUISize*3 + borderPadding*2 + 1, 'counter-top').setOrigin(0, 1);
        
        
        let belt2 = new Belt(this, borderUISize*5 + borderPadding*4);
        let counter2 = this.add.tileSprite(0, borderUISize*5 + borderPadding*4 + 32, 640, 63, 'counter').setOrigin(0,0);
        counter2.tilePositionX = 64;
        this.add.sprite(0, borderUISize*5 + borderPadding*4 + 1, 'counter-top').setOrigin(0, 1);
        
        
        let belt3 = new Belt(this, borderUISize*7 + borderPadding*6);
        let counter3 = this.add.tileSprite(0, borderUISize*7 + borderPadding*6 + 32, 640, 63, 'counter').setOrigin(0,0);
        counter3.tilePositionX = 128;
        this.add.sprite(0, borderUISize*7 + borderPadding*6 + 1, 'counter-top').setOrigin(0, 1);

        this.conveyors = [
            belt1,
            belt2,
            belt3
        ];
        

        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        this.pizza01 = new Pizza(this, game.config.width + borderUISize*6, borderUISize*3 + borderPadding*2, 'pizza', 0, 30, this.conveyors[0])//.setOrigin(0, 0);
        this.pizza02 = new Pizza(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*4, 'pizza', 0, 20, this.conveyors[1])//.setOrigin(0,0);
        this.pizza03 = new Pizza(this, game.config.width, borderUISize*7 + borderPadding*6, 'pizza', 0, 10, this.conveyors[2])//.setOrigin(0,0);
        
        this.livingShips = [this.pizza01, this.pizza02, this.pizza03];

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        confirm1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.anims.create({
            key: 'explode-1',
            frames: this.anims.generateFrameNumbers('explosion-1',  {start: 0, end: 13, first: 0}),
            frameRate: 24
        });
        this.anims.create({
            key: 'explode-2',
            frames: this.anims.generateFrameNumbers('explosion-2',  {start: 0, end: 13, first: 0}),
            frameRate: 24
        });
        this.anims.create({
            key: 'explode-3',
            frames: this.anims.generateFrameNumbers('explosion-3',  {start: 0, end: 11, first: 0}),
            frameRate: 24
        });
        this.anims.create({
            key: 'explode-4',
            frames: this.anims.generateFrameNumbers('explosion-4',  {start: 0, end: 13, first: 0}),
            frameRate: 24
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

        // green UI background
        this.add.rectangle(0, 0, borderUISize + borderPadding * 2, game.config.height, 0x000000).setOrigin(0, 0);
        // white borders

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderPadding, this.p1Score, scoreConfig);
        
        
        
        

        this.gameOver = false;
        this.badpractice = 1;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            for (let i of this.conveyors){
                i.pause();
            }

            this.bgm.stop();
            this.bgm.destroy();
            
            //Place tween here for game over/pass to player 2 screen
            let fade = this.add.rectangle(0, 0, game.config.width, game.config.height, 0x000000).setOrigin(0, 0);
            fade.alpha = 0;
            this.gameOver = true;

            let fadeConfig = {
                targets: fade,
                alpha: 1,
                duration: 500,
                repeat: 0,
                hold: 0,
                ease: 'linear',
                onComplete: ()=>{
                    if (game.settings.players == 2){
                        if (this.carryOver == null){
                            this.scene.start("passScene", {carryOver: this.p1Score});
                        }
                        else{
                            this.scene.start("scoreScene", {carryOver: this.carryOver, carryOver2: this.p1Score});
                        }
                    }
                    else{
                        this.scene.start("scoreScene", {carryOver: this.p1Score});
                    }
                }
            }
            this.tweens.add(fadeConfig);
        }, null, this);

        this.hurry_up = this.time.delayedCall(30000, () => {
            this.bgm.stop();
            this.bgm = this.sound.add('hurry_bgm', {loop: true});
            this.badpractice = 1.5;
            this.bgm.play();
        }, null, this);
        console.log(this.clock);
        this.timeLeft = this.add.text(borderUISize + borderPadding, borderUISize * 2, this.clock.getOverallRemaining()/1000, scoreConfig);
    }

    update(time, delta){
        this.parallax2.tilePositionX = this.p1Rocket.x/30;
        this.parallax1.tilePositionX = this.p1Rocket.x/10;
        this.timeLeft.text = Math.trunc(this.clock.getOverallRemaining()/1000);

        delta = delta * this.badpractice;
        for (let i of this.conveyors){
            i.update(delta);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play('sfx_select');
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(confirm1)) {
            this.scene.start("menuScene");
        }

        if (!this.gameOver){
            this.p1Rocket.update(delta);
        }

        for (let i of this.livingShips){
            if (!this.gameOver){
                i.update(delta);
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
            pizza.track.pause();
            let boom = this.add.sprite(pizza.x, pizza.y, 'explosion-' + toppin).setOrigin(0, 0.5);
            boom.anims.play('explode-' + toppin);
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