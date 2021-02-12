class MapOne {
    constructor(game) {
        Object.assign(this, { game });
        this.game.mainMap = this;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mapOneWithGrid.png");

    this.map = [];
        /*for (var i = 0; i < 50; i++) {
            this.map.push([]);
            for (var j = 0; j < 50; j++) {
                this.map[i].push({ "collisions": false, "green": false, "water": false, "ore": false, "filled": false });
                if (TileMaps.map.layers[0].data[j + (i * 50)] != 0) {
                    this.map[i][j].collisions = true;
                }
                if (TileMaps.map.layers[1].data[j + (i * 50)] != 0) {
                    this.map[i][j].green = true;
                }
                if (TileMaps.map.layers[2].data[j + (i * 50)] != 0) {
                    this.map[i][j].water = true;
                }
                if (TileMaps.map.layers[6].data[j + (i * 50)] != 0) {
                    this.map[i][j].ore = true;
                }
            }
        }*/
        
        //this.game.map = [];
        for (var i = 0; i < 50; i++) {
            this.map.push([]);
            for (var j = 0; j < 50; j++) {
                this.map[i].push({ "collisions": false, "green": false, "water": false, "dirt": false, "ore": false, "filled": false });
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
        console.log("map done:");
        console.log(this.map);
        // console.log(this.map);
    }

    update() {
        if(!PARAMS.DEBUG) {
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
                    //var x = (i * PARAMS.BLOCKWIDTH);
                    //var y = (j * PARAMS.BLOCKWIDTH);
                    var x = (i - this.game.camera.cameraX) * PARAMS.BLOCKWIDTH;
                    var y = (j - this.game.camera.cameraY+1) * PARAMS.BLOCKWIDTH;
                    ctx.fillText("(" + i + ", " + j + ")", x, y);   
                }
            }
            
        }
    }
}