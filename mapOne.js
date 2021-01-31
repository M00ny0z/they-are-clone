class MapOne {
    constructor(game) {
        Object.assign(this, { game });
        this.game.camera = this;
        this.cameraX = 25;
        this.cameraY = 25;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mapOneWithGrid.png");
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
        var mapImg = new Image();
        mapImg.src = './sprites/mapOneWithGrid.png';
        ctx.drawImage(mapImg, 0, 0)
    }
}