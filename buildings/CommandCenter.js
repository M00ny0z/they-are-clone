class CommandCenter {
   constructor(game, x, y) {
      Object.assign(this, { game, x, y });

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

      ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH) , width * 2, height * 2);
   };
};