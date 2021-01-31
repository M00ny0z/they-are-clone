class WoodGateHorizontal { 
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
      const startY = 64;
      const startX = 64;
      const xOffset = 20;
      const yOffset = 20;

      ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x, this.y, width*2, height*2); 
   };
};