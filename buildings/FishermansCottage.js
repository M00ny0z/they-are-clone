class FishermansCottage {
    constructor(game) {
        Object.assign(this, { game });
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.priority = BUILDINGPRIORITY;
        this.followMouse = true;
        this.placeable = false;
        this.hitpoints = 150;
        this.radius = 30;
        this.foodRate = 0;
    };

    // takes gameEngines map object which is a 2D array of tiles
    calcResourceRate() {
        this.foodRate = 0;
        // traverse from (-2,-2) to (+2,+2) from current (x,y) location (calculate a 5x5 grid of resources)
        let mapStartX = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX - 2);
        let mapStartY = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY - 2);
        let mapEndX = sanitizeCord(mapStartX + 4);
        let mapEndY = sanitizeCord(mapStartY + 4);
        for (var i = mapStartX; i <= mapEndX; i++) {
            for (var j = mapStartY; j <= mapEndY; j++) {
                //console.log("x:" + j + " y:" + i + this.game.mainMap.map[i][j].water);
                if (this.game.mainMap.map[i][j].water) {
                    this.foodRate += 1;
                }
            }
        }
        if (PARAMS.RESOURCEXY){ 
            var x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            console.log("mouseX: " + x + ", mouseY: " + y + ", mapStartX:" + mapStartX + ", mapStartY:" +  mapStartY + ", mapEndX:" + mapEndX + ", mapEndY: " + mapEndY);
        }
    }

    update() {
        if (this.hitpoints <= 0) {
            this.removeFromWorld = true;
            this.game.foodRate -= this.foodRate;
            this.game.mainMap.map[(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH][(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].filled = false;
            this.game.mainMap.map[(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH][(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].FishermansCottage = false;
        }
        
        if (this.game.mouse && this.followMouse) {
            /*var x = this.game.mouse.x + this.game.camera.cameraX;
            var y = this.game.mouse.y + this.game.camera.cameraY;*/
            var x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            let adjacentSquares = { right: {x: sanitizeCord(x+1), y: sanitizeCord(y)}, 
                                    below: {x: sanitizeCord(x),   y: sanitizeCord(y+1)},
                                    left:  {x: sanitizeCord(x-1), y: sanitizeCord(y)}, 
                                    above: {x: sanitizeCord(x),   y: sanitizeCord(y-1)},
                                  };

            /*console.log("waterRight?: " + (this.game.mainMap.map[adjacentSquares.right.x][adjacentSquares.right.y].water == true) + ", " +
                        "waterBelow?: " + (this.game.mainMap.map[adjacentSquares.below.x][adjacentSquares.below.y].water == true) + ", " + 
                        "waterLeft?: " + (this.game.mainMap.map[adjacentSquares.left.x][adjacentSquares.left.y].water == true) + ", " + 
                        "waterAbove?: " + (this.game.mainMap.map[adjacentSquares.above.x][adjacentSquares.above.y].water == true));*/

            if (((this.game.mainMap.map[adjacentSquares.right.x][adjacentSquares.right.y].water == true) || 
                (this.game.mainMap.map[adjacentSquares.below.x][adjacentSquares.below.y].water == true) ||
                (this.game.mainMap.map[adjacentSquares.left.x][adjacentSquares.left.y].water == true) ||
                (this.game.mainMap.map[adjacentSquares.above.x][adjacentSquares.above.y].water == true)) &&
                !this.game.mainMap.map[x][y].collisions && !this.game.mainMap.map[x][y].filled) {
                    this.placeable = true;
            } else {
                this.placeable = false;
            }
            this.calcResourceRate();
            /*if (((this.game.mainMap.map[y + 1][x].water == true) || (this.game.mainMap.map[y - 1][x].water == true) ||
                (this.game.mainMap.map[y][x + 1].water == true) || (this.game.mainMap.map[y][x - 1].water == true)) &&
                !this.game.mainMap.map[y][x].collisions && !this.game.mainMap.map[y][x].filled) {
                this.placeable = true;
            } else {
                this.placeable = false;
            }
            this.calcResourceRate();*/
        }

        //placing selected entity
        if (this.game.click && this.followMouse) {
            var x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            console.log("gridX: " + x + ", " + "gridY: " + y);
            if (!this.game.mainMap.map[x][y].filled && !this.game.mainMap.map[x][y].collisions && this.game.click.y < 15 && this.placeable 
                && checkSameBuildingTypeInMapResourceGrid("FishermansCottage", x, y, 4, 2)) {

                this.game.mainMap.map[x][y].filled = true;
                this.game.mainMap.map[x][y]["FishermansCottage"] = true;
                //fillBuildingTypeInMapResourceGrid("FishermansCottage", x, y, 4, 2); // fill in grid as occupied by fishermans cottage (resources) 
                this.followMouse = false;
                this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;
                this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;
                console.log("x: " + x + ", " + y);
                this.game.workers -= this.game.requiredResources["FishermansCottage"].workers;
                this.game.workeRate -= this.game.requiredResources["FishermansCottage"].workers;
                this.game.food -= this.game.requiredResources["FishermansCottage"].food;
                this.game.wood -= this.game.requiredResources["FishermansCottage"].wood;
                this.game.stone -= this.game.requiredResources["FishermansCottage"].stone;
                this.game.iron -= this.game.requiredResources["FishermansCottage"].iron;
                
                this.game.foodRate += this.foodRate;
            }
            this.game.click = null;
        }
    };



    draw(ctx) {
        const width = 32;
        const height = 32;
        const startY = 4 * 32;
        const startX = 32;

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
            
            ctx.strokeStyle = 'Purple';
            ctx.strokeRect((mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-2) * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH);
               //ctx.strokeRect(0, 0, 200, 50);
            ctx.font = "15px SpaceMono-Regular";
            ctx.fillStyle = "lightgreen";
            //ctx.fillText("Surround the water tiles to acquire food", (mouse.x-3) * PARAMS.BLOCKWIDTH, (mouse.y-1)*PARAMS.BLOCKWIDTH);
            ctx.fillText("Surround the water tiles", (mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-1.7)*PARAMS.BLOCKWIDTH);
            ctx.fillText("to gain food", (mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-1.4)*PARAMS.BLOCKWIDTH);
            ctx.fillText(this.foodRate + " food", (mouse.x) * PARAMS.BLOCKWIDTH, (mouse.y+3)*PARAMS.BLOCKWIDTH);
        }

        drawHealthbar(ctx, this.hitpoints, this.x, this.y, this.game, MAX_FISHERMANS_HEALTH);

        if (!this.followMouse) {
            ctx.drawImage(this.spritesheet, startX, startY, width, height,(this.x - PARAMS.BLOCKWIDTH/2) - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (this.y - PARAMS.BLOCKWIDTH/2) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
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
        if((this.x - PARAMS.BLOCKWIDTH/2) >= 0 && (this.x - PARAMS.BLOCKWIDTH/2) <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && (this.y - PARAMS.BLOCKWIDTH/2) >= 0 && (this.y - PARAMS.BLOCKWIDTH/2)<= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
            ctx.fillStyle = "Green";
            ctx.fillRect(mmX + (this.x - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE, mmY + (this.y - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
          }
    }
};