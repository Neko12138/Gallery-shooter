//

class Movement extends Phaser.Scene {
    constructor() {
        super("PlayScene");
        this.my = { sprite: {}, group: {} };  // Create an object to hold sprite bindings

        // Create variables to hold constant values for sprite locations
        this.bodyX = 400;
        this.bodyY = 550;

        this.lastFired = 0; 
        this.fireRate = 500; //unit === ms

    }

    preload() {
        this.load.setPath("./assets/");
        //body
        this.load.image("player", "character_roundRed.png");
        //bullet
        this.load.image("bullet", "item_arrow.png");
    }

    create() {
        let my = this.my;

        my.sprite.player = this.add.sprite(this.bodyX, this.bodyY, "player");

        my.group.bullets = this.add.group();

        this.keys = this.input.keyboard.addKeys({
            left: 'A',
            right: 'D',
            shoot: 'space'
        });


    }

    update(time, delta) {
        let my = this.my;

        if (this.keys.left.isDown && my.sprite.player.x >= 0 ) {
            my.sprite.player.flipX = true; 
            my.sprite.player.x -= 5;
            
        } else if (this.keys.right.isDown && my.sprite.player.x <= 800) {
            my.sprite.player.flipX = false; 
            my.sprite.player.x += 5;
        }

        if (this.keys.shoot.isDown && time > this.lastFired + this.fireRate) {
            this.lastFired = time;

            let bullet = this.add.sprite(
                my.sprite.player.x,
                my.sprite.player.y - 50,
                "bullet"
            );

            bullet.setAngle(-90);
            my.group.bullets.add(bullet);
        }

        my.group.bullets.getChildren().forEach(bullet => {
            bullet.y -= 10;
            if (bullet.y < -bullet.height) {
                my.group.bullets.remove(bullet, true, true);
            }
        });
    }


}