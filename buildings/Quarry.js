class Quarry {
    constructor(game) {
        Object.assign(this, { game});
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.priority = BUILDINGPRIORITY;
        this.followMouse = true;
        this.placeable = false;
        this.hitpoints = 150;
        this.radius = 30;
        this.stoneRate = 0;
        this.ironRate = 0;
    };

     // takes gameEngines map object which is a 2D array of tiles
     calcResourceRate() {
        this.stoneRate = 0;
        this.ironRate = 0;
        // traverse from (-2,-2) to (+2,+2) from current (x,y) location (calculate a 5x5 grid of resources)
        /*let mapStartX = this.game.mouse.x + this.game.camera.cameraX - 2;
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
        }*/
        let mapStartX = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX - 2);
        let mapStartY = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY - 2);
        let mapEndX = sanitizeCord(mapStartX + 4);
        let mapEndY = sanitizeCord(mapStartY + 5);
        for (var i = mapStartX; i <= mapEndX; i++) {
            for (var j = mapStartY; j <= mapEndY; j++) {
                if (this.game.mainMap.map[i][j].stone) {
                    this.stoneRate += 1;
                }
                if (this.game.mainMap.map[i][j].iron) {
                    this.ironRate += 1;
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
            this.game.stoneRate -= this.stoneRate;
            this.game.ironRate -= this.ironRate;
            //this.game.mainMap.map[(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH][(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].filled = false;
            //this.game.mainMap.map[(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH + 1][(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].filled = false;
            this.game.mainMap.map[(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH][(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].filled = false;
            this.game.mainMap.map[(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH][(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH + 1].filled = false;
            this.game.mainMap.map[(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH][(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].Quarry = false;
            this.game.mainMap.map[(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH][(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH + 1].Quarry = false;
        }
        
        if (this.game.mouse && this.followMouse) {
            var x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            if ((y+1 <= 49) && // cursor is not at bottom edge of map (and therefore can place 2nd half of building)
                (!this.game.mainMap.map[x][y].collisions && !this.game.mainMap.map[x][y].filled) &&
                (!this.game.mainMap.map[x][y+1].collisions && !this.game.mainMap.map[x][y+1].filled)) {
                    this.placeable = true;
            } else {
                this.placeable = false;
            }
            this.calcResourceRate();
        }

        //placing selected entity
        if (this.game.click && this.followMouse) {
            var x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            //if (this.game.click.y < 15 && this.placeable) {
            if (!this.game.mainMap.map[x][y].filled && !this.game.mainMap.map[x][y].collisions && this.game.click.y < 15 && this.placeable 
                && checkSameBuildingTypeInMapResourceGrid("Quarry", x, y, 5, 2)) {
                this.game.mainMap.map[x][y].filled = true;
                this.game.mainMap.map[x][y+1].filled = true;
                this.game.mainMap.map[x][y].Quarry = true;
                this.game.mainMap.map[x][y+1].Quarry = true;
                this.followMouse = false;
                this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;
                this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;

                this.game.workers -= this.game.requiredResources["Quarry"].workers;
                this.game.workerRate -= this.game.requiredResources["Quarry"].workers;
                this.game.food -= this.game.requiredResources["Quarry"].food;
                this.game.wood -= this.game.requiredResources["Quarry"].wood;
                this.game.stone -= this.game.requiredResources["Quarry"].stone;
                this.game.iron -= this.game.requiredResources["Quarry"].iron;

                this.game.stoneRate += this.stoneRate;
                this.game.ironRate += this.ironRate;
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
            ctx.strokeStyle = 'Purple';
            ctx.strokeRect((mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-2) * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH, 6 * PARAMS.BLOCKWIDTH);
            ctx.font = "15px SpaceMono-Regular";
            ctx.fillStyle = "lightgreen";
            ctx.fillText("Surround the stone and iron", (mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-1.7)*PARAMS.BLOCKWIDTH);
            ctx.fillText("rocks to acquire them", (mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-1.4)*PARAMS.BLOCKWIDTH);
            ctx.fillText(this.stoneRate + " stone", (mouse.x) * PARAMS.BLOCKWIDTH, (mouse.y+3)*PARAMS.BLOCKWIDTH);
            ctx.fillText(this.ironRate + " iron", (mouse.x) * PARAMS.BLOCKWIDTH, (mouse.y+3.3)*PARAMS.BLOCKWIDTH);
        }

        if (!this.followMouse) {
            ctx.drawImage(this.spritesheet, startX, startY, width, height, (this.x - PARAMS.BLOCKWIDTH/2) - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (this.y - PARAMS.BLOCKWIDTH/2) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH,  2 * PARAMS.BLOCKWIDTH);
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