class Sawmill {
    constructor(game) {
        Object.assign(this, { game});
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.followMouse = true;
        this.placeable = false;
        this.hitpoints = 150;
        this.radius = 30;
        
        this.woodRate = 0;
    };

    // takes gameEngines map object which is a 2D array of tiles
    calcResourceRate() {
        this.woodRate = 0;
        // traverse from (-2,-2) to (+2,+2) from current (x,y) location (calculate a 5x5 grid of resources)
        let mapStartX = this.game.mouse.x + this.game.camera.cameraX - 2;
        let mapStartY = this.game.mouse.y + this.game.camera.cameraY - 2;
        let mapEndX = mapStartX + 4;
        let mapEndY = mapStartY + 5;
        if (mapStartX < 0) {
            mapStartX = 0;
        }
        if (mapStartY < 0) {
            mapStartY = 0;
        }
        if (mapEndX > 49) {
            mapEndX = 49;
        }
        if (mapEndY > 49) {
            mapEndY = 49;
        }
        for (var i = mapStartY; i <= mapEndY; i++) {
            for (var j = mapStartX; j <= mapEndX; j++) {
                if (this.game.mainMap.map[i][j].green) {
                    this.woodRate += 1;
                }
            }
        }
        if (PARAMS.RESOURCEXY){ 
            console.log("mapStartX:" + mapStartX + ", mapStartY:" +  mapStartY + ", mapEndX:" + mapEndX + ", mapEndY: " + mapEndY);
        }
    }

    update() {
        if (this.hitpoints <= 0) {
            this.removeFromWorld = true;
            this.game.woodRate -= this.woodRate;
            this.game.mainMap.map[(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH][(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].filled = false;
            this.game.mainMap.map[(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH + 1][(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].filled = false;
        }
        
        if (this.game.mouse && this.followMouse) {
            var x = this.game.mouse.x + this.game.camera.cameraX;
            var y = this.game.mouse.y + this.game.camera.cameraY;
            if ((!this.game.mainMap.map[y][x].collisions && !this.game.mainMap.map[y][x].filled) &&
                (!this.game.mainMap.map[y+1][x].collisions && !this.game.mainMap.map[y+1][x].filled)) {
                this.placeable = true;
            } else {
                this.placeable = false;
            }
            this.calcResourceRate();
        }

        //placing selected entity
        if (this.game.click && this.followMouse) {
            var x = this.game.click.x + this.game.camera.cameraX;
            var y = this.game.click.y + this.game.camera.cameraY;
            if (this.game.click.y < 15 && this.placeable) {
                this.game.mainMap.map[y][x].filled = true;
                this.game.mainMap.map[y+1][x].filled = true;
                this.followMouse = false;
                this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;
                this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;

                this.game.numWorkers -= this.game.requiredResources["Sawmill"].workers;
                this.game.food -= this.game.requiredResources["Sawmill"].food;
                this.game.wood -= this.game.requiredResources["Sawmill"].wood;
                this.game.stone -= this.game.requiredResources["Sawmill"].stone;
                this.game.iron -= this.game.requiredResources["Sawmill"].iron;

                this.game.woodRate += this.woodRate;
            }
            this.game.click = null;
        }
    };

    draw(ctx) {
        const width = 32;
        const height = 64;
        const startY = 3 * 32;
        const startX = 3 * 32;

        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            if (this.placeable) {
                ctx.strokeStyle = 'Green';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 2 *PARAMS.BLOCKWIDTH);
            } else {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
            }

            ctx.drawImage(this.spritesheet, startX, startY, width, height, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
            ctx.strokeStyle = 'Purple';
            ctx.strokeRect((mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-2) * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH, 6 * PARAMS.BLOCKWIDTH);
               //ctx.strokeRect(0, 0, 200, 50);
            ctx.font = "15px SpaceMono-Regular";
            ctx.fillStyle = "lightgreen";
            ctx.fillText("Surround the green tiles", (mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-1.7)*PARAMS.BLOCKWIDTH);
            ctx.fillText("to gain wood", (mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-1.4)*PARAMS.BLOCKWIDTH);
            ctx.fillText(this.woodRate + " wood", (mouse.x) * PARAMS.BLOCKWIDTH, (mouse.y+3)*PARAMS.BLOCKWIDTH);

        }

        if (!this.followMouse) {
            ctx.drawImage(this.spritesheet, startX, startY, width, height, (this.x - PARAMS.BLOCKWIDTH/2) - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (this.y - PARAMS.BLOCKWIDTH/2) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
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
        if((this.x - PARAMS.BLOCKWIDTH/2) >= 0 && (this.x - PARAMS.BLOCKWIDTH/2) <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && (this.y - PARAMS.BLOCKWIDTH/2) >= 0 && (this.y - PARAMS.BLOCKWIDTH/2) <= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
          ctx.fillStyle = "Green";
          ctx.fillRect(mmX + (this.x - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE, mmY + (this.y - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
          ctx.fillRect(mmX + (this.x - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE, mmY + (this.y - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE + 1, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
        }
    }
};