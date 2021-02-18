class InfectedUnit {
    constructor(game, x, y, path) {
        Object.assign(this, { game, x, y, path });

        this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;
        this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;

        for (var i = 0; i < this.path.length; i++) {
            this.path[i] = { x: this.path[i].x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2, y: this.path[i].y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2 };
        }

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/infected_unit.png");

        this.radius = 10;
        this.visualRadius = 200;

        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];         // if path is defined, set it as the target point

        // Calculating the velocity
        var dist = distance(this, this.target);
        this.maxSpeed = 25; // pixels per second
        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

        this.state = 0; // 0 walking, 1 attacking, 2 dead, 3 idel
        this.facing = 0; // 0 E, 1 NE, 2 N, 3 NW, 4 W, 5 SW, 6 S, 7 SE
        this.elapsedTime = 0;

        this.hitpoints = 100;

        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        var spriteInfo = {};

        //0 = attack animations
        this.animations.push([]);
        spriteInfo = {
            'state': 0,
            'xStart': 0,
            'width': 128,
            'height': 80,
            'frames': 12,
            'speed': .05,
            'padding': 0
        };
        //0 = EAST
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1387, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1290, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1193, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1096, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 999, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 902, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 805, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1484, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //1 = attack animations
        this.animations.push([]);
        spriteInfo = {
            'state': 1,
            'xStart': 0,
            'width': 128,
            'height': 80,
            'frames': 12,
            'speed': .05,
            'padding': 0
        };
        //0 = EAST
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 605, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 508, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 411, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 314, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 217, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 120, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 23, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 702, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //2 = death animations
        this.animations.push([]);
        spriteInfo = {
            'state': 2,
            'xStart': 1537,
            'width': 128,
            'height': 80,
            'frames': 12,
            'speed': .05,
            'padding': 0
        };
        //0 = EAST
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 605, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 508, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 411, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 314, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 217, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 120, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 23, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 702, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //3 = idle animations
        this.animations.push([]);
        spriteInfo = {
            'state': 3,
            'xStart': 3073,
            'width': 128,
            'height': 80,
            'frames': 11,
            'speed': .05,
            'padding': 0
        };
        //0 = EAST
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1387, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1290, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1193, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1096, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 999, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 902, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 805, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1484, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    }

    update() {
        this.elapsedTime += this.game.clockTick;
        var dist = distance(this, this.target);
        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
        
        if (this.hitpoints <= 0) this.removeFromWorld = true;

        if (this.target.removeFromWorld) {
            this.state = 0;
            this.target = this.path[this.targetID];
        }

        // If the entity arrived at the target, change to the next target.
        if (dist < 5) {
            // Check if enetity reached the last target, and there is no more target. If so, then state = idle.
            var incrementedTargetID = this.targetID + 1;
            if (this.path[incrementedTargetID] === undefined && this.target === this.path[this.targetID]) {
                this.state = 3;
            }
            // Check if there is another target in the list of path - If not, just stay on the last target. &&
            // Check if the target is not the last point in the path (meaning it was a building) then don't advance to the next point of the path
            if (this.targetID < this.path.length - 1 && this.target === this.path[this.targetID]) {
                this.targetID++;
                this.target = this.path[this.targetID];
            }
        }

        // collision detection
        for (const ent of this.game.entities) {
            if ((ent instanceof Ranger ||  
                ent instanceof Soldier || 
                ent instanceof Sniper || 
                ent instanceof Titan || 
                ent instanceof Ballista ||
                ent instanceof Farm ||
                ent instanceof Cottage ||
                ent instanceof FishermansCottage ||
                ent instanceof Quarry ||
                ent instanceof Sawmill ||
                ent instanceof StoneWall ||
                ent instanceof Tent || 
                ent instanceof WoodWall) && canSee(this, ent)) {
                this.target = ent;
            }
            if ((ent instanceof Ranger ||  ent instanceof Soldier || ent instanceof Sniper || ent instanceof Titan || 
                ent instanceof Ballista) && collide(this, ent)) {
                if (this.state === 0) {
                    this.state = 1;
                    this.elapsedTime = 0;
                } else if (this.elapsedTime > 1.5) {
                    ent.hitpoints -= 15;
                    this.elapsedTime = 0;
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
    };

    drawHealthbar(ctx) {
        // 45
        // 40
        // const posX = this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH);
        // const posY = this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH);

        // ctx.save();

        // ctx.strokeStyle = 'gray';
        // ctx.strokeRect(posX, posY, 100, 15);
        
        // ctx.fillStyle = 'white';
        // ctx.fillRect(posX + 1, posY + 1, 98, 13);

        // ctx.fillStyle = this.hitpoints >= 50 ? 'green' : 'red';
        // ctx.fillRect(posX + 2, posY + 2, 96 * (this.hitpoints / 100), 11);
        
        // ctx.restore();
    };

    draw(ctx) {
        this.xOffset = 32;
        this.yOffset = 20;
        
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, 
            this.x - this.xOffset - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), 
            this.y - this.yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 0.5);

        this.drawHealthbar(ctx);

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
            ctx.fillStyle = "Red";
            ctx.fillRect(mmX + this.x * PARAMS.MINIMAPSCALE, mmY + this.y * PARAMS.MINIMAPSCALE, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
        }
    }
}