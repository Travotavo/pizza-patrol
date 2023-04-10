class Pizza extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.pizzaSpeed;
        this.setTexture(texture, [0]);
        
        this.state = this.Toppings.None;
    }

    Toppings = {
        None: 0,
        Tomato: 1,
        Cheese: 2,
        Pepperoni: 3,
        Mushroom: 4
    }
    
    update() {
        this.x -= this.moveSpeed;

        if(this.x <= 0 - this.width){
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }

    addTopping(toppin){
        console.log(toppin);
        switch(this.state){
            case this.Toppings.None:
                if (toppin == this.Toppings.Tomato){
                    return this.#changeTopping(toppin);
                }
                break;
            case this.Toppings.Cheese:
                if (toppin == this.Toppings.Mushroom || toppin == this.Toppings.Pepperoni){
                    return this.#changeTopping(toppin);
                }
                break;
        } 
        return false;
    }

    #changeTopping(toppin){
        this.state = toppin;
        this.setFrame(toppin);
        return true;
    }
}