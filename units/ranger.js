class Ranger {
  constructor(game, x, y, path) {
    Object.assign(this, { game, x, y, path });

    this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;
    this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;

    for (var i = 0; i < this.path.length; i++) {
        this.path[i] = { x: this.path[i].x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2, y: this.path[i].y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2 };
    }

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ranger.png");
    this.priority = ALLYUNITPRIORITY;

    this.radius = 15;
    this.visualRadius = 200;

    this.targetID = 0;
    if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID]; // if path is defined, set it as the target point

    // Calculating the velocity
    var dist = distance(this, this.target);
    this.maxSpeed = 35; // pixels per second
    this.velocity = {x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

    this.state = 0; // 0 walking, 1 attacking, 2 dead, 3 idel
    this.facing = 0; // 0 E, 1 NE, 2 N, 3 NW, 4 W, 5 SW, 6 S, 7 SE
    this.elapsedTime = 0;

    this.hitpoints = 80;

    this.animations = [];
    this.loadAnimations();
  }

  loadAnimations() {
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
  }

  update() {
    this.elapsedTime += this.game.clockTick;
    var dist = distance(this, this.target);
    this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
    
    //For debugging, constantly rotates entity
    // this.velocity = { x: Math.cos(this.elapsedTime), y: Math.sin(this.elapsedTime) };  


    if (this.hitpoints <= 0) this.removeFromWorld = true;

    if (this.target.removeFromWorld) {
        this.state = 0;
        this.target = this.path[this.targetID];
    };

    // If the entity arrived at the target, change to the next target.
    if (dist < 5) {
        // Check if enetity reached the last target, and there is no more target. If so, then state = idle.
        var incrementedTargetID = this.targetID + 1;
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

    // collision detection
    for (var i = 0; i < NUMBEROFPRIORITYLEVELS; i++) {
      for (var j = 0; j < this.game.entities[i].length; j++) {
          var ent = this.game.entities[i][j];
        if ((ent instanceof InfectedUnit || ent instanceof InfectedHarpy || ent instanceof InfectedVenom || ent instanceof InfectedChubby) && canSee(this, ent)) {
          if (this.state === 0) {
            this.state = 1;
            this.target = ent;
            this.elapsedTime = 0;
          } else if (this.elapsedTime > 1.5) {
            this.game.addEntity(new Arrow(this.game, this.x, this.y, ent, true));
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

  draw(ctx) {
    var xOffset = 0;
    var yOffset = 0;

    //It is written like (xOffset = width / 2 / 2) because the first /2 represents that it only needs to be shifted
    //half its width, and the second /2 is because the animator draws it at only 0.5 scale (see draw method below)
    switch(this.state) {
        case 0:
            xOffset = Math.floor(76/2/2);
            yOffset = Math.floor(68/2/2);
            break;
        case 1:
            xOffset = Math.floor(68/2/2);
            yOffset = Math.floor(89/2/2);
            break;
        case 2:
            xOffset = Math.floor(93/2/2);
            yOffset = Math.floor(89/2/2);
            break;
        case 3:
            xOffset = Math.floor(55/2/2);
            yOffset = Math.floor(68/2/2);
            break;
    }

    this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - xOffset - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 0.5);

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
  }

  drawMinimap(ctx, mmX, mmY) {
    if(this.x >= 0 && this.x <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && this.y >= 0 && this.y <= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
      ctx.fillStyle = "Green";
      ctx.fillRect(mmX + this.x * PARAMS.MINIMAPSCALE, mmY + this.y * PARAMS.MINIMAPSCALE, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
    }
  }
}
