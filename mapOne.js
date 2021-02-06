class MapOne {
    constructor(game) {
        Object.assign(this, { game });
        this.game.mainMap = this;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mapOneWithGrid.png");

        this.map = [];
        for (var i = 0; i < 50; i++) {
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
        }
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
    }
}