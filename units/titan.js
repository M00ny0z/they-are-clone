class Titan {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2;
        this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/titan.png");
        this.priority = ALLYUNITPRIORITY;

        this.radius = 10;

        this.attackSpeedInSec =  this.game.stats["Titan"].attackSpeedInSec
        this.visualRadius = this.game.stats["Titan"].visualRadius;
        this.maxSpeed = this.game.stats["Titan"].maxSpeed; // pixels per second
        this.hitpoints = this.game.stats["Titan"].health;

        this.targetID = 0;
        this.target = null;         // if path is defined, set it as the target point

        // Calculating the velocity
        this.velocity = 0;

        this.state = 3; // 0 walking, 1 attacking, 2 dead, 3 idel
        this.facing = 0; // 0 E, 1 NE, 2 N, 3 NW, 4 W, 5 SW, 6 S, 7 SE
        this.elapsedTime = 0;

        this.movingToSelectedPoint = false;
        this.selected = false;

        this.calculatingPath = false; // calculating A* path (EasyStar)
        this.path = []; // A* path

        //Performance Measuring Variables
        //2d array where first dimension is each function, second dimension: 0 = function name, 1 = start time
        if(PARAMS.PERFORMANCE_MEASURE) {
            this.performanceMeasuresStruct = {};
            this.totalLoadAnimationsRuntime = 0;
            this.totalLoadAnimationsRuns = 0;
        }

        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        let nameOfThisFunction = "loadAnimations";
        if(PARAMS.PERFORMANCE_MEASURE) {
            if(this.performanceMeasuresStruct[nameOfThisFunction] == null) {
                //initialize
                this.performanceMeasuresStruct[nameOfThisFunction] = {};
                this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] = 0;
                this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] = 0;
            }
            this.performanceMeasuresStruct[nameOfThisFunction]["startTime"] = new Date();
        }

        var spriteInfo = {};

        //0 = walk/run animations
        this.animations.push([]);
        spriteInfo = {
            'state': 0,
            'xStart': 3651,
            'width': 96,
            'height': 87,
            'frames': 8,
            'speed': 0.1,
            'padding': 0
        };
        //0 = E
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1375, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1280, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1185, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1085, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 990, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 895, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 795, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1475, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //1 = attack animations
        this.animations.push([]);
        spriteInfo = {
            'state': 1,
            'xStart': 1921,
            'width': 96,
            'height': 90,
            'frames': 20,
            'speed': .05,
            'padding': 0
        };
        //0 = E
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2057, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1960, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1862, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1766, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1668, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1573, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2252, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2155, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //2 = death animations
        this.animations.push([]);
        spriteInfo = {
            'state': 2,
            'xStart': 2049,
            'width': 128,
            'height': 90,
            'frames': 20,
            'speed': 0.1,
            'padding': 0
        };
        //0 = E
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 692, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 590, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 498, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 400, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 299, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 203, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 110, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 10, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //3 = idle animations
        this.animations.push([]);
        spriteInfo = {
            'state': 3,
            'xStart': 0,
            'width': 96,
            'height': 90,
            'frames': 10,
            'speed': 0.1,
            'padding': 0
        };
        //0 = E
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1080, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1080, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 985, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 890, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 795, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1470, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1375, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1280, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    
        if(PARAMS.PERFORMANCE_MEASURE) {
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] += 
              new Date().getTime() - this.performanceMeasuresStruct[nameOfThisFunction]["startTime"].getTime();
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] += 1;
        }
    }

   update() {
    this.elapsedTime += this.game.clockTick;

    let nameOfThisFunction = "update";
    if(PARAMS.PERFORMANCE_MEASURE) {
      if(this.performanceMeasuresStruct[nameOfThisFunction] == null) {
        //initialize
        this.performanceMeasuresStruct[nameOfThisFunction] = {};
        this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] = 0;
        this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] = 0;
      }
      this.performanceMeasuresStruct[nameOfThisFunction]["startTime"] = new Date();
    }

    if (!this.calculatingPath) { // if you are not calculating the A* path 
      if (this.path.length !== 0) { // if path length is not 0 yet (then you must still be walking along a path!!!!)
        this.state = 0;
        //console.log("path is: ")
        //console.log(this.path);

        // grab the next point in the path, and get it's pixel coordinates (center of the grid that it points to)
        let pathPoint = {x: convertGridCordToPixelCord(this.path[0].x) + PARAMS.BLOCKWIDTH/2, y: convertGridCordToPixelCord(this.path[0].y) + PARAMS.BLOCKWIDTH / 2}; // convert grid coordinate to pixel.
        var dist = distance(this, pathPoint); // find distance to next point in path
        let x = ( (pathPoint.x - this.x) / dist ) * this.maxSpeed; // update x velocity
        let y = ( (pathPoint.y - this.y) / dist ) * this.maxSpeed; // update y velocity
        this.velocity = {x, y}; // update your velocity, so that you will move towards the next point in path.
  
        if (dist < 5) { // If you are walking and have arrived at the intended point
          if (this.path.length === 1) { // if the point you arrived at is the last part of path
            this.state = 3; // then idle (because you are done traversing path)
            this.target = null; // null your target
          }
          this.path.shift();
        }
  
        if (this.state === 0) {   // if you are walking now (and haven't reached your point yet), then let's make you walk towards the point.          
          this.x += this.velocity.x * this.game.clockTick; // move you closer to your target point
          this.y += this.velocity.y * this.game.clockTick;
        }
        this.facing = getFacing(this.velocity); //  update your sprite facing direction 
      } else { // this.path.length == 0
        // user clicked on same square that unit is in
        if(this.state === 0) {  // if user is walking and they click on tile they are currently at.
            this.state = 3; // then idle (because you are done traversing path)
            this.target = null; // null your target
        }
      }
    }

    if (this.state != 0) { // if not walking, then let's check to see if there is something that you should attack.
      // collision detection
      let closestEnt; // reset your "closet entity" tracker
      for (var i = 0; i < NUMBEROFPRIORITYLEVELS; i++) { // traverse through all entities
        //let closestEnt; // reset your "closet entity" tracker
        for (const ent of this.game.entities[i]) { 
          // if enemy unit in view
          if ((ent instanceof InfectedUnit || ent instanceof InfectedHarpy || ent instanceof InfectedVenom || ent instanceof InfectedChubby) && canSee(this, ent)) {
            if (!closestEnt) { // set enemy to closest if not already set
              closestEnt = ent;
            }
            if (distance(this, closestEnt) > distance(this, ent)) { // otherwise, if closest is already set, check if the current entity is closer, and use it if needed.
              closestEnt = ent;
            }
            if (this.state != 1) { // if you have spotted a (closest) enemy that you can see
              this.state = 1; // set state to attacking
              this.target = closestEnt; // target the closest entity for attack
              this.elapsedTime = 0; // set elapsedTime to 0 at start of attack to sync attack animation and projectile.
            } else if (this.elapsedTime > this.attackSpeedInSec) { // attack the enemy (send out aa projectile) every 1.0 seconds.
              this.game.addEntity(new TitanArrow(this.game, this.x, this.y, closestEnt, true)); // attack.
              this.elapsedTime = 0; // reset counter, so that you can attack again using given timer.
            }
          }
        }
      }
      if (closestEnt) { // if there is a closest entity, orientate the sprite towards them.
        var dist = distance(this, closestEnt); // find distance to next point in path
        let x = ( (closestEnt.x - this.x) / dist ) * this.maxSpeed; // update x velocity
        let y = ( (closestEnt.y - this.y) / dist ) * this.maxSpeed; // update y velocity
        this.velocity = {x, y}; // update your velocity, so that you will move towards the next point in path.
        this.facing = getFacing(this.velocity); //  update your sprite facing direction 
      } else { // if no closest enemy
        this.state = 3; // set to idle.
      }
    }

    if (this.hitpoints <= 0) { 
      this.removeFromWorld = true;
      this.game.workers -= this.game.requiredResources["Titan"].workers;
    }
      

    if(PARAMS.PERFORMANCE_MEASURE) {
      this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] += 
        new Date().getTime() - this.performanceMeasuresStruct[nameOfThisFunction]["startTime"].getTime();
      this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] += 1;
    }
  }

    draw(ctx) {
        let nameOfThisFunction = "draw";
        if(PARAMS.PERFORMANCE_MEASURE) {
            if(this.performanceMeasuresStruct[nameOfThisFunction] == null) {
                //initialize
                this.performanceMeasuresStruct[nameOfThisFunction] = {};
                this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] = 0;
                this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] = 0;
            }
            this.performanceMeasuresStruct[nameOfThisFunction]["startTime"] = new Date();
        }

        var xOffset = 0;
        var yOffset = 0;

        switch (this.state) {
            case 0:
                xOffset = Math.floor(96 / 2 / 2);
                yOffset = Math.floor(87 / 2 / 2);
                break;
            case 1:
                xOffset = Math.floor(96 / 2 / 2);
                yOffset = Math.floor(90 / 2 / 2);
                break;
            case 2:
                xOffset = Math.floor(128 / 2 / 2);
                yOffset = Math.floor(90 / 2 / 2);
                break;
            case 3:
                xOffset = Math.floor(96 / 2 / 2);
                yOffset = Math.floor(90 / 2 / 2);
                break;
        }

        if (this.hitpoints < this.game.stats["Titan"].health) {
            drawHealthbar(ctx, this.hitpoints, this.x, this.y, this.game, this.game.stats["Titan"].health);
        }

        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - xOffset - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 0.5);

        if (this.state == 0) {
          ctx.strokeStyle = "Black";
          ctx.beginPath();
          ctx.setLineDash([5, 15]);
          ctx.moveTo(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH));
          for(var i =0; i < this.path.length; i++) {
            ctx.lineTo((this.path[i].x - this.game.camera.cameraX) * PARAMS.BLOCKWIDTH + + (PARAMS.BLOCKWIDTH / 2), 
            (this.path[i].y - this.game.camera.cameraY) * PARAMS.BLOCKWIDTH + + (PARAMS.BLOCKWIDTH / 2));
          }
          ctx.stroke();
          ctx.setLineDash([]);
      }

        if (this.selected) {
            ctx.strokeStyle = "blue";
            ctx.fillStyle = 'rgba(255,215,0,0.2)';
            ctx.beginPath();
            ctx.arc(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 15, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.stroke();
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

        if(PARAMS.PERFORMANCE_MEASURE) {
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] += 
              new Date().getTime() - this.performanceMeasuresStruct[nameOfThisFunction]["startTime"].getTime();
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] += 1;
        }
    };

    drawMinimap(ctx, mmX, mmY) {
        let nameOfThisFunction = "drawMinimap";
        if(PARAMS.PERFORMANCE_MEASURE) {
            if(this.performanceMeasuresStruct[nameOfThisFunction] == null) {
                //initialize
                this.performanceMeasuresStruct[nameOfThisFunction] = {};
                this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] = 0;
                this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] = 0;
            }
            this.performanceMeasuresStruct[nameOfThisFunction]["startTime"] = new Date();
        }

        if (this.x >= 0 && this.x <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && this.y >= 0 && this.y <= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
            ctx.fillStyle = "Green";
            ctx.fillRect(mmX + this.x * PARAMS.MINIMAPSCALE, mmY + this.y * PARAMS.MINIMAPSCALE, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
        }

        if(PARAMS.PERFORMANCE_MEASURE) {
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] += 
              new Date().getTime() - this.performanceMeasuresStruct[nameOfThisFunction]["startTime"].getTime();
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] += 1;
        }
    }

    printPerformanceReport() {
        console.log(this.__proto__.constructor.name + ":");
        for(const f of Object.keys(this.performanceMeasuresStruct)) {
          let totalRuntime = this.performanceMeasuresStruct[f]["totalRuntime"];
          let totalRuns = this.performanceMeasuresStruct[f]["totalRuns"];
          let averageTimePerCall = totalRuntime / totalRuns;
          console.log("     method name: " + f);
          console.log("         total runtime (seconds): " + Math.round(totalRuntime / 1000 * 10000000) / 100000000);
          console.log("         total # of runs: " + totalRuns);
          console.log("         average runtime per call: " + Math.round(averageTimePerCall / 1000 * 10000000) / 10000000);
        }
    }
}