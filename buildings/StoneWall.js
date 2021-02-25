class StoneWall {
    constructor(game) {
        Object.assign(this, { game });
        this.health = 100;
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.priority = BUILDINGPRIORITY;
        this.followMouse = true;
        this.placeable = false;
        this.hitpoints = 200;
        this.radius = 30;
    };

    update() {
        if (this.hitpoints <= 0) {
            this.removeFromWorld = true;
            this.game.mainMap.map[(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH][(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].collisions = false;

        }
        
        if (this.game.mouse && this.followMouse) {
            var x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            if (!this.game.mainMap.map[y][x].collisions) {
                this.placeable = true;
            } else {
                this.placeable = false;
            }
        }

        //placing selected entity
        if (this.game.click && this.followMouse) {
            var x = sanitizeCord(this.game.click.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.click.y + this.game.camera.cameraY);
            if (!this.game.mainMap.map[y][x].collisions && this.game.click.y < 15 && this.placeable) {
                this.game.mainMap.map[y][x].collisions = true;
                this.followMouse = false;
                this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2;
                this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2;

                this.game.workers -= this.game.requiredResources["StoneWall"].workers;
                this.game.food -= this.game.requiredResources["StoneWall"].food;
                this.game.wood -= this.game.requiredResources["StoneWall"].wood;
                this.game.stone -= this.game.requiredResources["StoneWall"].stone;
                this.game.iron -= this.game.requiredResources["StoneWall"].iron;
            }
            this.game.click = null;
        }
    };

    draw(ctx) {
        const width = 32;
        const height = 32;
        const startY = 0;
        const startX = 128;

        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            if (this.placeable) {
                ctx.strokeStyle = 'Green';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            } else {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            }
            ctx.drawImage(this.spritesheet, startX, startY, width, height, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }



        if (!this.followMouse) {
            ctx.drawImage(this.spritesheet, startX, startY, width, height, (this.x - PARAMS.BLOCKWIDTH / 2)  - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (this.y - PARAMS.BLOCKWIDTH / 2) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }

        if (this.hitpoints < MAX_STONEWALL_HEALTH) {
            drawHealthbar(ctx, this.hitpoints, this.x, this.y, this.game, MAX_STONEWALL_HEALTH);
        }

        if (PARAMS.DEBUG && !this.followMouse) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
    };

    drawMinimap(ctx, mmX, mmY) {
        if ((this.x - PARAMS.BLOCKWIDTH / 2) >= 0 && (this.x - PARAMS.BLOCKWIDTH / 2) <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && (this.y - PARAMS.BLOCKWIDTH / 2) >= 0 && (this.y - PARAMS.BLOCKWIDTH / 2) <= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
            ctx.fillStyle = "Green";
            ctx.fillRect(mmX + (this.x - PARAMS.BLOCKWIDTH / 2) * PARAMS.MINIMAPSCALE, mmY + (this.y - PARAMS.BLOCKWIDTH / 2) * PARAMS.MINIMAPSCALE, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
        }
    }
};