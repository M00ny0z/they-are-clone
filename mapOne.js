class MapOne {
    constructor(game) {
        Object.assign(this, { game });
        this.game.mainMap = this;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mapOneWithGrid.png");

        this.map = [];
        for (var i = 0; i < 50; i++) {
            this.map.push([]);
            for (var j = 0; j < 50; j++) {
                this.map[i].push({ "collisions": false, "green": false, "water": false, "dirt": false, "stone": false, "iron": false, "filled": false });
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
        }
        console.log("map done:");
        console.log(this.map);

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
}