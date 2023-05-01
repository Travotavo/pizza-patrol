class Score extends Phaser.Scene {
    constructor(){
        super("scoreScene");
    }
    
    init(data){
        this.p1score = data.carryOver
        this.p2score = data.carryOver2
    }

    create(){
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        confirm1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
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
        
        if (this.p2score != null){
            this.add.text(game.config.width/2, game.config.height/2 - 160, 'P1 Score: ' + this.p1score, scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 - 96, 'P2 Score: ' + this.p2score, scoreConfig).setOrigin(0.5);
        }
        else {
            //1 player score text
            this.add.text(game.config.width/2, game.config.height/2 - 128, 'Score: ' + this.p1score, scoreConfig).setOrigin(0.5);
        }
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 128, 'Or (SPACE) for Menu', scoreConfig).setOrigin(0.5);
        
        // menu or restart text
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            game.settings.p1score = null;
            game.settings.p2score = null;
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(confirm1)) {
            game.settings.p1score = null;
            game.settings.p2score = null;
            this.scene.start("menuScene");
        }
    }
}