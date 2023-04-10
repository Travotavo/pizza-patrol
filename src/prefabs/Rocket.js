class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 4;
        this.sfxRocket = scene.sound.add('sfx_rocket');

        this.state = 0;
    }

    //There has to be a way to do this that is leagues better, but that's for later!
    Topps = [1,2,3,4];

    update(){
        if (!this.isFiring){
            if(keyLEFT.isDown && this.x >=borderUISize + this.width){
                this.x  -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            } else if (Phaser.Input.Keyboard.JustDown(keyQ)){
                this.#cycleTop(-1);
            } else if (Phaser.Input.Keyboard.JustDown(keyE)){
                this.#cycleTop(1);
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keyF)){
            this.isFiring = true;
            this.sfxRocket.play();
        }

        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed * 2;
        }

        if (this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;

        }
    }

    #cycleTop(direction){
        this.state +=direction;
        if (this.state > this.Topps.length){
            this.state = 0;
        }
        if (this.state < 0){
            this.state = this.Topps.length - 1;
        }
        this.setFrame(this.state);
    }

    getTopping(){
        switch(this.state){
            case 0:
                return Pizza.Toppings.Tomato;
            case 1:
                return Pizza.Toppings.Cheese;
            case 2:
                return Pizza.Toppings.Pepperoni;
            case 3:
                return Pizza.Toppings.Mushroom;
        }
    }

    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}