class Ballista {
    constructor(game) {
        Object.assign(this, { game });
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ballista.png");
        this.priority = BUILDINGPRIORITY;

        this.radius = 30;
        this.visualRadius = 250;

        this.fireRate = 1;

        this.facing = 0;

        this.elapsedTime = 0;

        this.hitpoints = 200;

        this.followMouse = true;
        this.placeable = false;

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

        var spriteInfo = {
            'yStart': 0,
            'width': 64,
            'height': 64,
            'frames': 1,
            'speed': 0.1,
            'padding': 1
        };
        //0 = N
        this.animations.push(new Animator(this.spritesheet, 0, spriteInfo['yStart'], spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations.push(new Animator(this.spritesheet, 65, spriteInfo['yStart'], spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = E
        this.animations.push(new Animator(this.spritesheet, 134, spriteInfo['yStart'], spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = SE
        this.animations.push(new Animator(this.spritesheet, 198, spriteInfo['yStart'], spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = S
        this.animations.push(new Animator(this.spritesheet, 265, spriteInfo['yStart'], spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    
        if(PARAMS.PERFORMANCE_MEASURE) {
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] += 
              new Date().getTime() - this.performanceMeasuresStruct[nameOfThisFunction]["startTime"].getTime();
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] += 1;
        }
    }

    drawHealthbar(ctx) {
        let nameOfThisFunction = "drawHealthbar";
        if(PARAMS.PERFORMANCE_MEASURE) {
            if(this.performanceMeasuresStruct[nameOfThisFunction] == null) {
                //initialize
                this.performanceMeasuresStruct[nameOfThisFunction] = {};
                this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] = 0;
                this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] = 0;
            }
            this.performanceMeasuresStruct[nameOfThisFunction]["startTime"] = new Date();
        }
        
        const posX = this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH) - 30;
        const posY = this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH) - 20;

        ctx.save();

        ctx.strokeStyle = 'gray';
        ctx.strokeRect(posX, posY, 70, 8);
        
        ctx.fillStyle = 'white';
        ctx.fillRect(posX + 1, posY + 1, 68, 6);

        ctx.fillStyle = this.hitpoints >= 50 ? 'green' : 'red';
        ctx.fillRect(posX + 2, posY + 2, 66 * (this.hitpoints / MAX_UNIT_HEALTH), 3);
        
        ctx.restore();

        if(PARAMS.PERFORMANCE_MEASURE) {
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] += 
              new Date().getTime() - this.performanceMeasuresStruct[nameOfThisFunction]["startTime"].getTime();
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] += 1;
        }
    };

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
        
        this.elapsedTime += this.game.clockTick;

        if (this.hitpoints <= 0) {
            this.game.lsystem.report(BALLISTADEATH, this.sanitizedX, this.sanitizedY);
            this.removeFromWorld = true;
            this.game.workers -= this.game.requiredResources["Ballista"].workers;
            this.game.collisionMap[(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH][(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH] = 1; // 1 = no collision

            
        }

        for (var i = 0; i < NUMBEROFPRIORITYLEVELS; i++) {
            for (var j = 0; j < this.game.entities[i].length; j++) {
                var ent = this.game.entities[i][j];
                if ((ent instanceof InfectedUnit || ent instanceof InfectedHarpy || ent instanceof InfectedVenom || ent instanceof InfectedChubby) && canSee(this, ent)
                    && this.elapsedTime > this.fireRate) {
                    this.target = ent;
                    this.elapsedTime = 0;
                    this.game.addEntity(new Arrow(this.game, this.x, this.y, ent, true));
                }
            }
        }

        if (this.target != null) {
            this.directionVector = { x: (this.target.x - this.x), y: (this.target.y - this.y) };
            this.facing = getFacing(this.directionVector);
        }

        if (this.game.mouse && this.followMouse) {
            var x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            if (this.game.collisionMap[y][x] === 1) {
                this.placeable = true;
            } else {
                this.placeable = false;
            }
        }

        //placing selected entity
        if (this.game.click && this.followMouse) {
            var x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            if (this.game.collisionMap[y][x] === 1 && this.game.click.y < 15 && this.placeable) {
                this.game.collisionMap[y][x] = 0; // collision
                this.followMouse = false;
                this.sanitizedX = x;
                this.sanitizedY = y;
                this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;
                this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;

                this.game.workers += this.game.requiredResources["Ballista"].workers;
                this.game.food -= this.game.requiredResources["Ballista"].food;
                this.game.wood -= this.game.requiredResources["Ballista"].wood;
                this.game.stone -= this.game.requiredResources["Ballista"].stone;
                this.game.iron -= this.game.requiredResources["Ballista"].iron;
                this.game.click = null;
            }
        }

        if (this.game.doubleClick) {
            const doubleX = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            const doubleY = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);

            if (doubleX * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2 === this.x &&
                this.y === doubleY * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2) 
            {
                this.game.collisionMap[doubleY][doubleX] = 1;

                this.game.workers -= this.game.requiredResources["Ballista"].workers;
                this.removeFromWorld = true;
                this.game.doubleClick = null;
            }
        }

        if(PARAMS.PERFORMANCE_MEASURE) {
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] += 
              new Date().getTime() - this.performanceMeasuresStruct[nameOfThisFunction]["startTime"].getTime();
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] += 1;
        }
    };

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

        if (this.target != null) {
            switch (this.facing) {
                case 0:
                    this.facing = 2;
                    break;
                case 1:
                    this.facing = 1;
                    break;
                case 2:
                    this.facing = 0;
                    break;
                case 3:
                    this.facing = 7;
                    break;
                case 4:
                    this.facing = 6;
                    break;
                case 5:
                    this.facing = 5;
                    break;
                case 6:
                    this.facing = 4;
                    break;
                case 7:
                    this.facing = 3;
                    break;
            }
        }

        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            if (this.placeable) {
                ctx.strokeStyle = 'Green';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            } else {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            }
            ctx.drawImage(this.spritesheet, 0, 0, 64, 64, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }
        

        if (!this.followMouse) {
            if (this.facing < 5) {
                this.animations[this.facing].drawFrame(this.game.clockTick, ctx, (this.x - PARAMS.BLOCKWIDTH/2) - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (this.y - PARAMS.BLOCKWIDTH/2) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 0.75);
            } else {
                ctx.save();
                ctx.scale(-1, 1);
                this.animations[this.facing - (2 * (this.facing - 4))].drawFrame(this.game.clockTick, ctx, -(this.x - PARAMS.BLOCKWIDTH/2) - 48  + (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (this.y - PARAMS.BLOCKWIDTH/2) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 0.75);
                ctx.restore();
            }
        }

        if (this.hitpoints < MAX_BALLISTA_HEALTH) {
            drawHealthbar(ctx, this.hitpoints, this.x + 10, this.y - 15, this.game, MAX_BALLISTA_HEALTH);
        }

        if (PARAMS.DEBUG && !this.followMouse) {
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

        if((this.x - PARAMS.BLOCKWIDTH/2) >= 0 && (this.x - PARAMS.BLOCKWIDTH/2) <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && (this.y - PARAMS.BLOCKWIDTH/2) >= 0 && (this.y - PARAMS.BLOCKWIDTH/2)<= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
          ctx.fillStyle = "Green";
          ctx.fillRect(mmX + (this.x - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE, mmY + (this.y - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
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
};