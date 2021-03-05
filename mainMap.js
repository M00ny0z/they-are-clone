/*class MapOne {
    constructor(game) {
        Object.assign(this, { game });
        this.game.camera = this;
        this.cameraX = 10;
        this.cameraY = 27;

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
    }


    update() {

        if (this.game.left) {
            this.cameraX -= 1;
        }

        if (this.game.right) {
            this.cameraX += 1;
        }

        if (this.game.up) {
            this.cameraY -= 1;
        }

        if (this.game.down) {
            this.cameraY += 1;
        }

        if (this.cameraX > 17) {
            this.cameraX = 17;
        }
        if (this.cameraX < 0) {
            this.cameraX = 0;
        }
        if (this.cameraY > 31) {
            this.cameraY = 31;
        }
        if (this.cameraY < 0) {
            this.cameraY = 0;
        }

        if (this.game.click) {
            var x = this.game.click.x;
            var y = this.game.click.y;
            if (!this.map[y][x].filled && !this.map[y][x].collisions && chosenBuilding) {
                this.map[y][x].filled = true;
                this.game.addEntity(chosenBuilding);
            }
            this.game.click = null;
        }
    }

    draw(ctx) {
        var mapImg = new Image();
        mapImg.src = './sprites/mapOneWithGrid.png';
        ctx.drawImage(mapImg, 0, 0)
    }
}*/