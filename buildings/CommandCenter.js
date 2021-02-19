class CommandCenter {
   constructor(game, x, y) {
      Object.assign(this, { game, x, y });

      this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2;
      this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2;
      this.hitpoints = 1000;
      this.radius = 80;

      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
   };

   update() {
      if (this.hitpoints <= 0) {
         this.removeFromWorld = true;
         this.game.mainMap.map[(this.y - PARAMS.BLOCKWIDTH / 2) / PARAMS.BLOCKWIDTH][(this.x - PARAMS.BLOCKWIDTH / 2) / PARAMS.BLOCKWIDTH].filled = false;
      }
   };

   draw(ctx) {
      const width = 64;
      const height = 64;
      const startY = 161;
      const startX = 128;

      ctx.drawImage(this.spritesheet, startX, startY, width, height, (this.x - PARAMS.BLOCKWIDTH / 2 - PARAMS.BLOCKWIDTH) - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (this.y - PARAMS.BLOCKWIDTH / 2 - PARAMS.BLOCKWIDTH) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 3);


      if (PARAMS.DEBUG) {
         ctx.strokeStyle = "Red";
         ctx.beginPath();
         ctx.arc(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), this.radius, 0, 2 * Math.PI);
         ctx.closePath();
         ctx.stroke();
      }

   };

   drawMinimap(ctx, mmX, mmY) {
      if ((this.x - PARAMS.BLOCKWIDTH / 2) >= 0 && (this.x - PARAMS.BLOCKWIDTH / 2) <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && (this.y - PARAMS.BLOCKWIDTH / 2) >= 0 && (this.y - PARAMS.BLOCKWIDTH / 2) <= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
         ctx.fillStyle = "Green";
         ctx.fillRect(mmX + (this.x - PARAMS.BLOCKWIDTH / 2) * PARAMS.MINIMAPSCALE, mmY + (this.y - PARAMS.BLOCKWIDTH / 2) * PARAMS.MINIMAPSCALE, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
      }
   }
};