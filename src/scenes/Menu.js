class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
        this.load.audio('sfx_select', './assets/sounds/select.wav');
        this.load.audio('sfx_explosion', './assets/sounds/delayed_blast.wav');
        this.load.audio('sfx_rocket', './assets/sounds/rocket_shoot.wav');
        this.load.audio('game_bgm', './assets/sounds/pizza_patrol_norm.wav');
        this.load.audio('hurry_bgm', './assets/sounds/pizza_patrol_sped.wav');

        this.load.image('bg', './assets/menu/bg.png');
        this.load.image('help', './assets/menu/help.png');
        this.load.image('cursor', './assets/menu/cursor.png');
        this.load.image('option1', './assets/menu/option1.png');
        this.load.image('option2', './assets/menu/option2.png');
        this.load.image('option3', './assets/menu/option3.png');
      }

    create(){

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3b141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth:0
        }

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFTa = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHTa = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        confirm1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        confirm2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        this.add.sprite(0,0, 'bg').setOrigin(0,0);
        this.options = [
          this.add.sprite(480, 280,'option1').setOrigin(1,1),
          this.add.sprite(580, 300,'option2').setOrigin(1,1),
          this.add.sprite(490, 380,'option3').setOrigin(1,1)
        ];
        this.cursor = this.add.sprite(0,0,'cursor').setOrigin(1, 0.5);
        this.cursor.x = this.options[0].x;
        this.cursor.y = this.options[0].y;
        this.selected = 0;
        this.help = this.add.sprite(0,0, 'help').setOrigin(0,0);
        this.help.visible = false;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(confirm1) || Phaser.Input.Keyboard.JustDown(confirm2) 
              || Phaser.Input.Keyboard.JustDown(keyF)) {
          switch(this.selected){
            case 0:
              game.settings = {
                players: 1,
                pizzaSpeed: 2,
                gameTimer: 60000,
                player1score:null
              }
              this.sound.play('sfx_select');
              this.scene.start('playScene');
              break;
            case 1:
              game.settings = {
                players: 2,
                pizzaSpeed: 2,
                gameTimer: 60000,
                player1score:null,
                player2score:null   
              }
              this.sound.play('sfx_select');
              this.scene.start('playScene');
              break;
            case 2:
              this.help.visible = !this.help.visible;
              break;
          }
        }

        if ((Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyLEFTa)) && this.selected > 0) {
          this.selected -= 1;
          this.cursor.x = this.options[this.selected].x;
          this.cursor.y = this.options[this.selected].y;
        }
        if ((Phaser.Input.Keyboard.JustDown(keyRIGHT) || Phaser.Input.Keyboard.JustDown(keyRIGHTa)) && this.selected < 2) {
          this.selected += 1;
          this.cursor.x = this.options[this.selected].x;
          this.cursor.y = this.options[this.selected].y;
        }
      
      }
}