
class Map {
    constructor(game) {
        Object.assign(this, { game });
        this.game.camera = this;
        this.cameraX = 25;
        this.cameraY = 25;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tile.png");

        this.map = [];
        for (var i = 0; i < PARAMS.MAPHEIGHT; i++) {
            this.map.push([]);
            for (var j = 0; j < PARAMS.MAPWIDTH; j++) {
                this.map[i].push({"tile":0, "filled":false});
            }
        }
        // this.map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    }

    cloneMap() {
        var m = [];
        for (var y = 0; y < PARAMS.MAPHEIGHT; y++) {
            m.push([]);
            for (var x = 0; x < PARAMS.MAPWIDTH; x++) {
                m[y].push(this.map[y][x]);
            }
        }
        return m;
    }

    update() {

        if(this.game.left){
            this.cameraX -= 1;
        }

        if(this.game.right){
            this.cameraX += 1;
        }

        if(this.game.up){
           this.cameraY -= 1;
        }

        if(this.game.down){
            this.cameraY += 1;
        }

        if (this.game.click) {
            var x = this.game.click.x + this.cameraX;
            var y = this.game.click.y + this.cameraY;
            if (!this.map[y][x].filled) {
                this.map[y][x].filled = true;
                let unit = new Unit(this.game, x, y);
                this.game.addEntity(unit);
            }
            this.game.click = null;
        }
        if (this.cameraX > 50) {
            this.cameraX = 50;
        }
        if(this.cameraX < 0) {
            this.cameraX = 0;
        }
        if (this.cameraY > 50) {
            this.cameraY = 50;
        }
        if(this.cameraY < 0) {
            this.cameraY = 0;
        }
    }

    draw(ctx) {
        //tile
        for (var y = 0; y < PARAMS.MAPHEIGHT; y++) {
            for (var x = 0; x < PARAMS.MAPWIDTH; x++) {
                if (this.map[y][x].tile === 0) {
                    ctx.drawImage(this.spritesheet, 495, 80, 60, 60, (x - this.cameraX) * PARAMS.BITWIDTH, (y - this.cameraY) * PARAMS.BITWIDTH, PARAMS.BITWIDTH, PARAMS.BITWIDTH); // dirt
                } else {
                    ctx.drawImage(this.spritesheet, 695, 85, 55, 55, (x - this.cameraX) * PARAMS.BITWIDTH, (y - this.cameraY) * PARAMS.BITWIDTH, PARAMS.BITWIDTH, PARAMS.BITWIDTH); // grass
               }
            }
        }

        //tree
        for(var y = 35; y <= 40; y++){
            for(var x = 70; x <= 80; x++){
                ctx.drawImage(this.spritesheet, 695, 85, 55, 55, (x - this.cameraX) * PARAMS.BITWIDTH, (y - this.cameraY) * PARAMS.BITWIDTH, PARAMS.BITWIDTH, PARAMS.BITWIDTH); 
                ctx.drawImage(this.spritesheet, 930, 900, 90, 120, (x - this.cameraX) * PARAMS.BITWIDTH, (y - this.cameraY) * PARAMS.BITWIDTH, PARAMS.BITWIDTH, PARAMS.BITWIDTH);
            }
        }
    }
}