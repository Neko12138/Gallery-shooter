class gameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }

    init(data) {
        this.score = data.score || 0;
    }

    preload() {
        this.load.audio('end', 'assets/end.mp3');
    }

    create() {

        this.endMusic = this.sound.add('end');
        this.endMusic.play();

        this.add.text(300, 200, "GAME OVER", {
            fontSize: '64px',
            fill: '#f00',
            fontFamily: 'Arial'
        });

        this.add.text(390, 300, `Final Score: ${this.score}`, {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial'
        });

        this.add.text(360, 450, "Press SPACE to restart", {
            fontSize: '28px',
            fill: '#FFD700',
            fontFamily: 'Arial'
        });

        this.keys = this.input.keyboard.addKeys({
            restart: 'SPACE'
        });

        this.events.once('shutdown', () => {
            if (this.endMusic && this.endMusic.isPlaying) {
                this.endMusic.stop();
            }
        });

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.restart)) {
            this.scene.start("playScene1", {
                score: 0,
                hp: 5,
                wave: 1
            });
        }
    }
}