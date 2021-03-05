class Building {
    constructor(game, spritesheet, width, height, spriteX, spriteY, followMouse, heightMultiplier,
                placementLogic, updateLogic, drawFunction, updateFunction, drawText) {
        Object.assign(this, 
            { 
                game, height, width, placementLogic, updateLogic, followMouse, drawFunction, 
                updateFunction, drawText, spriteX, spriteY, spritesheet, heightMultiplier 
            }
        );
        this.x = null;
        this.y = null;
        this.placeable = false;
        this.hitpoints = 100;
        this.visualRadius = 50;
        this.radius = 50;
    };


    collide(other) {
        return distance(this, other) < this.radius + other.radius;
    };

    update() {
        if (this.hitpoints <= 0) this.removeFromWorld = true;
        
        let logic;
        if (this.game.mouse && this.followMouse) {
            const x = this.game.mouse.x + this.game.camera.cameraX;
            const y = this.game.mouse.y + this.game.camera.cameraY;
            logic = this.game.collisionMap[y][x] === 1 && !this.game.mainMap.map[y][x].filled;
            if (logic && this.updateLogic(x, y)) {
                this.placeable = true;
            } else {
                this.placeable = false;
            }
        }

        //placing selected entity
        if (this.game.click && this.followMouse) {
            const placeX = this.game.click.x + this.game.camera.cameraX;
            const placeY = this.game.click.y + this.game.camera.cameraY;
            if (logic && this.placementLogic()) {
                this.game.mainMap.map[placeY][placeX].filled = true;
                this.followMouse = false;
                this.x = placeX * PARAMS.BLOCKWIDTH;
                this.y = placeY * PARAMS.BLOCKWIDTH;
                this.updateFunction();
            }
            this.game.click = null;
        }
    };

    draw(ctx) {
        if (this.game.mouse && this.followMouse) {
            const mouse = this.game.mouse;
            if (this.placeable) {
                ctx.strokeStyle = 'Green';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, 
                               PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            } else {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, 
                               PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            }

            ctx.drawImage(this.spritesheet, this.spriteX, this.spriteY, this.width, this.height, 
                          mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, 
                          PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * this.heightMultiplier);

            this.drawFunction(ctx, mouse);

            this.drawText(ctx, mouse);
        }

        if (!this.followMouse) {
            //console.log(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH));
            ctx.drawImage(this.spritesheet, this.spriteX, this.spriteY, this.width, this.height,
                          this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), 
                          this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 
                          PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * this.heightMultiplier);
        }
    };

    drawMinimap(ctx, mmX, mmY) {
        if(this.x >= 0 && this.x <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && this.y >= 0 && this.y <= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
            ctx.fillStyle = "Red";
            ctx.fillRect(mmX + this.x * PARAMS.MINIMAPSCALE, mmY + this.y * PARAMS.MINIMAPSCALE, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
        }
    };
};