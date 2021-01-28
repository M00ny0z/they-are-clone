class Sniper {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
 
        this.radius = 20;
        this.visualRadius = 200;
 
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/sniper.png");
 
        this.velocity = { x: 0, y: 0 };
        this.maxSpeed = 50; // pixels per second
 
        this.animations = [];
 
        //0 = attack animations
        var spriteInfo = [];
 
        this.animations.push([]);
        spriteInfo= {   'state' :0, 
                        'xStart':44, 
                        'width':47, 
                        'height':75, 
                        'frames':18, 
                        'speed':.1, 
                        'padding':114 
                    };
        //0 = EAST DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] + 26, 4115, spriteInfo['width'] + 15, spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'] - 15, false, true));
        //1 = NE DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] + 7, 4014, spriteInfo['width'] + 15, spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'] - 15, false, true));
        //2 = N DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3814, spriteInfo['width'] + 15, spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'] - 15, false, true));
        //3 = NW DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3599, spriteInfo['width'] + 20, spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'] - 20, false, true));
        //4 = W DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3289, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 3189, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2992, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 4423, spriteInfo['width'] + 30, spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'] - 30, false, true));
 
        //1 = death animations
        this.animations.push([]);
        spriteInfo= {   'state' :1, 
                        'xStart':2392, 
                        'width':50, 
                        'height':70, 
                        'frames':8, 
                        'speed':.1, 
                        'padding':26
                    };
        //0 = EAST DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] + 15, 2540, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] + 15, 2452, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] + 15, 2276, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] + 13, 2091, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1819, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] + 10, 2091, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1560, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2811, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
 
        //2 = idle animations
        this.animations.push([]);
        spriteInfo= {   'state' :2, 
                        'xStart':0, 
                        'width':35, 
                        'height':76, 
                        'frames':16, 
                        'speed':.08, 
                        'padding':13 
                    };
        //0 = EAST DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 908, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] + 13, 748, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] + 5, 588, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 418, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 256, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 177, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 20, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1152, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
 
        //3 = walk/run animations
        this.animations.push([]);
        spriteInfo= {   'state' :3, 
                        'xStart':0, 
                        'width':50, 
                        'height':85, 
                        'frames':8, 
                        'speed':.08, 
                        'padding':20
                    };
        //0 = EAST DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] + 20, 2538, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] + 20, 2450, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2270, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 2085, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1814, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1641, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1556, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE DONE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'] + 7, 2808, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
 
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
        this.animations[1][3].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
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