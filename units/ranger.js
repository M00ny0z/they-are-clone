class Ranger extends Entity {
  constructor(game, x, y, path) {
    const offset = 32;
    const radius = 40;
    const visualRadius = 200;
    const maxSpeed = 100;
    const hitpoints = 100;
    const offsetList = [
      { x: Math.floor(77 / 2), y: Math.floor(69 / 2) },
      { x: Math.floor(69 / 2), y: Math.floor((90 + 20) / 2) },
      { x: Math.floor(94 / 2), y: Math.floor(90 / 2) },
      { x: Math.floor(56 / 2), y: Math.floor(69 / 2) }
    ];
    const collisionFunction = () => {
      // collision detection
      for (const ent of this.game.entities) {
        if ((ent instanceof InfectedUnit || ent instanceof InfectedHarpy || ent instanceof InfectedVenom || ent instanceof InfectedChubby) && canSee(this, ent)) {
          if (this.state === 0) {
            this.state = 1;
            this.target = ent;
            this.elapsedTime = 0;
          } else if (this.elapsedTime > 1.5) {
            this.game.addEntity(new SniperArrow(this.game, this.x, this.y, ent, true));
            this.elapsedTime = 0;
          }
        }
      }
    };

    super(
      game, ASSET_MANAGER.getAsset("./sprites/ranger.png"),
      x, y, path, radius, visualRadius, maxSpeed, offset, offsetList, hitpoints, collisionFunction
    );
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

};
