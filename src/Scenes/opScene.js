class opScene extends Phaser.Scene {
    constructor() {
        super("opScene");
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("playerWalk1", "man_walk1.png");
        this.load.image("playerWalk2", "man_walk2.png");
        this.load.image("angryDuck", "duck_outline_brown.png");
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;


        this.add.text(16, 16, 'Press ESC for Credits', {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#00FFFF'
        });

        // title
        this.titleHunt = this.add.text(centerX - 250, centerY - 190, 'Hunt', {
            fontFamily: 'Impact, Arial Black, sans-serif',
            fontSize: '144px',
            color: '#A0522D', 
            align: 'center'
        });
        this.titleDuck = this.add.text(centerX + 0, centerY - 60, 'Duck', {
            fontFamily: 'Impact, Arial Black, sans-serif',
            fontSize: '144px',
            color: '#DAA520', 
            align: 'center'
        });

        // hunter animation
        this.hunterFrames = ["playerWalk1", "playerWalk2"];
        this.hunterFrameIndex = 0;
        this.hunter = this.add.sprite(centerX - 100, centerY - 190, this.hunterFrames[0]);
        this.hunter.setScale(5);
        this.hunterMovingRight = true;

        // duck animation
        this.duck = this.add.sprite(centerX + 170, centerY - 45, "angryDuck");
        this.duck.setScale(0.5);
        this.duck.setFlipX(false); 
        this.duckMovingRight = false;

        // anime timers
        this.walkTimer = this.time.addEvent({
            delay: 300,
            loop: true,
            callback: () => {
                this.hunterFrameIndex = (this.hunterFrameIndex + 1) % this.hunterFrames.length;
                this.hunter.setTexture(this.hunterFrames[this.hunterFrameIndex]);
            }
        });

        // hunter
        let hunterSpeed = Phaser.Math.Between(2000, 4000); 
        this.tweens.add({
            targets: this.hunter,
            x: this.hunter.x + 50,
            duration: hunterSpeed / 2,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // duck
        let duckSpeed = Phaser.Math.Between(1500, 3500); 
        this.tweens.add({
            targets: this.duck,
            x: this.duck.x - 50,
            duration: duckSpeed / 2,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        // start game
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start("playScene1");
        });

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start("creditsScene");
        });

        // "start" text
        this.add.text(centerX, centerY + 300, 'Press SPACE to Start', {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#ffffff'
        }).setOrigin(0.5);
    }
}
