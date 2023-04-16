class Pizza extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, track){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.pizzaSpeed;
        this.setTexture(texture, [0]);
        this.available = true;
        this.scene = scene;
        this.track = track;

        this.state = Pizza.Toppings.None;
    }

    static Toppings = {
        None: 0,
        Tomato: 1,
        Cheese: 2,
        Pepperoni: 3,
        Mushroom: 4
    }
    
    update() {
        if (this.available){
            this.x -= this.moveSpeed;
            if(this.x <= 0 - this.width){
                this.#emptyPizza();
                this.x = game.config.width;
            }
        }
    }

    reset(config = undefined) {
        if (config == undefined){
            this.track.flip();
            let temp = this.x + game.config.width/2;
            config = {
                targets: this,
                x: temp,
                duration: 1000,
                repeat: 0,
                hold: 0,
                ease: 'linear',
                onComplete: ()=>{
                    this.available = true;
                    this.track.flip();
                }
            }
        }
        this.scene.tweens.add(config);
    }

    addTopping(toppin){   
        switch(this.state){
            case Pizza.Toppings.None:
                if (toppin == Pizza.Toppings.Tomato){
                    return this.#changeTopping(toppin);
                }
                break;
            case Pizza.Toppings.Tomato:
                if (toppin == Pizza.Toppings.Cheese){
                    return this.#changeTopping(toppin);
                }
                break;
            case Pizza.Toppings.Cheese:
                if (toppin == Pizza.Toppings.Mushroom || toppin == Pizza.Toppings.Pepperoni){
                    return this.#changeTopping(toppin);
                }
                break;
        }
        console.log(toppin, this.state);
        return false;
    }

    #changeTopping(toppin){
        this.available = false;
        this.state = toppin;
        this.setFrame(toppin);
        return true;
    }

    #emptyPizza(){
        this.state = Pizza.Toppings.None;
        this.setFrame(Pizza.Toppings.None);
    }
}