class MachineGunTurret { 
   constructor(game) {
       Object.assign(this, { game });
       this.health = 100;
       this.x = null;
       this.y = null; 

      this.radius = 30;
      this.visualRadius = 600;

      this.fireRate = 2;

      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/machinegun_turret.png");

      this.state = 0;
      this.facing = 6; // 0 E, 1 NE, 2 N, 3 NW, 4 W, 5 SW, 6 S, 7 SE
      this.elapsedTime = 0;

      this.hitpoints = 100;

      this.animations = [];
      this.loadAnimations();
   };

   loadAnimations() {
      var spriteInfo = {};

        //0 = walk/run animations
        this.animations.push([]);
        spriteInfo = {
            'state': 0,
            'xStart': 0,
            'width': 128,
            'height': 128,
            'frames': 1,
            'speed': 1,
            'padding': 0
        };
        //0 = E
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 256, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 128, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 0, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 896, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 768, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 640, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 512, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 384, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
   }

   update() {
      this.elapsedTime += this.game.clockTick;

        if (this.hitpoints <= 0) {
            this.removeFromWorld = true;
        }

        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if ((ent instanceof InfectedUnit || ent instanceof InfectedHarpy || ent instanceof InfectedVenom || ent instanceof InfectedChubby) && canSee(this, ent)
                && this.elapsedTime > this.fireRate) {
                this.target = ent;
                this.elapsedTime = 0;
                this.game.addEntity(new CannonBall(this.game, this.x, this.y, ent, false));
            }
        }

        if (this.target != null) {
            this.directionVector = { x: (this.target.x - this.x), y: (this.target.y - this.y) };
            this.facing = getFacing(this.directionVector);
        }
   };

   draw(ctx) {
      const width = 128;
      const height = 128;
      const startY = 0;
      const startX = 0;
      const xOffset = 27;
      const yOffset = 38;

      if (this.game.mouse && this.followMouse) {
         var mouse = this.game.mouse;
<<<<<<< HEAD
         ctx.drawImage(this.spritesheet, startX, startY, width, height, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
     }

     if (!this.followMouse) {
         console.log(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH));
         ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
     }
   }
}
=======
         this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - xOffset - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 0.5);
      }

      if(!this.followMouse){
            console.log(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH));
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - xOffset - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 0.5);
      }
      
      if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), this.visualRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([]);
      }
   };
};
>>>>>>> 90cb3bc1d307f7a5d8868f954f715a815d777eb2
