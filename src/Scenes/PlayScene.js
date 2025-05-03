//

class playScene1 extends Phaser.Scene {
    constructor() {
        super("playScene1");
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
        this.load.image("player", "man.png");
        this.load.image("playerWalk2", "man_walk2.png");
        this.load.image("playerWalk1", "man_walk1.png");
        this.load.image("playerShoot", "man_point.png");
        //duck
        this.load.image("wallDuck", "duck_yellow.png");
        this.load.image("angryDuck", "duck_outline_brown.png");
        //bullet
        this.load.image("bullet", "icon_bullet_gold_short.png");
        this.load.image("bulletDuck", "icon_bullet_silver_long.png");
    }

    create() {
        let my = this.my;

        my.sprite.player = this.add.sprite(50, 384, "player");
        my.sprite.player.setScale(5);

        my.group.bullets = this.add.group();

        this.keys = this.input.keyboard.addKeys({
            up: 'W',
            down: 'S',
            shoot: 'space'
        });

        this.walkToggle = false;
        this.lastWalkTime = 0;
        this.walkInterval = 200;
        this.shootDuration = 200; 
        this.shooting = false;
        this.shootEndTime = 0;


    }

    update(time, delta) {
        let my = this.my;

        if (this.keys.up.isDown && my.sprite.player.y >= 50 ) {
            my.sprite.player.y -= 15;
            
        } else if (this.keys.down.isDown && my.sprite.player.y <= 718) {
            my.sprite.player.y += 15;
        }
        //walk anime change
        if ((this.keys.up.isDown || this.keys.down.isDown) && time > this.lastWalkTime + this.walkInterval) {
            this.walkToggle = !this.walkToggle;
            my.sprite.player.setTexture(this.walkToggle ? "playerWalk1" : "playerWalk2");
            this.lastWalkTime = time;
        }
        //shoot
        if (this.keys.shoot.isDown && time > this.lastFired + this.fireRate) {
            this.lastFired = time;
            this.shooting = true;
            this.shootEndTime = time + this.shootDuration;
            //shoot anime
            my.sprite.player.setTexture("playerShoot");
            //bullet shoot
            let bullet = this.add.sprite(
                my.sprite.player.x + 50,
                my.sprite.player.y,
                "bullet"
            );
            bullet.setAngle(90);
            bullet.setScale(0.5); 
            my.group.bullets.add(bullet);
        }

        my.group.bullets.getChildren().forEach(bullet => {
            bullet.x += 10;
            if (bullet.x > 1024 + bullet.width) {
                my.group.bullets.remove(bullet, true, true);
            }
        });
        //shoot anime change back to normal anime
        if (this.shooting && time > this.shootEndTime) {
            my.sprite.player.setTexture("player");
            this.shooting = false;
        }
    }


}