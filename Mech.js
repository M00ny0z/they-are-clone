class Mech {
   constructor(game, x, y) {
       Object.assign(this, { game, x, y });

       this.radius = 20;
       this.visualRadius = 200;

       this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mech.png");

       this.velocity = { x: 0, y: 0 };
       this.maxSpeed = 50; // pixels per second

       this.animations = [];

       //0 = attack animations
       var spriteInfo = [];

       this.animations.push([]);
       spriteInfo= {   'state' :0, 
                       'xStart':55, 
                       'width':103, 
                       'height':95, 
                       'frames':16, 
                       'speed':.08, 
                       'padding':79
                   };
       //0 = EAST DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 5264, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //1 = NE DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4982, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //2 = N DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4838, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //3 = NW DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4548, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //4 = W DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] - 10, 4265, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //5 = SW DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3985, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //6 = S DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3704, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //7 = SE DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 5689, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

       //1 = death animations
       this.animations.push([]);
       spriteInfo= {   'state' :1, 
                       'xStart':3201, 
                       'width':73, 
                       'height':91, 
                       'frames':5, 
                       'speed':.08, 
                       'padding':58
                  };
       //0 = EAST DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1182, spriteInfo['width'], spriteInfo['height'] + 10, spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //1 = NE DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 969, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //2 = N DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 864, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //3 = NW DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 545, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //4 = W DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 331, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //5 = SW DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 226, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //6 = S DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 23, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //7 = SE DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1393, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

       //2 = idle animations
       this.animations.push([]);
       spriteInfo= {   'state' :2, 
                       'xStart':721, 
                       'width':45, 
                       'height':94, 
                       'frames':16, 
                       'speed':.05, 
                       'padding':33
                   };
       //0 = EAST DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1189, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //1 = NE DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 996, spriteInfo['width'] + 10, spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'] - 10, false, true));
       //2 = N DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 802, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //3 = NW DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] - 10, 603, spriteInfo['width'] + 10, spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'] - 10, false, true));
       //4 = W DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] - 15, 407, spriteInfo['width'] + 10, spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'] - 10, false, true));
       //5 = SW DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 209, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //6 = S DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 15, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //7 = SE DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1385, spriteInfo['width'] + 10, spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'] - 10, false, true));

       //3 = walk/run animations
       this.animations.push([]);
       spriteInfo= {   'state' :3, 
                       'xStart':3280, 
                       'width':55, 
                       'height':93, 
                       'frames':8, 
                       'speed':.1, 
                       'padding':21
                   };
       //0 = EAST DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] + 15, 3025, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //1 = NE DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] + 10, 2815, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //2 = N DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] + 10, 2707, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //3 = NW DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2489, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //4 = W DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2173, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //5 = SW DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] + 15, 3237, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //6 = S DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1859, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
       //7 = SE DONE
       this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] + 10, 3344, spriteInfo['width'] + 5, spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'] - 5, false, true));

       this.state = 0; // 0 walking, 1 attacking, 2 dead

       this.facing = 0; // 0 = up, clockwise

       this.elapsedTime = 0;
   };

   update() {
      /* 
       this.elapsedTime += this.game.clockTick;
       this.velocity = { x: Math.cos(this.elapsedTime), y: Math.sin(this.elapsedTime) };

       this.facing = getFacing(this.velocity);
       */
   };

   draw(ctx) {
       this.animations[3][5].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    //    for(var i = 0; i < 4; i++) {
    //        for(var j = 0; j < this.animations[i].length; j++) {
    //            this.animations[i][j].drawFrame(this.game.clockTick, ctx, this.x + j * 100, this.y + 100 * i, 1)
    //        }
    //    }
       //this.animations[3][1].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1)
       /*
       var xOffset = 25;
       var yOffset = 30;
       if (this.state === 0) {
           switch (this.facing) {
               case 0:
                   xOffset = 22;
                   yOffset = 30;
                   break;
               case 1:
                   xOffset = 20;
                   yOffset = 28;
                   break;
               case 2:
                   xOffset = 18;
                   yOffset = 28;
                   break;
               case 3:
                   xOffset = 20;
                   yOffset = 25;
                   break;
               case 4:
                   xOffset = 22;
                   yOffset = 25;
                   break;
               case 5:
                   xOffset = 25;
                   yOffset = 25;
                   break;
               case 6:
                   xOffset = 30;
                   yOffset = 25;
                   break;
               case 7:
                   xOffset = 25;
                   yOffset = 25;
                   break;
           }
       }
       if (this.facing < 5) {
           this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - xOffset, this.y - yOffset, 1);
       } else {
           ctx.save();
           ctx.scale(-1, 1);
           this.animations[this.state][8 - this.facing].drawFrame(this.game.clockTick, ctx, -(this.x) - 48 + xOffset, this.y - yOffset, 1);
           ctx.restore();
       }

       if (PARAMS.DEBUG) {
           ctx.strokeStyle = "Red";
           ctx.beginPath();
           ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
           ctx.closePath();
           ctx.stroke();

           ctx.setLineDash([5, 15]);
           ctx.beginPath();
           ctx.arc(this.x, this.y, this.visualRadius, 0, 2 * Math.PI);
           ctx.closePath();
           ctx.stroke();
           ctx.setLineDash([]);
       }
       */
   };
}