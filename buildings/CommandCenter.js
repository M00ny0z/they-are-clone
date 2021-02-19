class CommandCenter {
   constructor(game, x, y) {
      Object.assign(this, { game, x, y });

      this.x = x * PARAMS.BLOCKWIDTH;
      this.y = y * PARAMS.BLOCKWIDTH;
      this.hitpoints = 1000;
      this.radius = 5;

      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
   };

   collide(other) {
      return distance(this, other) < this.radius + other.radius;
   };

   update() {
      if (this.hitpoints <= 0) {
         this.removeFromWorld = true;
         this.game.mainMap.map[this.y/PARAMS.BLOCKWIDTH][this.x/PARAMS.BLOCKWIDTH].filled = false;
     }
   };
   
   draw(ctx) {
      const width = 64;
      const height = 64;
      const startY = 161;
      const startX = 128;

      ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH) , width * 2, height * 2);

      // if (PARAMS.DEBUG && !this.followMouse) {
      //    ctx.strokeStyle = "Red";
      //    ctx.beginPath();
      //    ctx.arc(this.x + PARAMS.BLOCKWIDTH/2 - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y + PARAMS.BLOCKWIDTH/2 - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), this.radius, 0, 2 * Math.PI);
      //    ctx.closePath();
      //    ctx.stroke();
      // }
   };

   drawMinimap(ctx, mmX, mmY) {
      if(this.x >= 0 && this.x <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && this.y >= 0 && this.y <= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
        ctx.fillStyle = "Green";
        ctx.fillRect(mmX + this.x * PARAMS.MINIMAPSCALE, mmY + this.y * PARAMS.MINIMAPSCALE, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
      }
  }
};