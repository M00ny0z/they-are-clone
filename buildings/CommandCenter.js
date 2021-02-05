class CommandCenter {
   constructor(game) {
      Object.assign(this, { game });
      this.health = 100;
      this.x = null;
      this.y = null;


      this.x = x * PARAMS.BLOCKWIDTH;
      this.y = y * PARAMS.BLOCKWIDTH;
      this.health = 100;

      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
   };

   update() {

   };

   draw(ctx) {
      const width = 64;
      const height = 64;
      const startY = 161;
      const startX = 128;
      const xOffset = 20;
      const yOffset = 20;


      if (this.game.mouse && this.followMouse) {
         var mouse = this.game.mouse;
         ctx.drawImage(this.spritesheet, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, 64, 64);
      }

      if (!this.followMouse) {
         console.log(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH));
         ctx.drawImage(this.spritesheet, (this.x - this.game.camera.cameraX) * PARAMS.BLOCKWIDTH, (this.y - this.game.camera.cameraY) * PARAMS.BLOCKWIDTH, width, height);
      }
      //ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x, this.y, width*2, height*2); 
   };
};