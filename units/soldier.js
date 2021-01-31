class Soldier {
    constructor(game, x, y, path) {
        Object.assign(this, { game, x, y, path});

        // this.x = x * PARAMS.BLOCKWIDTH - 32;
        // this.y = y * PARAMS.BLOCKWIDTH - 32;
        // for (var i = 0; i < this.path.length; i++) {
        //     this.path[i] = { x: this.path[i].x * PARAMS.BLOCKWIDTH - 32, y: this.path[i].y * PARAMS.BLOCKWIDTH - 32 };
        // }

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/soldier.png");

        this.radius = 50;
        this.visualRadius = 200;

        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];         // if path is defined, set it as the target point

        // Calculating the velocity
        var dist = distance(this, this.target);
        this.maxSpeed = 100; // pixels per second
        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

        this.state = 0; // 0 walking, 1 attacking, 2 dead, 3 idel
        this.facing = 0; // 0 E, 1 NE, 2 N, 3 NW, 4 W, 5 SW, 6 S, 7 SE
        this.elapsedTime = 0;

        this.hitpoints = 100;

        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations(){
        var spriteInfo = {};
        
        //0 = walk/run animations
        this.animations.push([]);
        spriteInfo = {
            'state': 0,
            'xStart': 1587,
            'width': 60,
            'height': 72,
            'frames': 8,
            'speed': 0.1,
            'padding': 0
        };
        //0 = E
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 924, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 772, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 618, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 468, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 244, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 168, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 16, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1154, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //1 = attack animations
        this.animations.push([]);
        spriteInfo = {
            'state': 1,
            'xStart': 0,
            'width': 125,
            'height': 80,
            'frames': 20,
            'speed': .05,
            'padding': 0
        };
        //0 = E
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3370, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3290, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3130, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3052, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2818, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2661, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2502, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3686, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //2 = death animations
        this.animations.push([]);
        spriteInfo = {
            'state': 2,
            'xStart': 2069,
            'width': 66,
            'height': 72,
            'frames': 8,
            'speed': 0.1,
            'padding': 0
        };
        //0 = E
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2118, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1972, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1824, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1679, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1461, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1388, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1242, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2336, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //3 = idle animations
        this.animations.push([]);
        spriteInfo = {
            'state': 3,
            'xStart': 1058,
            'width': 66,
            'height': 72,
            'frames': 8,
            'speed': 0.1,
            'padding': 0
        };
        //0 = E
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 804, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 730, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 588, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 443, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 230, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 82, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 14, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 803, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    }

    update() {
        this.elapsedTime += this.game.clockTick;
        var dist = distance(this, this.target);

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
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if ((ent instanceof InfectedUnit || ent instanceof InfectedHarpy || ent instanceof InfectedVenom || ent instanceof InfectedChubby) && canSee(this,ent)) {
                if (this.state === 0) {
                    this.state = 1;
                    this.target = ent;
                    this.elapsedTime = 0;
                } else if (this.elapsedTime > 0.77) {
                    this.game.addEntity(new SoldierBolt(this.game, this.x, this.y, ent, true));
                    this.elapsedTime = 0;
                }
            }
        }

        if(this.state == 0) {   // only moves when it is in walking state
            dist = distance(this, this.target);
            // Continually updating velocity towards the target. As long as the entity haven't reached the target, it will just keep updating and having the same velocity.
            // If reached to the target, new velocity will be calculated.
            this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
            this.x += this.velocity.x * this.game.clockTick;
            this.y += this.velocity.y * this.game.clockTick;
        }

        //For testing (make animation rotate clockwise)
        // this.velocity = { x: Math.cos(this.elapsedTime), y: Math.sin(this.elapsedTime) };

        this.facing = getFacing(this.velocity);
    };

    draw(ctx) {
        // for (var i = 0; i < 4; i++) {
        //     for (var j = 0; j < this.animations[i].length; j++) {
        //         this.animations[i][j].drawFrame(this.game.clockTick, ctx, this.x + j * 100, this.y + 100 * i, 1)
        //     }
        // }

        var xOffset = 0;
        var yOffset = 0;

        switch(this.state) {
            case 0:
                xOffset = Math.floor(60/2);
                yOffset = Math.floor(72/2);
                break;
            case 1:
                xOffset = Math.floor(125/2);
                yOffset = Math.floor(80/2);
                break;
            case 2:
                xOffset = Math.floor(66/2);
                yOffset = Math.floor(72/2);
                break;
            case 3:
                xOffset = Math.floor(66/2);
                yOffset = Math.floor(72/2);
                break;
        }
        
    
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - xOffset, this.y - yOffset, 1);
    
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.visualRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([]);
        }

    };
}