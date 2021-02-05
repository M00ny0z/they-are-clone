<<<<<<< HEAD
class FishermansCottage {
    constructor(game) {
        Object.assign(this, { game });
        this.x = null;
        this.y = null;

=======
class FishermansCottage { 
    constructor(game) {
        Object.assign(this, { game});
        this.health = 100;
        this.x = null;
        this.y = null;
 
>>>>>>> a810b73a6d42b7e46169587c0d9e20e6d0724754
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.followMouse = true;
        this.hitpoints = 100;
    };

    update() {

    };


    draw(ctx) {
<<<<<<< HEAD
        const width = 32;
        const height = 32;
        const startY = 4 * 32;
        const startX = 32;
        const xOffset = 20;
        const yOffset = 20;

         //ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x, this.y, width*2, height*2); 
        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            ctx.drawImage(this.spritesheet, startX, startY, width, height, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }

        if (!this.followMouse) {
            console.log(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH));
            ctx.drawImage(this.spritesheet, startX, startY, width, height, (this.x - this.game.camera.cameraX) * PARAMS.BLOCKWIDTH, (this.y - this.game.camera.cameraY) * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }
=======
       const width = 32;
       const height = 32;
       const startY = 4*32;
       const startX = 32;
       const xOffset = 20;
       const yOffset = 20;
 
       if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            ctx.drawImage(this.spritesheet, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, 64, 64);
        }   

        if(!this.followMouse){
            console.log(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH));
            ctx.drawImage(this.spritesheet, (this.x - this.game.camera.cameraX) * PARAMS.BLOCKWIDTH, (this.y - this.game.camera.cameraY) * PARAMS.BLOCKWIDTH, width, height);
        }

       //ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x, this.y, width*2, height*2); 
>>>>>>> a810b73a6d42b7e46169587c0d9e20e6d0724754
    };
};