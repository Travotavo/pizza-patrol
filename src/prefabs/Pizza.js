class Pizza extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.pizzaSpeed;
        this.setTexture(texture, [0]);
        this.available = true;

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
        this.x -= this.moveSpeed;

        if(this.x <= 0 - this.width){
            this.#changeTopping(Pizza.Toppings.None);
            this.reset()
        }
    }

    reset() {
        this.available = true;
        this.x = game.config.width;
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
}