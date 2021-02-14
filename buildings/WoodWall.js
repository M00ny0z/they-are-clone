class WoodWall {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.followMouse = true;
        this.placeable = false;
        this.hitpoints = 100;
        this.radius = 1;
    };

    collide(other) {
        return distance(this, other) < this.radius + other.radius;
    };

    update() {
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

                this.game.workers -= this.game.requiredResources["WoodWall"].workers;
                this.game.food -= this.game.requiredResources["WoodWall"].food;
                this.game.wood -= this.game.requiredResources["WoodWall"].wood;
                this.game.stone -= this.game.requiredResources["WoodWall"].stone;
                this.game.iron -= this.game.requiredResources["WoodWall"].iron;
            }
            this.game.click = null;
        }

        //collision detection
        for (const ent of this.game.entities) {
            if ((ent instanceof InfectedUnit || 
                 ent instanceof InfectedHarpy || 
                 ent instanceof InfectedVenom || 
                 ent instanceof InfectedChubby) && this.collide(ent)) {
                ent.state = 3;
            }
        }
    };

    draw(ctx) {
        const width = 32;
        const height = 32;
        const startY = 32;
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
            ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }
    };
};