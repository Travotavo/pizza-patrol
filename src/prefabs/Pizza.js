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
        this.toppingList = [];
    }

    static Toppings = {
        None: 0,
        Tomato: 1,
        Cheese: 2,
        Pepperoni: 3,
        Mushroom: 4
    }
    
    update(delta) {
        if (this.available){
            this.x -= this.moveSpeed * (delta/10);
            if(this.x <= 0 - this.width){
                this.#emptyPizza();
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
            this.track.pause();
            this.track.flip();
            let temp = this.x + game.config.width/2;
            if(temp > game.config.width){
                temp = game.config.width;
            }
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

    checkTopping(toppin){
        //Prettier than the if, if, else ladder
        switch (this.toppingList.length){
            case 0: // If blank, must use tomato
                if (toppin == Pizza.Toppings.Tomato){
                    this.available = false;
                    return true;
                }
                return false;
            case 1: // First ingredient must be tomato, then cheese
                if (toppin == Pizza.Toppings.Cheese){
                    this.available = false;
                    return true;
                }
                return false;
            default: //Any other ingredients can be stacked onto the pizza after tomato and cheese
                if (this.toppingList.includes(toppin)){
                    return false;
                }
                this.available = false;
                return true;
        }
    }

    //Obsolete topping check system
    /*addTopping(toppin){   
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
    }*/

    spreadTopping(toppin){
        this.toppingList.push(toppin);
        this.components[toppin].setVisible(true);
    }

    #emptyPizza(){
        this.toppingList = [];
        for (let i of this.components){
            i.setVisible(false);
        }
    }
}