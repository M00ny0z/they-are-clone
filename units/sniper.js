class Sniper {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;
        this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/sniper.png");
        this.priority = ALLYUNITPRIORITY;

        this.radius = 10;
        this.visualRadius = 300;

        this.targetID = 0;
        this.target = null;         // if path is defined, set it as the target point

        // Calculating the velocity
        this.maxSpeed = 25; // pixels per second
        this.velocity = 0;

        this.state = 3; // 0 walking, 1 attacking, 2 dead, 3 idel
        this.facing = 0; // 0 E, 1 NE, 2 N, 3 NW, 4 W, 5 SW, 6 S, 7 SE
        this.elapsedTime = 0;

        this.selected = false;

        this.hitpoints = 100;
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        var spriteInfo = {};

        //0 = walk/run animations
        this.animations.push([]);
        spriteInfo = {
            'state': 0,
            'xStart': 0,
            'width': 64,
            'height': 82,
            'frames': 8,
            'speed': 0.1,
            'padding': 0
        };
        //0 = E
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4145, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3980, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3815, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3650, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3485, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3323, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3158, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4305, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //1 = attack animations
        this.animations.push([]);
        spriteInfo = {
            'state': 1,
            'xStart': 0,
            'width': 76,
            'height': 87,
            'frames': 20,
            'speed': .15,
            'padding': 0
        };
        //0 = E
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 5734, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 5471, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 5298, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 5125, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4955, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4785, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4613, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 5819, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //2 = death animations
        this.animations.push([]);
        spriteInfo = {
            'state': 2,
            'xStart': 1525,
            'width': 76,
            'height': 87,
            'frames': 5,
            'speed': 0.1,
            'padding': 0
        };
        //0 = E
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 5730, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 5474, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 5305, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 5125, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4955, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4785, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4613, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 5815, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //3 = idle animations
        this.animations.push([]);
        spriteInfo = {
            'state': 3,
            'xStart': 0,
            'width': 60,
            'height': 78,
            'frames': 16,
            'speed': 0.1,
            'padding': 0
        };
        //0 = E
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 979, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 817, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 657, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 494, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 332, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 172, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 14, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1136, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    }

    update() {
        if(this.target != null) {
            this.elapsedTime += this.game.clockTick;
            var dist = distance(this, this.target);
            this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
            
            if (this.hitpoints <= 0) this.removeFromWorld = true;

            if (this.target.removeFromWorld) {
                this.state = 0;
            }

            // If the entity arrived at the target, change to the next target.
            if (dist < 5) {
                this.state = 3;
            }

            // collision detection
            for (var i = 0; i < NUMBEROFPRIORITYLEVELS; i++) {
                for (var j = 0; j < this.game.entities[i].length; j++) {
                    var ent = this.game.entities[i][j];
                    if ((ent instanceof InfectedUnit || ent instanceof InfectedHarpy || ent instanceof InfectedVenom || ent instanceof InfectedChubby) && canSee(this,ent)) {
                        if (this.state === 0) {
                            this.target = ent;
                            this.state = 1;
                            this.elapsedTime = 0;
                        } else if (this.elapsedTime > 3) {
                            this.game.addEntity(new SniperArrow(this.game, this.x, this.y, ent, true));
                            this.elapsedTime = 0;
                        }
                    }
                }
            }

            if (this.state == 0) {   // only moves when it is in walking state
                dist = distance(this, this.target);
                // Continually updating velocity towards the target. As long as the entity haven't reached the target, it will just keep updating and having the same velocity.
                // If reached to the target, new velocity will be calculated.
                this.x += this.velocity.x * this.game.clockTick;
                this.y += this.velocity.y * this.game.clockTick;
            }

            this.facing = getFacing(this.velocity);
        }
    };

    draw(ctx) {
        var xOffset = 0;
        var yOffset = 0;

        switch(this.state) {
            case 0:
                xOffset = Math.floor(64/2/2);
                yOffset = Math.floor(82/2/2);
                break;
            case 1:
                xOffset = Math.floor(76/2/2);
                yOffset = Math.floor(87/2/2);
                break;
            case 2:
                xOffset = Math.floor(76/2/2);
                yOffset = Math.floor(87/2/2);
                break;
            case 3:
                xOffset = Math.floor(60/2/2);
                yOffset = Math.floor(78/2/2);
                break;
        }

        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - xOffset - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 0.5);

        if (this.hitpoints < MAX_SNIPER_HEALTH) {
            drawHealthbar(ctx, this.hitpoints, this.x, this.y, this.game, MAX_SNIPER_HEALTH);
        }

        if(this.target) {
            ctx.strokeStyle = "Black";
            ctx.beginPath();
            ctx.setLineDash([5, 15]);
            ctx.moveTo(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH));
            ctx.lineTo(this.target.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.target.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH));
            ctx.stroke();
            ctx.setLineDash([]);
        }


        if(this.selected) {
            ctx.strokeStyle = "blue";
            ctx.fillStyle = 'rgba(255,215,0,0.2)';
            ctx.beginPath();
            ctx.arc(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 15, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.stroke();
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), this.visualRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([]);
        }
    };

    drawMinimap(ctx, mmX, mmY) {
        if(this.x >= 0 && this.x <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && this.y >= 0 && this.y <= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
          ctx.fillStyle = "Green";
          ctx.fillRect(mmX + this.x * PARAMS.MINIMAPSCALE, mmY + this.y * PARAMS.MINIMAPSCALE, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
        }
    }
}