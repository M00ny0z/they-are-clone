class Ballista {
    constructor(game) {
        Object.assign(this, { game });
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ballista.png");

        this.radius = 30;
        this.visualRadius = 600;

        this.target = null;
        this.velocity = null;

        this.fireRate = 1;

        this.facing = 0;

        this.elapsedTime = 0;

        this.hitpoints = 100;

        this.followMouse = true;
        this.placeable = false;

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
            console.log()
            if ((ent instanceof InfectedUnit || ent instanceof InfectedHarpy || ent instanceof InfectedVenom || ent instanceof InfectedChubby) && canSee(this, ent)
                && this.elapsedTime > this.fireRate) {
                    console.log(canSee(this, ent));
                this.target = ent;
                this.elapsedTime = 0;
                this.game.addEntity(new Arrow(this.game, this.x+ 32, this.y + 32, ent, true));
            }
        }

        if (this.target != null) {
            this.velocity = { x: (this.target.x - this.x), y: (this.target.y - this.y) };
            this.facing = getFacing(this.velocity);
        }

        if (this.game.mouse && this.followMouse) {
            var x = this.game.mouse.x + this.game.camera.cameraX;
            var y = this.game.mouse.y + this.game.camera.cameraY;
            if (!this.game.mainMap.map[y][x].collisions && !this.game.mainMap.map[y][x].filled) {
                this.placeable = true;
            } else {
                this.placeable = false;
            }
        }

        //placing selected entity
        if (this.game.click && this.followMouse) {
            var x = this.game.click.x + this.game.camera.cameraX;
            var y = this.game.click.y + this.game.camera.cameraY;
            if (!this.game.mainMap.map[y][x].filled && !this.game.mainMap.map[y][x].collisions && this.game.click.y < 15 && this.placeable) {
                this.game.mainMap.map[y][x].filled = true;
                this.followMouse = false;
                this.x = x * PARAMS.BLOCKWIDTH;
                this.y = y * PARAMS.BLOCKWIDTH;
            }
            this.game.click = null;
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

        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            if (this.placeable) {
                ctx.strokeStyle = 'Green';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            } else {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            }
            ctx.drawImage(this.spritesheet, 0, 0, 64, 64, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }

        if (!this.followMouse) {
            if (this.facing < 5) {
                this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 0.75);
            } else {
                ctx.save();
                ctx.scale(-1, 1);
                this.animations[this.facing - (2 * (this.facing - 4))].drawFrame(this.game.clockTick, ctx, -(this.x) - 48  + (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 0.75);
                ctx.restore();
            }
        }


        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x + PARAMS.BLOCKWIDTH/2 - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y + PARAMS.BLOCKWIDTH/2 - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), this.radius, 0, 2 * Math.PI);
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
};
