class SoldierBolt {
    constructor(game, x, y, target, zombieteam, heatSeeking) {
        Object.assign(this, { game, x, y, target, zombieteam, heatSeeking });
        this.radius = 12;
        this.smooth = true;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/soldier_bolt.png");

        var dist = distance(this, this.target);
        this.maxSpeed = 400; // pixels per second

        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

        this.cache = [];

        this.animations = [];
        this.animations.push(new Animator(this.spritesheet, 1, 1165, 95, 95, 1, 1, 0, false, true));
        /*
        var spriteInfo={   'xStart':1, 
                            'width':95, 
                            'height':95, 
                            'frames':1, 
                            'speed':1, 
                            'padding':0 
                        };
        //0 = EAST
        this.animations.push(new Animator(this.spritesheet, spriteInfo['xStart'], 1165, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations.push(new Animator(this.spritesheet, spriteInfo['xStart'], 971, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations.push(new Animator(this.spritesheet, spriteInfo['xStart'], 777, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations.push(new Animator(this.spritesheet, spriteInfo['xStart'], 680, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations.push(new Animator(this.spritesheet, spriteInfo['xStart'], 389, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations.push(new Animator(this.spritesheet, spriteInfo['xStart'], 195, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations.push(new Animator(this.spritesheet, spriteInfo['xStart'], 1, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations.push(new Animator(this.spritesheet, spriteInfo['xStart'], 1456, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        */
        this.facing = 5;
        
        this.elapsedTime = 0;
    };

    drawAngle(ctx, angle) {
        if (angle < 0 || angle > 359) return;


        if (!this.cache[angle]) {
           let radians = angle / 360 * 2 * Math.PI;
           let offscreenCanvas = document.createElement('canvas');

            offscreenCanvas.width = 32;
            offscreenCanvas.height = 32;

            let offscreenCtx = offscreenCanvas.getContext('2d');

            offscreenCtx.save();
            offscreenCtx.translate(16, 16);
            offscreenCtx.rotate(radians);
            offscreenCtx.translate(-16, -16);
            offscreenCtx.drawImage(this.spritesheet, 1, 1165, 95, 95, 10, 10, 48, 48);
            offscreenCtx.restore();
            this.cache[angle] = offscreenCanvas;
        }
        var xOffset = 16;
        var yOffset = 16;

        ctx.drawImage(this.cache[angle], this.x - xOffset, this.y - yOffset);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(this.x - xOffset, this.y - yOffset, 32, 32);
        }
    };

    update() {
        //this.facing = (this.facing + 1) % 8;

        /*
        this.elapsedTime += this.game.clockTick;
        this.velocity = { x: Math.cos(this.elapsedTime), y: Math.sin(this.elapsedTime) };
        this.facing = getFacing(this.velocity);
        */
       
        //this.heatSeeking = document.getElementById("heatSeeking").checked;
        //this.smooth = document.getElementById("smooth").checked;

        if (this.heatSeeking) {
            var dist = distance(this, this.target);
            this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
        }

        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;

        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (!this.zombieteam && (ent instanceof InfectedUnit || ent instanceof InfectedVenom || ent instanceof InfectedChubby) && collide(this, ent)) {
                ent.hitpoints -= 10;
                this.removeFromWorld = true;
            }
        }

        this.facing = getFacing(this.velocity);
    };

    draw(ctx) {
        var xOffset = 16;
        var yOffset = 16;
        if (this.smooth) {
            let angle = Math.atan2(this.velocity.y , this.velocity.x);
            if (angle < 0) angle += Math.PI * 2;
            let degrees = Math.floor(angle / Math.PI / 2 * 360);

            this.drawAngle(ctx, degrees);
        } else {
            if (this.facing < 5) {
                this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - xOffset, this.y - yOffset, 1);
            } else {
                ctx.save();
                ctx.scale(-1, 1);
                this.animations[8 - this.facing].drawFrame(this.game.clockTick, ctx, -(this.x) - 32 + xOffset, this.y - yOffset, 1);
                ctx.restore();
            }
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
    };
};