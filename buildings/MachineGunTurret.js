class MachineGunTurret { 
   constructor(game) {
       Object.assign(this, { game});
       this.health = 100;
       this.x = null;
       this.y = null;

       this.spritesheet = ASSET_MANAGER.getAsset("./sprites/machinegun_turret.png");
   };

   update() {

   };

   draw(ctx) {
      const width = 128;
      const height = 128;
      const startY = 0;
      const startX = 0;
      const xOffset = 20;
      const yOffset = 20;

      if (this.game.mouse && this.followMouse) {
         var mouse = this.game.mouse;
         ctx.drawImage(this.spritesheet, startX, startY, width, height, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
     }

     if (!this.followMouse) {
         console.log(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH));
         ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
     }
   }
}