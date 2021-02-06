class Quarry {
    constructor(game) {
        Object.assign(this, { game });
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.followMouse = true;
        this.placeable = false;
        this.hitpoints = 100;
    };

    update() {
        if (this.game.mouse && this.followMouse) {
            var x = this.game.mouse.x + this.game.camera.cameraX;
            var y = this.game.mouse.y + this.game.camera.cameraY;
            if ((this.game.mainMap.map[y][x].ore == true) &&
                !this.game.mainMap.map[y][x].collisions && !this.game.mainMap.map[y][x].filled) {
                this.placeable = true;
            } else {
                this.placeable = false;
            }
        }

        //placing selected entity
        if (this.game.click && this.followMouse) {
            var x = this.game.click.x + this.game.camera.cameraX;
            var y = this.game.click.y + this.game.camera.cameraY;
            if (!this.game.mainMap.map[y][x].filled && !this.game.mainMap.map[y][x].collisions && this.game.click.y < 11 && this.placeable) {
                this.game.mainMap.map[y][x].filled = true;
                this.followMouse = false;
                this.x = x * PARAMS.BLOCKWIDTH;
                this.y = y * PARAMS.BLOCKWIDTH;
            }
            this.game.click = null;
        }
    };

    draw(ctx) {
        const width = 32;
        const height = 64;
        const startY = 3 * 32;
        const startX = 0;

        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            if (this.game.mouse && this.followMouse) {
                var mouse = this.game.mouse;
                if (this.placeable) {
                    ctx.strokeStyle = 'Green';
                    ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
                } else {
                    ctx.strokeStyle = 'Red';
                    ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
                }
                ctx.drawImage(this.spritesheet, startX, startY, width, height, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
            }

            ctx.drawImage(this.spritesheet, startX, startY, width, height, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
        }

        if (!this.followMouse) {
            console.log(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH));
            ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH,  2 * PARAMS.BLOCKWIDTH);
        }
    };
};