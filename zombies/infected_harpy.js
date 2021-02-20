class InfectedHarpy {
    constructor(game, x, y, path) {
        Object.assign(this, { game, x, y, path});

        this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;
        this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;

        for (var i = 0; i < this.path.length; i++) {
            this.path[i] = { x: this.path[i].x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2, y: this.path[i].y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2 };
        }

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/infected_harpy.png");
        this.priority = ENEMYUNITPRIORITY;

        this.radius = 10;
        this.visualRadius = 300;

        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];         // if path is defined, set it as the target point

        // Calculating the velocity
        var dist = distance(this, this.target);
        this.maxSpeed = 65; // pixels per second
        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

        this.state = 0; // 0 walking, 1 attacking, 2 dead, 3 idel
        this.facing = 0; // 0 E, 1 NE, 2 N, 3 NW, 4 W, 5 SW, 6 S, 7 SE
        this.elapsedTime = 0;

        this.hitpoints = 50;

        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations(){
        var spriteInfo = {};
        
        //0 = walk/run animations
        this.animations.push([]);
        spriteInfo = {
            'state': 0,
            'xStart': 1,
            'width': 128,
            'height': 95,
            'frames': 8,
            'speed': 0.05,
            'padding': 0
        };
        //0 = E
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4583, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4486, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4389, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4292, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4195, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4097, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4001, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4680, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //1 = attack animations
        this.animations.push([]);
        spriteInfo = {
            'state': 1,
            'xStart': 1,
            'width': 128,
            'height': 95,
            'frames': 12,
            'speed': .1,
            'padding': 0
        };
        //0 = E
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 603, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 506, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 409, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 312, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 215, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 118, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 21, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 700, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //2 = death animations
        this.animations.push([]);
        spriteInfo = {
            'state': 2,
            'xStart': 1,
            'width': 128,
            'height': 95,
            'frames': 24,
            'speed': 0.1,
            'padding': 0
        };
        //0 = E
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1399, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1302, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1205, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1108, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1011, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 914, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 817, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1496, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //3 = idle animations
        this.animations.push([]);
        spriteInfo = {
            'state': 3,
            'xStart': 1,
            'width': 128,
            'height': 95,
            'frames': 13,
            'speed': 0.1,
            'padding': 0
        };
        //0 = E
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2991, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2894, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2797, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2700, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2603, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2506, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2409, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3088, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
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

        //collision detection
        for (var i = 0; i < NUMBEROFPRIORITYLEVELS; i++) {
            for (var j = 0; j < this.game.entities[i].length; j++) {
                var ent = this.game.entities[i][j];
                const enemyCheck = (
                    ent instanceof Ranger ||  
                    ent instanceof Soldier || 
                    ent instanceof Sniper || 
                    ent instanceof Titan || 
                    ent instanceof Ballista ||
                    ent instanceof Farm ||
                    ent instanceof StoneHouse ||
                    ent instanceof FishermansCottage ||
                    ent instanceof Quarry ||
                    ent instanceof Sawmill ||
                    ent instanceof StoneWall ||
                    ent instanceof StoneGateVertical ||
                    ent instanceof StoneGateHorizontal ||
                    ent instanceof ApartmentComplex ||
                    ent instanceof WoodHouse || 
                    ent instanceof WoodGateVertical ||
                    ent instanceof WoodGateHorizontal ||
                    ent instanceof WoodWall ||
                    ent instanceof CommandCenter ||
                    ent instanceof MachineGunTurret
                );
                if (enemyCheck && canSee(this, ent)) {
                    this.target = ent;
                }
                if (enemyCheck && collide(this, ent)) {
                    if (this.state === 0) {
                        this.state = 1;
                        this.elapsedTime = 0;
                    } else if (this.elapsedTime > 0.5) {
                        ent.hitpoints -= 12;
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
    };

    draw(ctx) {
        var xOffset = 33;
        var yOffset = 33;

        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - xOffset - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 0.5);

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