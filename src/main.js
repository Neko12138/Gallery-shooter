
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1024,
    height: 768,
    fps: { forceSetTimeOut: true, target: 30 },
    scene: [playScene1, transitScene]
}

const game = new Phaser.Game(config);