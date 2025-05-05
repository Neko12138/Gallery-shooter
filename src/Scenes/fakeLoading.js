class fakeLoading extends Phaser.Scene {
    constructor() {
        super("fakeLoading");
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("playerWalk1", "man_walk1.png");
        this.load.image("playerWalk2", "man_walk2.png");


    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // control
        this.add.text(centerX, centerY - 200, 'W and S to move up and down, SPACE to shoot', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // create anime
        this.hunterFrames = ["playerWalk1", "playerWalk2"];
        this.hunterFrameIndex = 0;
        this.hunter = this.add.sprite(centerX, centerY, this.hunterFrames[0]);
        this.hunter.setScale(6);

        // "Loading。。。"
        this.loadingText = this.add.text(centerX, centerY + 100, 'Loading...', {
            fontFamily: 'Arial',
            fontSize: '48px',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // player anime timer
        this.walkTimer = this.time.addEvent({
            delay: 300,
            loop: true,
            callback: () => {
                this.hunterFrameIndex = (this.hunterFrameIndex + 1) % this.hunterFrames.length;
                this.hunter.setTexture(this.hunterFrames[this.hunterFrameIndex]);
            }
        });

        // flash loading
        this.tweens.add({
            targets: this.loadingText,
            alpha: { from: 1, to: 0 },
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        // 4s delay
        this.time.delayedCall(4000, () => {
            // change text and keep color
            this.loadingText.setText('Press SPACE to continue');
            this.tweens.killTweensOf(this.loadingText); 

        });

        // enter playScene1
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start("playScene1");
        });
        //TIPS
        const tips = [
            "Did you know that this game was inspired by the 1984 game Duck Hunt?",
            "Energy conservation! After all the angry ducks are dead, the wall ducks will rush towards you!",
            "Angry Duck's bullets will reduce your HP by 1, but Wall Duck is tougher and will reduce your HP by 2.",
            "Don't try to find the good ending of this game, the waves are infinite.",
            "If you are reading this, that means you are reading this.",
            "Don't worry, time is not an issue. It will not lower or raise your score.",
            "Actually, you know that this loading page actually loads nothing, right?",
            "Never plan to go to bed after winning one more wave. This is what I thought when I played Civilization VI.",
            "The creator is Wade Xu, a UCSC student, and his email is wxu78@ucsc.edu. But he is a...",
            "This is the last of 10 random tips I was too lazy to think of."
        ];

        // random tips
        const randomTip = Phaser.Math.RND.pick(tips);

        this.add.text(centerX, centerY + 300, `TIPS: ${randomTip}`, {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#FFFFFF'
        }).setOrigin(0.5);
    }
}
