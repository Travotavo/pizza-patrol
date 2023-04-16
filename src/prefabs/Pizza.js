class Pizza extends Phaser.GameObjects.Container {
    constructor(scene, x, y, texture, frame, pointValue, track){
        super(scene, x, y);
        scene.add.existing(this);
        this.add(scene.add.sprite(0, 0, texture).setOrigin(0,0));
        this.components = [
            scene.add.rectangle(0,0,64,32,0x00FF00).setOrigin(0,0).setVisible(false),
            scene.add.sprite(0,0, 'tomato').setOrigin(0,0).setVisible(false),
            scene.add.sprite(0,0, 'cheese').setOrigin(0,0).setVisible(false),
            scene.add.sprite(0,0, 'pepperoni').setOrigin(0,0).setVisible(false),
            scene.add.sprite(0,0, 'mushroom').setOrigin(0,0).setVisible(false)
        ];
        this.add(this.components);
        this.points = pointValue;
        this.moveSpeed = game.settings.pizzaSpeed;
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
            if(this.x > game.config.width){
                this.x = game.config.width;
            }
        }
    }

    get hitboxWidth(){
        return this.components[0].width;
    }
    get hitboxHeight(){
        return this.components[0].height;
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
        this.components[toppin].setVisible(true);
        return true;
    }

    #emptyPizza(){
        this.state = Pizza.Toppings.None;
        for (let i of this.components){
            i.setVisible(false);
        }
    }
}