class Ballista {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.x = x * PARAMS.BLOCKWIDTH;
        this.y = y * PARAMS.BLOCKWIDTH;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ballista.png");

        this.radius = 30;
        this.visualRadius = 600;

        this.target = null;
        this.velocity = null;

        this.fireRate = 1;

        this.facing = 0;

        this.elapsedTime = 0;

        this.hitpoints = 100;

        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        var spriteInfo = {
            'yStart': 0,
            'width': 64,
            'height': 64,
            'frames': 1,
            'speed': 0.1,
            'padding': 1
        };
        //0 = N
        this.animations.push(new Animator(this.spritesheet, 0, spriteInfo['yStart'], spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations.push(new Animator(this.spritesheet, 65, spriteInfo['yStart'], spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = E
        this.animations.push(new Animator(this.spritesheet, 134, spriteInfo['yStart'], spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = SE
        this.animations.push(new Animator(this.spritesheet, 198, spriteInfo['yStart'], spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = S
        this.animations.push(new Animator(this.spritesheet, 265, spriteInfo['yStart'], spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    }

    update() {
        this.elapsedTime += this.game.clockTick;

        if (this.hitpoints <= 0) {
            this.removeFromWorld = true;
        }

        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if ((ent instanceof InfectedUnit || ent instanceof InfectedHarpy || ent instanceof InfectedVenom || ent instanceof InfectedChubby) && canSee(this, ent)
                && this.elapsedTime > this.fireRate) {
                this.target = ent;
                this.elapsedTime = 0;
                this.game.addEntity(new Arrow(this.game, this.x + 32, this.y + 32, ent, true));
            }
        }

        if (this.target != null) {
            this.velocity = { x: (this.target.x - this.x), y: (this.target.y - this.y) };
            this.facing = getFacing(this.velocity);
        }
    };

    draw(ctx) {
        if (this.target != null) {
            switch (this.facing) {
                case 0:
                    this.facing = 2;
                    break;
                case 1:
                    this.facing = 1;
                    break;
                case 2:
                    this.facing = 0;
                    break;
                case 3:
                    this.facing = 7;
                    break;
                case 4:
                    this.facing = 6;
                    break;
                case 5:
                    this.facing = 5;
                    break;
                case 6:
                    this.facing = 4;
                    break;
                case 7:
                    this.facing = 3;
                    break;
            }
        }

        var xOffset = (this.facing > 4) ? -15 : 0;
        var yOffset = 0;

        if (this.facing < 5) {
            this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - xOffset - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y + yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 1);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            this.animations[this.facing - (2 * (this.facing - 4))].drawFrame(this.game.clockTick, ctx, -(this.x) - 48 + xOffset + (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y + yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 1);
            ctx.restore();
        }


        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x + 32 - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y + 32 - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), this.visualRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([]);
        }

        if (this.game.mouse) {
            var mouse = this.game.mouse;
            ctx.drawImage(this.spritesheet, 0, 0, 64, 64, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, 64, 64);
        }
    };
};
