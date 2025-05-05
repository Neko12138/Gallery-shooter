class transitScene extends Phaser.Scene {
    constructor() {
        super("transitScene");
    }

    init(data) {
        this.wave = data.wave || 1;
        this.score = data.score || 0;
        this.hp = data.hp || 5;
    }

    create() {
        this.add.text(300, 150, `WAVE ${this.wave} COMPLETE`, {
            fontSize: '48px',
            fill: '#fff',
            fontFamily: 'Arial'
        });

        this.add.text(410, 250, `Score: ${this.score}`, {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial'
        });

        this.add.text(450, 300, `HP: ${this.hp}`, {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial'
        });

        this.add.text(300, 450, `Press SPACE to start Wave ${this.wave + 1}`, {
            fontSize: '28px',
            fill: '#FFD700',
            fontFamily: 'Arial'
        });

        this.keys = this.input.keyboard.addKeys({
            start: 'SPACE'
        });
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.start)) {
            this.scene.start("playScene1", {
                wave: this.wave + 1,
                score: this.score,
                hp: this.hp
            });
        }
    }
}
