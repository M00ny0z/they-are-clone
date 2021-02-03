class Farm { 
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.health = 100;
 
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
    };
 
    update() {
 
    };
 
    drawMinimap(ctx, mmX, mmY) {
    }
 
    draw(ctx) {
       const width = 32;
       const height = 32;
       const startY = 4*32;
       const startX = 64;
       ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x, this.y, width*2, height*2); 
    };
 };