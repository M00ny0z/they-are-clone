class CommandCenter {
   constructor(game, x, y) {
      Object.assign(this, { game, x, y });

      this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2;
      this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2;
      this.hitpoints = 1000;
      this.radius = 80;

      /*for (var i = 34; i <= 36; i++) {
         for(var j = 27; j <= 29; j++) {
            this.game.mainMap.map[i][j].collisions = true;
         }
      }*/
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
      this.priority = BUILDINGPRIORITY;
   };

   update() {
      if (this.hitpoints <= 0) {
         this.removeFromWorld = true;
         this.game.mainMap.map[(this.y - PARAMS.BLOCKWIDTH / 2) / PARAMS.BLOCKWIDTH][(this.x - PARAMS.BLOCKWIDTH / 2) / PARAMS.BLOCKWIDTH].collisions = false;
      }
   };

   draw(ctx) {
      const width = 64;
      const height = 64;
      const startY = 161;
      const startX = 128;
      
      ctx.drawImage(this.spritesheet, startX, startY, width, height, (this.x - PARAMS.BLOCKWIDTH / 2 - PARAMS.BLOCKWIDTH) - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (this.y - PARAMS.BLOCKWIDTH / 2 - PARAMS.BLOCKWIDTH) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 3);

      if (this.hitpoints < MAX_COMMANDCENTER_HEALTH) {
         drawHealthbar(ctx, this.hitpoints, this.x, this.y - 50, this.game, MAX_COMMANDCENTER_HEALTH);
      }


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
         for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                ctx.fillRect(mmX + (this.x - PARAMS.BLOCKWIDTH / 2) * PARAMS.MINIMAPSCALE + i - 2, mmY + (this.y - PARAMS.BLOCKWIDTH / 2) * PARAMS.MINIMAPSCALE + j - 2, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
            }
        }
      }
   }
};