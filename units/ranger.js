class Ranger {
  constructor(game, x, y, path) {
    Object.assign(this, { game, x, y, path });

    // this.x = x * PARAMS.BLOCKWIDTH - 32;
    // this.y = y * PARAMS.BLOCKWIDTH - 32;
    // for (var i = 0; i < this.path.length; i++) {
    //     this.path[i] = { x: this.path[i].x * PARAMS.BLOCKWIDTH - 32, y: this.path[i].y * PARAMS.BLOCKWIDTH - 32 };
    // }

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ranger.png");

    this.radius = 40;
    this.visualRadius = 200;

    this.targetID = 0;
    if (this.path && this.path[this.targetID])
      this.target = this.path[this.targetID]; // if path is defined, set it as the target point

    // Calculating the velocity
    var dist = distance(this, this.target);
    this.maxSpeed = 100; // pixels per second
    this.velocity = {
      x: ((this.target.x - this.x) / dist) * this.maxSpeed,
      y: ((this.target.y - this.y) / dist) * this.maxSpeed,
    };

    this.state = 0; // 0 walking, 1 attacking, 2 dead, 3 idel
    this.facing = 0; // 0 E, 1 NE, 2 N, 3 NW, 4 W, 5 SW, 6 S, 7 SE
    this.elapsedTime = 0;

    this.hitpoints = 100;

    this.animations = [];
    this.loadAnimations();
  }

  loadAnimations() {
    var spriteInfo = {};

    //-----------------------------
    //0 = walk/run animations
    this.animations.push([]);
    spriteInfo = {
      state: 0,
      xStart: 743,
      yStart: 1507,
      width: 77,
      height: 69,
      frames: 10,
      speed: 0.1,
      padding: 1,
    };
    console.log(spriteInfo.yStart);

    //2 = N
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;
    //console.log(spriteInfo.yStart);

    //1 = NE
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //0 = E
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //7 = SE
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //6 = S
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //5 = SW
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //4 = W
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //3 = NW
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );

    //-----------------------
    //1 = attack animations
    this.animations.push([]);
    spriteInfo = {
      state: 1,
      xStart: 1,
      yStart: 15,
      width: 69,
      height: 90,
      frames: 15,
      speed: 0.1,
      padding: 1,
    };

    //2 = N
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //1 = NE
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //0 = E
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //7 = SE
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //6 = S
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //5 = SW
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //4 = W
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //3 = NW
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );

    //---------------------
    //2 = death animations
    this.animations.push([]);
    spriteInfo = {
      state: 2,
      xStart: 1,
      yStart: 762,
      width: 94,
      height: 90,
      frames: 17,
      speed: 0.1,
      padding: 1,
    };

    //2 = N
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //1 = NE
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //0 = E
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //7 = SE
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //6 = S
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //5 = SW
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //4 = W
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //3 = NW
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );


    //--------------------------
    //3 = idle animations
    this.animations.push([]);
    spriteInfo = {
      state: 3,
      xStart: 1,
      yStart: 2084,
      width: 56,
      height: 69,
      frames: 24,
      speed: 0.1,
      padding: 1,
    };

    //2 = N
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //1 = NE
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //0 = E
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //7 = SE
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //6 = S
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //5 = SW
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //4 = W
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
    spriteInfo.yStart += spriteInfo.height + spriteInfo.padding;

    //3 = NW
    this.animations[spriteInfo["state"]].push(
      new Animator(
        this.spritesheet,
        spriteInfo["xStart"],
        spriteInfo.yStart,
        spriteInfo["width"],
        spriteInfo["height"],
        spriteInfo["frames"],
        spriteInfo["speed"],
        spriteInfo["padding"],
        false,
        true
      )
    );
  }

  update() {
    this.elapsedTime += this.game.clockTick;
    var dist = distance(this, this.target);

    if (this.hitpoints <= 0) this.removeFromWorld = true;

    if (this.target.removeFromWorld) {
      this.state = 0;
      this.target = this.path[this.targetID];
    }

    // If the entity arrived at the target, change to the next target.
    if (dist < 5) {
      // Check if enetity reached the last target, and there is no more target. If so, then state = idle.
      var incrementedTargetID = this.targetID + 1;
      if (
        this.path[incrementedTargetID] === undefined &&
        this.target === this.path[this.targetID]
      ) {
        this.state = 3;
      }
      // Check if there is another target in the list of path - If not, just stay on the last target. &&
      // Check if the target is not the last point in the path (meaning it was a building) then don't advance to the next point of the path
      if (
        this.targetID < this.path.length - 1 &&
        this.target === this.path[this.targetID]
      ) {
        this.targetID++;
        this.target = this.path[this.targetID];
      }
    }

    // collision detection
    for (var i = 0; i < this.game.entities.length; i++) {
      var ent = this.game.entities[i];
      if ((ent instanceof InfectedUnit || ent instanceof InfectedHarpy || ent instanceof InfectedVenom || ent instanceof InfectedChubby) && canSee(this, ent)) {
        if (this.state === 0) {
          this.state = 1;
          this.target = ent;
          this.elapsedTime = 0;
        } else if (this.elapsedTime > 2.0) {
          this.game.addEntity(
            new SniperArrow(this.game, this.x, this.y, ent, true)
          );
          this.elapsedTime = 0;
        }
      }
    }

    if (this.state == 0) {
      // only moves when it is in walking state
      dist = distance(this, this.target);
      // Continually updating velocity towards the target. As long as the entity haven't reached the target, it will just keep updating and having the same velocity.
      // If reached to the target, new velocity will be calculated.
      this.velocity = {
        x: ((this.target.x - this.x) / dist) * this.maxSpeed,
        y: ((this.target.y - this.y) / dist) * this.maxSpeed,
      };
      this.x += this.velocity.x * this.game.clockTick;
      this.y += this.velocity.y * this.game.clockTick;
    }

    //For testing (make animation rotate clockwise)
    //this.velocity = { x: Math.cos(this.elapsedTime), y: Math.sin(this.elapsedTime) };

    this.facing = getFacing(this.velocity);
  }

  draw(ctx) {
    var xOffset = 0;
    var yOffset = 0;

    this.state = 1;
    switch (this.state) {
      case 0:
        xOffset = Math.floor(77 / 2);
        yOffset = Math.floor(69 / 2);
        break;
      case 1:
        xOffset = Math.floor(69 / 2);
        yOffset = Math.floor((90 + 20) / 2);
        break;
      case 2:
        xOffset = Math.floor(94 / 2);
        yOffset = Math.floor(90 / 2);
        break;
      case 3:
        xOffset = Math.floor(56 / 2);
        yOffset = Math.floor(69 / 2);
        break;
    }

    this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, this.x - xOffset, this.y - yOffset,1);

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
  }
}