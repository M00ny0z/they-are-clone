class StoneHouse {
    constructor(game) {
        Object.assign(this, { game });
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.followMouse = true;
        this.placeable = false;
        this.hitpoints = 100;
        this.workerRate = 3;
    };

    collide(other) {
        return distance(this, other) < this.radius + other.radius;
    };
    
    update() {
        if (this.hitpoints <= 0) {
            this.removeFromWorld = true;
            this.game.mainMap.map[this.y/PARAMS.BLOCKWIDTH][this.x/PARAMS.BLOCKWIDTH].filled = false;
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

                this.game.workers -= this.game.requiredResources["StoneHouse"].workers;
                this.game.food -= this.game.requiredResources["StoneHouse"].food;
                this.game.wood -= this.game.requiredResources["StoneHouse"].wood;
                this.game.stone -= this.game.requiredResources["StoneHouse"].stone;
                this.game.iron -= this.game.requiredResources["StoneHouse"].iron;
                
                this.game.workerRate += this.workerRate;
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
        const width = 48;
        const height = 41;
        const startY = 393;
        const startX = 0;
        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            if (this.placeable) {
                ctx.strokeStyle = 'Green';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            } else {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            }
            ctx.drawImage(this.spritesheet, startX, startY, width, height, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            ctx.strokeStyle = 'Purple';
            ctx.strokeRect((mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-2) * PARAMS.BLOCKWIDTH, 6 * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH);
            ctx.font = "15px SpaceMono-Regular";
            ctx.fillStyle = "lightgreen";
            ctx.fillText("Place to recruit workers.", (mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-1.7)*PARAMS.BLOCKWIDTH);
            ctx.fillText(this.workerRate + " workers", (mouse.x) * PARAMS.BLOCKWIDTH, (mouse.y+3)*PARAMS.BLOCKWIDTH);

        }

        if(!this.followMouse){
            ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 2 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }
    };

    drawMinimap(ctx, mmX, mmY) {
        if(this.x >= 0 && this.x <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && this.y >= 0 && this.y <= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
          ctx.fillStyle = "Green";
          ctx.fillRect(mmX + this.x * PARAMS.MINIMAPSCALE, mmY + this.y * PARAMS.MINIMAPSCALE, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
        }
    }
};