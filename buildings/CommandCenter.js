class CommandCenter {
   constructor(game, x, y) {
      Object.assign(this, { game, x, y });

      this.x = x * PARAMS.BLOCKWIDTH;
      this.y = y * PARAMS.BLOCKWIDTH;
      this.hitpoints = 100;

      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
      //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/commandCenter.png");
   };

   update() {
      //collision detection
      for (const ent of this.game.entities) {
         if ((ent instanceof InfectedUnit || 
                  ent instanceof InfectedHarpy || 
                  ent instanceof InfectedVenom || 
                  ent instanceof InfectedChubby) && this.collide(ent)) {
               ent.state = 3;
         }
      }
   };
   
   draw(ctx) {
      const width = 64;
      const height = 64;
      const startY = 161;
      const startX = 128;

      ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH) , width * 2, height * 2);
     // ctx.drawImage(this.spritesheet, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 48 * 3, 48 * 3);
   };
};