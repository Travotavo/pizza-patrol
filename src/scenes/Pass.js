class Pass extends Phaser.Scene {
    constructor(){
        super("passScene");
    }
    
    init(data){
        this.carryOver = data.carryOver
    }

    create(){
        confirm1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //Say it's player 2's turn

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            }
        }

        this.add.text(game.config.width/2, game.config.height/2 - 64, 'P1 TURN OVER', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'P2 ASSUME THE STATION', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (SPACE) when ready', scoreConfig).setOrigin(0.5);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(confirm1)) {
            this.scene.start("playScene", {carryOver: this.carryOver});
        }
    }
}