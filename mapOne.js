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
        // if (this.game.click) {
        //     if(this.game.click.y < 11) {
        //         var x = this.game.click.x + this.game.camera.cameraX;
        //         var y = this.game.click.y + this.game.camera.cameraY;
        //         if (!this.map[y][x].filled && !this.map[y][x].collisions) {
        //             this.map[y][x].filled = true;
        //             let unit = new Ballista(this.game, x, y);
        //             this.game.addEntity(unit);
        //         }
        //         this.game.click = null;
        //     }
        // }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, (-this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (-this.game.camera.cameraY * PARAMS.BLOCKWIDTH));
    }
}