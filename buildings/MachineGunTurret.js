class MachineGunTurret {
    constructor(game) {
        Object.assign(this, { game });
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/machinegun_turret.png");
        this.priority = BUILDINGPRIORITY;

        this.radius = 30;
        this.visualRadius = 250;

        this.fireRate = 2.5;

        this.facing = 2;

        this.elapsedTime = 0;

        this.hitpoints = 250;

        this.followMouse = true;
        this.placeable = false;

        this.animations = [];
        this.loadAnimations();
    };

    collide(other) {
        return distance(this, other) < this.radius + other.radius;
    };

    loadAnimations() {
        var spriteInfo = {};
        spriteInfo = {
            'xStart': -8,
            'width': 128,
            'height': 128,
            'frames': 1,
            'speed': 1,
            'padding': 0
        };
        //0 = E
        this.animations.push(new Animator(this.spritesheet, spriteInfo['xStart'], 256, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations.push(new Animator(this.spritesheet, spriteInfo['xStart'], 128, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations.push(new Animator(this.spritesheet, spriteInfo['xStart'], 0, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations.push(new Animator(this.spritesheet, spriteInfo['xStart'], 896, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations.push(new Animator(this.spritesheet, spriteInfo['xStart'], 768, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations.push(new Animator(this.spritesheet, spriteInfo['xStart'], 640, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations.push(new Animator(this.spritesheet, spriteInfo['xStart'], 512, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations.push(new Animator(this.spritesheet, spriteInfo['xStart'], 384, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    }

    update() {
        this.elapsedTime += this.game.clockTick;

        if (this.hitpoints <= 0) {
            this.removeFromWorld = true;
            this.game.mainMap.map[(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH][(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].filled = false;

        }

        for (var i = 0; i < NUMBEROFPRIORITYLEVELS; i++) {
            for (var j = 0; j < this.game.entities[i].length; j++) {
                var ent = this.game.entities[i][j];
                if ((ent instanceof InfectedUnit || ent instanceof InfectedHarpy || ent instanceof InfectedVenom || ent instanceof InfectedChubby) && canSee(this, ent)
                    && this.elapsedTime > this.fireRate) {
                    this.target = ent;
                    this.elapsedTime = 0;
                    this.game.addEntity(new CannonBall(this.game, this.x, this.y, ent, true));
                }
            }
        }

        if (this.target != null) {
            this.directionVector = { x: (this.target.x - this.x), y: (this.target.y - this.y) };
            this.facing = getFacing(this.directionVector);
        }

        if (this.game.mouse && this.followMouse) {
            var x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            if (!this.game.mainMap.map[x][y].collisions && !this.game.mainMap.map[x][y].filled) {
                this.placeable = true;
            } else {
                this.placeable = false;
            }
        }

        //placing selected entity
        if (this.game.click && this.followMouse) {
            var x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            if (!this.game.mainMap.map[x][y].filled && !this.game.mainMap.map[x][y].collisions && this.game.click.y < 15 && this.placeable) {
                this.game.mainMap.map[x][y].filled = true;
                this.followMouse = false;
                this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;
                this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;

                this.game.workers -= this.game.requiredResources["MachineGunTurret"].workers;
                this.game.workerRate -= this.game.requiredResources["MachineGunTurret"].workers;
                this.game.food -= this.game.requiredResources["MachineGunTurret"].food;
                this.game.wood -= this.game.requiredResources["MachineGunTurret"].wood;
                this.game.stone -= this.game.requiredResources["MachineGunTurret"].stone;
                this.game.iron -= this.game.requiredResources["MachineGunTurret"].iron;
            }
            this.game.click = null;
        }
    };

    draw(ctx) {
        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            if (this.placeable) {
                ctx.strokeStyle = 'Green';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            } else {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            }
            ctx.drawImage(this.spritesheet, -8, 0, 128, 128, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }

        drawHealthbar(ctx, this.hitpoints, this.x, this.y, this.game, MAX_MACHINEGUN_HEALTH);

        if (!this.followMouse) {
            this.animations[this.facing].drawFrame(this.game.clockTick, ctx, (this.x - PARAMS.BLOCKWIDTH/2) - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (this.y - PARAMS.BLOCKWIDTH/2) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 0.384);
        }


        if (PARAMS.DEBUG && !this.followMouse) {
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
        if((this.x - PARAMS.BLOCKWIDTH/2) >= 0 && (this.x - PARAMS.BLOCKWIDTH/2) <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && (this.y - PARAMS.BLOCKWIDTH/2) >= 0 && (this.y - PARAMS.BLOCKWIDTH/2)<= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
          ctx.fillStyle = "Green";
          ctx.fillRect(mmX + (this.x - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE, mmY + (this.y - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
        }
    }
};
