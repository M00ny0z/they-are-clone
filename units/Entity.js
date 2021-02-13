class Entity {
   constructor(game, spritesheet, x, y, path, radius, visualRadius, maxSpeed, offset, offsetList, hitpoints, collisionFunction) {
      Object.assign(this, { game, spritesheet, x, y, path, radius, visualRadius, maxSpeed, offset, offsetList, hitpoints, collisionFunction });
 
      this.x = x * PARAMS.BLOCKWIDTH + offset;
      this.y = y * PARAMS.BLOCKWIDTH + offset;
      this.path = this.path.map((currentPath) => {
         const pathObj =          { 
            x: (currentPath.x * PARAMS.BLOCKWIDTH + offset),
            y: (currentPath.y * PARAMS.BLOCKWIDTH + offset)
         };
         return pathObj;
      });
      this.once = false;
 
      this.targetID = 0;
      if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID]; // if path is defined, set it as the target point
 
      // Calculating the velocity
      const dist = distance(this, this.target);
      this.velocity = {x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
 
      this.state = 0; // 0 walking, 1 attacking, 2 dead, 3 idel
      this.facing = 0; // 0 E, 1 NE, 2 N, 3 NW, 4 W, 5 SW, 6 S, 7 SE
      this.elapsedTime = 0;
 
      this.animations = [];
      this.loadAnimations();

   }

   drawHealthbar(ctx) {
      // 45
      // 40
      const posX = this.x - this.xOffset - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH);
      const posY = this.y - this.yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH);

      ctx.save();

      ctx.strokeStyle = 'gray';
      ctx.strokeRect(posX, posY, 100, 15);
      
      ctx.fillStyle = 'white';
      ctx.fillRect(posX + 1, posY + 1, 98, 13);

      ctx.fillStyle = this.hitpoints >= 50 ? 'green' : 'red';
      ctx.fillRect(posX + 2, posY + 2, 96 * (this.hitpoints / 100), 11);
      
      ctx.restore();
   };
 
   update() {
      this.elapsedTime += this.game.clockTick;
      let dist = distance(this, this.target);
      this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
        
      if (this.hitpoints <= 0) this.removeFromWorld = true;
 
      if (this.target.removeFromWorld) {
         this.state = 0;
         this.target = this.path[this.targetID];
      }
 
      // If the entity arrived at the target, change to the next target.
      if (dist < 5) {
         // Check if enetity reached the last target, and there is no more target. If so, then state = idle.
         const incrementedTargetID = this.targetID + 1;
         if (this.path[incrementedTargetID] === undefined && this.target === this.path[this.targetID]) {
            this.state = 3;
         }
         // Check if there is another target in the list of path - If not, just stay on the last target. &&
         // Check if the target is not the last point in the path (meaning it was a building) then don't advance to the next point of the path
         if (this.targetID < this.path.length - 1 && this.target === this.path[this.targetID]) {
            this.targetID++;
            this.target = this.path[this.targetID];
         }
      }
 
      this.collisionFunction();
 
      if (this.state == 0) {   // only moves when it is in walking state
         dist = distance(this, this.target);
         // Continually updating velocity towards the target. As long as the entity haven't reached the target, it will just keep updating and having the same velocity.
         // If reached to the target, new velocity will be calculated.
         this.x += this.velocity.x * this.game.clockTick;
         this.y += this.velocity.y * this.game.clockTick;
      }
 
      this.facing = getFacing(this.velocity);
   }
 
   draw(ctx) {
      if (this.offsetList.length > 0) {
         this.xOffset = this.offsetList[this.state].x;
         this.yOffset = this.offsetList[this.state].y;
      }
      
      this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.xOffset - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - this.yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 1);
      if (PARAMS.DEBUG) {
         ctx.strokeStyle = "Red";
         ctx.beginPath();
         ctx.arc(
            this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), 
            this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 
            this.radius, 0, 2 * Math.PI
         );
         ctx.closePath();
         ctx.stroke();
 
         ctx.setLineDash([5, 15]);
         ctx.beginPath();
         ctx.arc(
            this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), 
            this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 
            this.visualRadius, 0, 2 * Math.PI
         );
         ctx.closePath();
         ctx.stroke();
         ctx.setLineDash([]);
      }
   }
 }
 