class InfectedUnit {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.radius = 20;
        this.visualRadius = 200;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/infected_unit.png");

        this.velocity = { x: 0, y: 0 };
        this.maxSpeed = 50; // pixels per second

        this.animations = [];

        //0 = attack animations
        var spriteInfo = [];
        this.animations.push([]);
        spriteInfo= {   'state' :0, 
                        'xStart':0, 
                        'width':128, 
                        'height':80, 
                        'frames':12, 
                        'speed':.05, 
                        'padding':0 
                    };
        //0 = EAST
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 605, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 508, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 411, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 314, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 217, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 120, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 23, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 702, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //1 = death animations
        this.animations.push([]);
        spriteInfo= {   'state' :1, 
                        'xStart':1537, 
                        'width':128, 
                        'height':80, 
                        'frames':12, 
                        'speed':.05, 
                        'padding':0 
                    };
        //0 = EAST
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 605, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 508, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 411, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 314, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 217, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 120, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 23, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 702, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //2 = idle animations
        this.animations.push([]);
        spriteInfo= {   'state' :2, 
                        'xStart':3073, 
                        'width':128, 
                        'height':80, 
                        'frames':11, 
                        'speed':.05, 
                        'padding':0 
                    };
        //0 = EAST
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1387, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1290, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1193, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1096, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 999, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 902, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 805, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1484, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //3 = walk/run animations
        this.animations.push([]);
        spriteInfo= {   'state' :3, 
                        'xStart':0, 
                        'width':128, 
                        'height':80, 
                        'frames':12, 
                        'speed':.05, 
                        'padding':0 
                    };
        //0 = EAST
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1387, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1290, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1193, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1096, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 999, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 902, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 805, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1484, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

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
        for(var i = 0; i < 4; i++) {
            for(var j = 0; j < this.animations[i].length; j++) {
                this.animations[i][j].drawFrame(this.game.clockTick, ctx, this.x + j * 100, this.y + 100 * i, 1)
            }
        }
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