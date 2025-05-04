//

class playScene1 extends Phaser.Scene {
    constructor() {
        super("playScene1");
        this.my = { sprite: {}, group: { bullets: null, ducks: null } };  // Create an object to hold sprite bindings

        // Create variables to hold constant values for sprite locations
        this.bodyX = 400;
        this.bodyY = 550;

        //sc & hp (HUD)
        this.score = 0;
        this.hp = 5;
        
        
        //intake num
        this.lastFired = 0; 
        this.fireRate = 500; //unit === ms
        this.allAngryDucksCleared = false;

    }
    //AAAAAAAAABBBBBBBBBBB
    isAABBIntersecting(a, b) {
        return (
            Math.abs(a.x - b.x) < (a.displayWidth / 2 + b.displayWidth / 2) &&
            Math.abs(a.y - b.y) < (a.displayHeight / 2 + b.displayHeight / 2)
        );
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
        //player
        my.sprite.player = this.add.sprite(50, 384, "player");
        my.sprite.player.setScale(5);
        //bullet
        my.group.bullets = this.add.group();
        //duck
        my.group.ducks = this.add.group();
        // wall ducks
        my.group.wallDucks = this.add.group();    
     

        this.keys = this.input.keyboard.addKeys({
            up: 'W',
            down: 'S',
            shoot: 'space'
        });

        //real creat duck group
        my.group.ducks = this.add.group();

        const duckSpacing = 120;  //duck space
        for (let i = 0; i < 5; i++) {
            let duck = this.add.sprite(
                950,
                100 + i * duckSpacing,
                "angryDuck"
            );
            duck.setScale(0.5);
            duck.setFlipX(true);
            duck.direction = 1; // move down
            my.group.ducks.add(duck);
        }

        // Create wall ducks 
        const wallDuckSpacing = 110;
        for (let i = 0; i < 7; i++) {
            let wallDuck = this.add.sprite(
                850,  // placing them to the left of the angry ducks
                50 + i * wallDuckSpacing,
                "wallDuck"
            );
            wallDuck.setScale(0.7);
            wallDuck.setFlipX(true);
            //duck rush?
            wallDuck.isMoving = false; 
            my.group.wallDucks.add(wallDuck);  // add to the wallDucks group
        }
        //HUD create
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial'
        });
        
        this.hpText = this.add.text(16, 56, 'HP: 5', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial'
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
        //duck move
        my.group.ducks.getChildren().forEach(duck => {
            duck.y += duck.direction * 6;
        
            // touch edge
            if (duck.y <= duck.displayHeight / 2 || duck.y >= 768 - duck.displayHeight / 2) {
                duck.direction *= -1;
            }
        });
        
        // coll detect of angryduck
        let ducks = my.group.ducks.getChildren();
        for (let i = 0; i < ducks.length; i++) {
            for (let j = i + 1; j < ducks.length; j++) {
                if (this.isAABBIntersecting(ducks[i], ducks[j])) {
                    ducks[i].direction *= -1;
                    ducks[j].direction *= -1;
                }
            }
        }
        //player movement
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

        // check bullet and angryDuck collisions
        my.group.bullets.getChildren().forEach(bullet => {
            my.group.ducks.getChildren().forEach(duck => {
                if (this.isAABBIntersecting(bullet, duck)) {
                    // remove angry duck & bullet
                    my.group.bullets.remove(bullet, true, true);
                    my.group.ducks.remove(duck, true, true);
                    this.score += 150;
                    this.scoreText.setText('Score: ' + this.score);
                }
            });
        });
        // check bullet and wallDuck collisions
        my.group.bullets.getChildren().forEach(bullet => {
            my.group.wallDucks.getChildren().forEach(wallDuck => {
                if (this.isAABBIntersecting(bullet, wallDuck)) {
                    my.group.bullets.remove(bullet, true, true);
        
                    if (wallDuck.isMoving) {
                        this.score += 200;  //shoot when move
                    } else {
                        this.score += 100;  // shoot when protec
                    }
                    this.scoreText.setText('Score: ' + this.score);
                    my.group.wallDucks.remove(wallDuck, true, true);
                }
            });
        });
        //duck die!!!
        if (!this.allAngryDucksCleared && my.group.ducks.getLength() === 0) {
            this.allAngryDucksCleared = true;
        
            my.group.wallDucks.getChildren().forEach(wallDuck => {
                wallDuck.isMoving = true;
                wallDuck.setVelocityX = -5;  
            });
        }
        //duck rush!!!
        my.group.wallDucks.getChildren().forEach(wallDuck => {
            if (wallDuck.isMoving) {
                wallDuck.x -= 15;
        
                // hit player
                if (this.isAABBIntersecting(wallDuck, my.sprite.player)) {
                    this.hp -= 2;
                    this.hpText.setText('HP: ' + this.hp);
                    my.group.wallDucks.remove(wallDuck, true, true);
                }
        
                // hit the wall
                else if (wallDuck.x < 0) {
                    this.score -= 150;
                    this.scoreText.setText('Score: ' + this.score);
                    my.group.wallDucks.remove(wallDuck, true, true);
                }
            }
        });

        if (
            this.allAngryDucksCleared &&
            my.group.wallDucks.getLength() === 0
        ) {
            // 进入总结场景
            this.scene.start("transitScene", {
                wave: this.wave || 1,
                score: this.score,
                hp: this.hp
            });
        }


    }


}