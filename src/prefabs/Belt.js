class Belt extends Phaser.GameObjects.TileSprite {
    constructor(scene, y, texture = 'belt'){
        super(scene, 0, y + 16, 640, 32, texture);
        scene.add.existing(this);
        this.setOrigin(0, .5);
        this.reverse = false;
    }

    update(){
        this.tilePositionX += 2 * ((this.reverse)?-1:1);
    }

    flip(){
        console.log('Flipped!');
        this.reverse = !this.reverse;
    }
}