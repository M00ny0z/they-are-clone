class MapOne {
    constructor(game) {
        Object.assign(this, { game });
        this.game.mainMap = this;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mapOneWithGrid.png");
        this.priority = MAPPRIORITY;

        this.map = [];
        /*for (var i = 0; i < 50; i++) {
            this.map.push([]);
            for (var j = 0; j < 50; j++) {
                this.map[i].push({ "collisions": false, "green": false, "water": false, "dirt": false, "stone": false, "iron": false, "collisions": false,
                                    "fishermansCottage": false, "farm": false, "quarry": false, "sawmill": false});
                if (TileMaps.map.layers[0].data[j + (i * 50)] != 0) {
                    this.map[i][j].collisions = true;
                }
                if (TileMaps.map.layers[1].data[j + (i * 50)] != 0) {
                    this.map[i][j].green = true;
                }
                if (TileMaps.map.layers[2].data[j + (i * 50)] != 0) {
                    this.map[i][j].water = true;
                }
                if (TileMaps.map.layers[3].data[j + (i * 50)] == 116) { // 116 is dirt
                    this.map[i][j].dirt = true;
                }
                if (TileMaps.map.layers[6].data[j + (i * 50)] == 1374) { // 1374 is stone
                    this.map[i][j].stone = true;
                }
                if (TileMaps.map.layers[6].data[j + (i * 50)] == 1372) { // 1372 is iron
                    this.map[i][j].iron = true;
                }
            }
        }*/
        for (var x = 0; x < 50; x++) {
            this.map.push([]);
            for (var y = 0; y < 50; y++) {
                this.map[x].push({ "collisions": false, "green": false, "water": false, "dirt": false, "stone": false, "iron": false,
                "FishermansCottage": false, "Farm": false, "Quarry": false, "Sawmill": false});
            }
        }
        for (var i = 0; i < 2500; i++) {
            let x = i % 50; // column
            let y =  Math.floor(i / 50); // row
            
            //console.log(TileMaps.map.layers[0].data[i]);
            if (TileMaps.map.layers[0].data[i] != 0) {
                //console.log("true");
                this.map[x][y].collisions = true;
            }
            if (TileMaps.map.layers[1].data[i] != 0) {
                this.map[x][y].green = true;
            }
            if (TileMaps.map.layers[2].data[i] != 0) {
                this.map[x][y].water = true;
            }
            if (TileMaps.map.layers[3].data[i] == 116) { // 116 is dirt
                this.map[x][y].dirt = true;
            }
            if (TileMaps.map.layers[6].data[i] == 1374) { // 1374 is stone
                this.map[x][y].stone = true;
            }
            if (TileMaps.map.layers[6].data[i] == 1372) { // 1372 is iron
                this.map[x][y].iron = true;
            }
        }

        // commandcenter
        for (var x = 27; x < 30; x++) {
            for (var y = 34; y < 37; y++) {
                this.map[x][y].collisions = true;
                //this.map[x][y].collisions = true;
            }
        }

        console.log("map done:");
        console.log(this.map);
        //this.game.mainMap = this.map;
        //this.outputMapToText();

    }

    outputMapToText() {
        for (var x = 0; x < 50; x++) {
            this.map.push([]);
            for (var y = 0; y < 50; y++) {
                console.log("(" + x + ", " + y + "): " + "collisions: " + this.map[x][y].collisions + ", green: " + this.map[x][y].green + 
                            ", water: " + this.map[x][y].water + ", dirt: " + this.map[x][y].dirt + ", stone: " + this.map[x][y].stone + ", iron: " + this.map[x][y].iron +
                            ", fishermansCottage: " + this.map[x][y].fishermansCottage + ", farm: " + this.map[x][y].farm + 
                            ", quarry: " + this.map[x][y].quarry + ", sawmill: " + this.map[x][y].sawmill);
            }
        }
    }

    update() {
        if (!PARAMS.DEBUG) {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mapOne.png");
        } else {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mapOneWithGrid.png");
        }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, (-this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (-this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH * PARAMS.MAPWIDTH, PARAMS.BLOCKWIDTH * PARAMS.MAPHEIGHT);
        if (PARAMS.CORD) {
            //ctx.strokeStyle = 'Green';
            //ctx.strokeRect(x, y, this.width * scale, this.height * scale);
            ctx.font = "10px SpaceMono-Regular";
            ctx.fillStyle = "black";
            for (var i = 0; i < 50; i++) {
                for (var j = 0; j < 50; j++) {
                    var x = (j - this.game.camera.cameraX) * PARAMS.BLOCKWIDTH;
                    var y = (i - this.game.camera.cameraY + 1) * PARAMS.BLOCKWIDTH;
                    ctx.fillText("(" + j + ", " + i + ")", x, y);
                }
            }

        }
    }

    drawMinimap(ctx, mmX, mmY) {
        ctx.drawImage(this.spritesheet, mmX, mmY, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH * 4);
    }
}