class Belt extends Phaser.GameObjects.TileSprite {
    constructor(scene, y, texture = 'belt'){
        super(scene, 0, y + 16, 640, 32, texture);
        scene.add.existing(this);
        this.setOrigin(0, .5);
        this.reverse = false;
        this.paused = false;
    }

    update(delta){
        if (!this.paused){
            this.tilePositionX += 2 * ((this.reverse)?-1:1) * (delta/10);
        }
    }

    flip(){
        this.reverse = !this.reverse;
    }

    pause(){
        this.paused = !this.paused;
    }
}