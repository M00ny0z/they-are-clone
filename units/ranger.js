class Ranger {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });

    this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2;
    this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2;

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ranger.png");
    this.priority = ALLYUNITPRIORITY;

    this.radius = 15;
    this.visualRadius = 200;

    this.targetID = 0;
    this.target = null; // if path is defined, set it as the target point

    // Calculating the velocity
    this.maxSpeed = 35; // pixels per second
    this.velocity = 0;

    this.state = 3; // 0 walking, 1 attacking, 2 dead, 3 idel
    this.facing = 0; // 0 E, 1 NE, 2 N, 3 NW, 4 W, 5 SW, 6 S, 7 SE
    this.elapsedTime = 0;

    this.movingToSelectedPoint = false;
    this.selected = false;

    this.hitpoints = 80;

    //Performance Measuring Variables
    //2d array where first dimension is each function, second dimension: 0 = function name, 1 = start time
    if(PARAMS.PERFORMANCE_MEASURE) {
      this.performanceMeasuresStruct = {};
      this.totalLoadAnimationsRuntime = 0;
      this.totalLoadAnimationsRuns = 0;
    }

    this.animations = [];
    this.loadAnimations();
  }

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

    //-----------------------------
    //0 = walk/run animations
    this.animations.push([]);
    spriteInfo = {
      'state': 0,
      'xStart': 743,
      'width': 76,
      'height': 68,
      'frames': 10,
      'speed': 0.1,
      'padding': 2
    };
    //0 = E
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1647, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //1 = NE
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1577, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //2 = N
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1507, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //3 = NW
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1997, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //4 = W
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1927, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //5 = SW
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1857, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //6 = S
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1787, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //7 = SE
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1717, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

    //1 = attack animations
    this.animations.push([]);
    spriteInfo = {
      'state': 1,
      'xStart': 1,
      'width': 68,
      'height': 89,
      'frames': 15,
      'speed': .1,
      'padding': 2
    };
    //0 = E
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 199, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //1 = NE
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 108, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //2 = N
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 17, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //3 = NW
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 654, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //4 = W
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 563, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //5 = SW
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 472, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //6 = S
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 381, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //7 = SE
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 290, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

    //2 = death animations
    this.animations.push([]);
    spriteInfo = {
      'state': 2,
      'xStart': 1,
      'width': 93,
      'height': 89,
      'frames': 17,
      'speed': 0.1,
      'padding': 2
    };
    //0 = E
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 944, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //1 = NE
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 853, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //2 = N
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 762, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //3 = NW
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1399, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //4 = W
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1308, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //5 = SW
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1217, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //6 = S
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1126, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //7 = SE
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1035, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

    //3 = idle animations
    this.animations.push([]);
    spriteInfo = {
      'state': 3,
      'xStart': 1,
      'width': 55,
      'height': 68,
      'frames': 25,
      'speed': 0.1,
      'padding': 2
    };
    //0 = E
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2224, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //1 = NE
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2154, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //2 = N
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2084, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //3 = NW
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2574, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //4 = W
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2504, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //5 = SW
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2434, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //6 = S
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2364, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    //7 = SE
    this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2294, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

    if(PARAMS.PERFORMANCE_MEASURE) {
      this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] += 
        new Date().getTime() - this.performanceMeasuresStruct[nameOfThisFunction]["startTime"].getTime();
      this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] += 1;
    }
  }

  update() {
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

    if (this.target != null) {
      this.elapsedTime += this.game.clockTick;
      var dist = distance(this, this.target);
      this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

      if (this.hitpoints <= 0) { 
        this.removeFromWorld = true;
        this.game.workers += this.game.requiredResources["Ranger"].workers;
    }
      if (this.target.removeFromWorld) {
        this.state = 0;
      };

      // If the entity arrived at the target, change to the next target.
      if (dist < 5) {
        this.state = 3;
        if(this.movingToSelectedPoint === true) {
          this.movingToSelectedPoint = false;
        }
      }

      // collision detection
      for (var i = 0; i < NUMBEROFPRIORITYLEVELS; i++) {
        let closestEnt;
        for (const ent of this.game.entities[i]) {
          if ((ent instanceof InfectedUnit || ent instanceof InfectedHarpy || ent instanceof InfectedVenom || ent instanceof InfectedChubby) && canSee(this, ent)) {
            if (!closestEnt) {
              closestEnt = ent;
            }
            if (distance(this, closestEnt) > distance(this, ent)) {
              closestEnt = ent;
            }
            if (!this.movingToSelectedPoint) {
              if (this.state != 1) {
                this.state = 1;
                this.target = closestEnt;
                this.elapsedTime = 0;
              } else if (this.elapsedTime > 1.5) {
                this.game.addEntity(new Arrow(this.game, this.x, this.y, closestEnt, true));
                this.elapsedTime = 0;
              }
            }
          }
        }

        if (this.state == 0) {   // only moves when it is in walking state
          dist = distance(this, this.target);
          // Continually updating velocity towards the target. As long as the entity haven't reached the target, it will just keep updating and having the same velocity.
          // If reached to the target, new velocity will be calculated.
          this.x += this.velocity.x * this.game.clockTick;
          this.y += this.velocity.y * this.game.clockTick;
        }

        this.facing = getFacing(this.velocity);
      }
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

    //It is written like (xOffset = width / 2 / 2) because the first /2 represents that it only needs to be shifted
    //half its width, and the second /2 is because the animator draws it at only 0.5 scale (see draw method below)
    switch (this.state) {
      case 0:
        xOffset = Math.floor(76 / 2 / 2);
        yOffset = Math.floor(68 / 2 / 2);
        break;
      case 1:
        xOffset = Math.floor(68 / 2 / 2);
        yOffset = Math.floor(89 / 2 / 2);
        break;
      case 2:
        xOffset = Math.floor(93 / 2 / 2);
        yOffset = Math.floor(89 / 2 / 2);
        break;
      case 3:
        xOffset = Math.floor(55 / 2 / 2);
        yOffset = Math.floor(68 / 2 / 2);
        break;
    }

    if (this.hitpoints < MAX_RANGER_HEALTH) {
      drawHealthbar(ctx, this.hitpoints, this.x, this.y, this.game, MAX_RANGER_HEALTH);
    }

    this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - xOffset - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 0.5);

    if (this.target) {
      ctx.strokeStyle = "Black";
      ctx.beginPath();
      ctx.setLineDash([5, 15]);
      ctx.moveTo(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH));
      ctx.lineTo(this.target.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.target.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH));
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
      this.performanceMeasuresStruct[nameOfThisFunction]["draw"] += 
        new Date().getTime() - this.performanceMeasuresStruct[nameOfThisFunction]["startTime"].getTime();
      this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] += 1;
    }
  }

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
      this.performanceMeasuresStruct[nameOfThisFunction]["draw"] += 
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
