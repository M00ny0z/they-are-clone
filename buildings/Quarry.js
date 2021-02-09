class Quarry {
    constructor(game) {
        Object.assign(this, { game});
        this.x = null;
        this.y = null;
        //this.x = x;
        //this.y = y;


        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.followMouse = true;
        this.placeable = false;
        this.hitpoints = 100;

        this.stoneRate = 0;
        this.ironRate = 0;
    };

     // takes gameEngines map object which is a 2D array of tiles
     calcResourceRate() {
        this.stoneRate = 0;
        this.ironRate = 0;
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
        //console.log("Wood resources is: " + this.woodRate);
        //this.game.woodRate += this.woodRate;
    }
    
    collide(other) {
        return distance(this, other) < this.radius + other.radius;
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
            //if (!this.game.mainMap.map[y][x].filled && !this.game.mainMap.map[y][x].collisions && this.game.click.y < 15 && this.placeable) {
            if (!this.game.mainMap.map[y][x].filled && !this.game.mainMap.map[y][x].collisions && this.game.click.y < 15) {
            
                this.game.mainMap.map[y][x].filled = true;
                this.followMouse = false;
                this.x = x * PARAMS.BLOCKWIDTH;
                this.y = y * PARAMS.BLOCKWIDTH;
                //this.calcResourceRate();
                this.game.stoneRate += this.stoneRate;
                this.game.ironRate += this.ironRate;

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
        const height = 64;
        const startY = 3 * 32;
        const startX = 0;

        //ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH) , width*1.5, height*1.5); // draw on map using the passed in x and y

        //ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH) , width*1.5, height*1.5); // draw on map using the passed in x and y


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

            this.calcResourceRate();

            ctx.drawImage(this.spritesheet, startX, startY, width, height, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
            ctx.strokeStyle = 'Purple';
            ctx.strokeRect((mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-2) * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH, 6 * PARAMS.BLOCKWIDTH);
               //ctx.strokeRect(0, 0, 200, 50);
            ctx.font = "15px SpaceMono-Regular";
            ctx.fillStyle = "lightgreen";
            ctx.fillText("Surround the stone and iron", (mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-1.7)*PARAMS.BLOCKWIDTH);
            ctx.fillText("rocks to acquire them", (mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-1.4)*PARAMS.BLOCKWIDTH);
            ctx.fillText(this.stoneRate + " stone", (mouse.x) * PARAMS.BLOCKWIDTH, (mouse.y+3)*PARAMS.BLOCKWIDTH);
            ctx.fillText(this.ironRate + " iron", (mouse.x) * PARAMS.BLOCKWIDTH, (mouse.y+3.3)*PARAMS.BLOCKWIDTH);
        }

        if (!this.followMouse) {
            //console.log(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH));
            ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH,  2 * PARAMS.BLOCKWIDTH);
        }
    };
};