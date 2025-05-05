class creditsScene extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {

    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;


        this.add.text(centerX, centerY - 100, 'Engine Framework: Phaser', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY - 50, 'Base Code Created by: Professor Jim Whitehead', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY, 'Art Assets: 2D Kenny Assets', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY + 50, 'Audio Assets: Kenny Audio Assets', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY + 100, 'Music Assets: (Leave Blank)', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY + 150, 'Code Modifications: Wade Xu', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // back opScene
        this.add.text(centerX, centerY + 200, 'Press ESC to Return to Title', {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#00FFFF',
            align: 'center'
        }).setOrigin(0.5);


        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start("opScene");
        });
    }
}
