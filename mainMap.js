class MapOne {
    constructor(game) {
        Object.assign(this, { game });
        this.game.camera = this;
        this.cameraX = 25;
        this.cameraY = 25;
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
        if (this.cameraX > 50) {
            this.cameraX = 50;
        }
        if (this.cameraX < 0) {
            this.cameraX = 0;
        }
        if (this.cameraY > 50) {
            this.cameraY = 50;
        }
        if (this.cameraY < 0) {
            this.cameraY = 0;
        }

        if (this.game.click) {
            // var x = this.game.click.x + 25;
            // var y = this.game.click.y + 25;

            var x = this.game.click.x;
            var y = this.game.click.y;
            console.log(x + " : " + y);
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
}