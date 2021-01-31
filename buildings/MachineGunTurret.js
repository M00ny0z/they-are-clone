class MachineGunTurret { 
   constructor(game, x, y) {
       Object.assign(this, { game, x, y });
       this.health = 100;

       this.spritesheet = ASSET_MANAGER.getAsset("./sprites/machinegun_turret.png");
   };

   update() {

   };

   drawMinimap(ctx, mmX, mmY) {
   }

   draw(ctx) {
      const width = 128;
      const height = 128;
      const startY = 0;
      const startX = 0;
      const xOffset = 20;
      const yOffset = 20;

      ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x, this.y, width, height); 
   };
};