class FishermansCottage {
    constructor(game) {
        Object.assign(this, { game });
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.followMouse = true;
        this.placeable = false;
        this.hitpoints = 100;

        this.foodRate = 0;
    };

    // takes gameEngines map object which is a 2D array of tiles
    calcResourceRate() {
        this.foodRate = 0;
        // traverse from (-2,-2) to (+2,+2) from current (x,y) location (calculate a 5x5 grid of resources)
        let mapStartX = this.game.mouse.x + this.game.camera.cameraX - 2;
        let mapStartY = this.game.mouse.y + this.game.camera.cameraY - 2;
        let mapEndX = mapStartX + 4;
        let mapEndY = mapStartY + 4;
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
                console.log("x:" + j + " y:" + i + this.game.mainMap.map[i][j].water);
                if (this.game.mainMap.map[i][j].water) {
                    this.foodRate += 1;
                }
            }
        }
        if (PARAMS.RESOURCEXY){ 
            console.log("mapStartX:" + mapStartX + ", mapStartY:" +  mapStartY + ", mapEndX:" + mapEndX + ", mapEndY: " + mapEndY);
        }
    }

    collide(other) {
        return distance(this, other) < this.radius + other.radius;
    };

    update() {
        if (this.hitpoints <= 0) this.removeFromWorld = true;
        
        if (this.game.mouse && this.followMouse) {
            var x = this.game.mouse.x + this.game.camera.cameraX;
            var y = this.game.mouse.y + this.game.camera.cameraY;
            if (((this.game.mainMap.map[y + 1][x].water == true) || (this.game.mainMap.map[y - 1][x].water == true) ||
                (this.game.mainMap.map[y][x + 1].water == true) || (this.game.mainMap.map[y][x - 1].water == true)) &&
                !this.game.mainMap.map[y][x].collisions && !this.game.mainMap.map[y][x].filled) {
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
            if (!this.game.mainMap.map[y][x].filled && !this.game.mainMap.map[y][x].collisions && this.game.click.y < 15 && this.placeable) {
                this.game.mainMap.map[y][x].filled = true;
                this.followMouse = false;
                this.x = x * PARAMS.BLOCKWIDTH;
                this.y = y * PARAMS.BLOCKWIDTH;
                this.game.numWorkers -= this.game.requiredResources["FishermansCottage"].workers;
                this.game.food -= this.game.requiredResources["FishermansCottage"].food;
                this.game.wood -= this.game.requiredResources["FishermansCottage"].wood;
                this.game.stone -= this.game.requiredResources["FishermansCottage"].stone;
                this.game.iron -= this.game.requiredResources["FishermansCottage"].iron;
                
                this.game.foodRate += this.foodRate;
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
        const startY = 4 * 32;
        const startX = 32;
        //console.log(this.foodRate);
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

        if (!this.followMouse) {
            ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }
    };
};