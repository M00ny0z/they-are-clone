class WoodGateVertical { 
    constructor(game) {
        Object.assign(this, { game });
        this.health = 100;
        this.x = null;
        this.y = null;
 
         this.radius = 50;
         this.visualRadius = 75;
 
         this.hitpoints = 100;
 
         this.animations = [];
 
        //Gate is closed by default
        this.state = 0;
        
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
    };

    collide(other) {
        return distance(this, other) < this.radius + other.radius;
    };
 
    update() {
       if (this.hitpoints <= 0) this.removeFromWorld = true;
 
       //detect if an ally unit is in range. if so, open gate.
       for (var i = 0; i < this.game.entities.length; i++) {
          var ent = this.game.entities[i];
          if ((ent instanceof Ranger ||  ent instanceof Soldier || ent instanceof Sniper || ent instanceof Titan || 
              ent instanceof Ballista) && canSee(this, ent)) {
              this.state = 1;
          } else {
             this.state = 0;
          }
      }
    };
 
    drawMinimap(ctx, mmX, mmY) {
    }
 
    draw(ctx) {
       const width = 64;
       const height = 64;
       const startY = 64;
       const startX = 64;
       const xOffset = 32;
       const yOffset = 38;
 
        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            if(this.state == 0) {
            ctx.drawImage(this.spritesheet, 64, 32, 32, 32, mouse.x * PARAMS.BLOCKWIDTH - xOffset, mouse.y - yOffset, width, height);
            } else if(this.state == 1) {
            ctx.drawImage(this.spritesheet, 96, 32, 32, 32, mouse.x * PARAMS.BLOCKWIDTH - xOffset, mouse.y - yOffset, width, height);
            }
        }   

       if(!this.followMouse){
            console.log(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH));
            if(this.state == 0) {
            ctx.drawImage(this.spritesheet, 64, 32, 32, 32, this.x - xOffset - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), width, height);
            } else if(this.state == 1) {
            ctx.drawImage(this.spritesheet, 96, 32, 32, 32, this.x - xOffset - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), width, height);
            }
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
