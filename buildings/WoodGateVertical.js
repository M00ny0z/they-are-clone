class WoodGateVertical {
    constructor(game) {
        Object.assign(this, { game });
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.followMouse = true;
        this.placeable = false;

        this.radius = 50;
        this.visualRadius = 75;

        this.hitpoints = 100;

        //Gate is closed by default
        this.state = 0;
    };

    update() {
        if (this.hitpoints <= 0) {
            this.removeFromWorld = true;
            this.game.mainMap.map[this.y/PARAMS.BLOCKWIDTH][this.x/PARAMS.BLOCKWIDTH].filled = false;
        }

        //detect if an ally unit is in range. if so, open gate.
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if ((ent instanceof Ranger || ent instanceof Soldier || ent instanceof Sniper || ent instanceof Titan) && canSee(this, ent)) {
                this.state = 1;
            } else {
                this.state = 0;
            }
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

        // placing selected entity
        if (this.game.click && this.followMouse) {
            var x = this.game.click.x + this.game.camera.cameraX;
            var y = this.game.click.y + this.game.camera.cameraY;
            if (!this.game.mainMap.map[y][x].filled && !this.game.mainMap.map[y][x].collisions && this.game.click.y < 15 && this.placeable) {
                this.game.mainMap.map[y][x].filled = true;
                this.followMouse = false;
                this.x = x * PARAMS.BLOCKWIDTH;
                this.y = y * PARAMS.BLOCKWIDTH;
                console.log(this.x + ", " + this.y);
                this.game.workers -= this.game.requiredResources["WoodGate"].workers;
                this.game.food -= this.game.requiredResources["WoodGate"].food;
                this.game.wood -= this.game.requiredResources["WoodGate"].wood;
                this.game.stone -= this.game.requiredResources["WoodGate"].stone;
                this.game.iron -= this.game.requiredResources["WoodGate"].iron;
            }
            this.game.click = null;
        }
    };

    draw(ctx) {
        const width = 32;
        const height = 32;

        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            if (this.placeable) {
                ctx.strokeStyle = 'Green';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            } else {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            }
            ctx.drawImage(this.spritesheet, 64, 32, width, height, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }

        if (!this.followMouse) {
            if (this.state == 0) {
                ctx.drawImage(this.spritesheet, 64, 32, width, height, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            } else if (this.state == 1) {
                ctx.drawImage(this.spritesheet, 96, 32, width, height, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            }
        }
    };

    drawMinimap(ctx, mmX, mmY) {
        if(this.x >= 0 && this.x <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && this.y >= 0 && this.y <= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
          ctx.fillStyle = "Green";
          ctx.fillRect(mmX + this.x * PARAMS.MINIMAPSCALE, mmY + this.y * PARAMS.MINIMAPSCALE, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
        }
    }
};
