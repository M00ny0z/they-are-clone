class Farm {
    constructor(game) {
        Object.assign(this, { game });
        this.x = null;
        this.y = null;
        this.placementX = null;
        this.placementY = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.spritesheetCrops = ASSET_MANAGER.getAsset("./sprites/crops.png");
        this.priority = BUILDINGPRIORITY;
        this.followMouse = true;
        this.placeable = false;
        this.hitpoints = 150;
        this.foodRate = 0;
        this.radius = 30;

        //Performance Measuring Variables
        //2d array where first dimension is each function, second dimension: 0 = function name, 1 = start time
        if(PARAMS.PERFORMANCE_MEASURE) {
            this.performanceMeasuresStruct = {};
            this.totalLoadAnimationsRuntime = 0;
            this.totalLoadAnimationsRuns = 0;
        }

        this.initializeCropSprites();
    };

    initializeCropSprites() {
        let nameOfThisFunction = "initializeCropSprites";
        if(PARAMS.PERFORMANCE_MEASURE) {
            if(this.performanceMeasuresStruct[nameOfThisFunction] == null) {
                //initialize
                this.performanceMeasuresStruct[nameOfThisFunction] = {};
                this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] = 0;
                this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] = 0;
            }
            this.performanceMeasuresStruct[nameOfThisFunction]["startTime"] = new Date();
        }

        let rowsOfCrops = 2;
        let numOfCropsInEachRow = 32;
        let numOfGrowthStages = 5;
        this.cropLocationsOnSpriteSheet = [];
        //Select a random crop
        let r = this.getRandomInt(0, rowsOfCrops - 1);
        let xLocationOnSpriteSheet = this.getRandomInt(0, 31) * 32;
        let yLocationOnSpriteSheet = r * 320 + 16;
        //Fill the farm with the crop (starting at stage 0)
        for (let i = 0; i < 5; i++) {
            this.cropLocationsOnSpriteSheet.push([]);
            for (let j = 0; j < 5; j++) {
                this.cropLocationsOnSpriteSheet[i][j] = { 
                    row: r,
                    x: xLocationOnSpriteSheet, 
                    y: yLocationOnSpriteSheet,
                    growthRate: this.getRandomInt(8, 24),
                    gameHourMade: (this.game.elapsedDay * 24) + this.game.elapsedHour
                };
            }
        }

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

    /**
     * 
     * @param {int} min Lower bound inclusive
     * @param {int} max Upper bound inclusive
     */
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    calcResourceRate() {
        let nameOfThisFunction = "calcResourceRate";
        if(PARAMS.PERFORMANCE_MEASURE) {
            if(this.performanceMeasuresStruct[nameOfThisFunction] == null) {
                //initialize
                this.performanceMeasuresStruct[nameOfThisFunction] = {};
                this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] = 0;
                this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] = 0;
            }
            this.performanceMeasuresStruct[nameOfThisFunction]["startTime"] = new Date();
        }

        this.foodRate = 0;
        // traverse from (-2,-2) to (+2,+2) from current (x,y) location (calculate a 5x5 grid of resources)
        let mapStartX = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX - 2);
        let mapStartY = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY - 2);
        let mapEndX = sanitizeCord(mapStartX + 4);
        let mapEndY = sanitizeCord(mapStartY + 4);
        for (var i = mapStartY; i <= mapEndY; i++) {
            for (var j = mapStartX; j <= mapEndX; j++) {
                if (this.game.mainMap.map[i][j].dirt) {
                    this.foodRate += 0.5;
                    //this.foodRate += 1;
                }
            }
        }
        if (PARAMS.RESOURCEXY) {
            console.log("mapStartX:" + mapStartX + ", mapStartY:" + mapStartY + ", mapEndX:" + mapEndX + ", mapEndY: " + mapEndY);
        }

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

        let currentGameHour = (this.game.elapsedDay * 24) + this.game.elapsedHour;

        //update crop growth stages
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let currentCrop = this.cropLocationsOnSpriteSheet[i][j];
                let hoursPerGrowthStage = currentCrop.growthRate;
                //Current growth stage = hours passed % (# of stages * # of hours per stage) / hours per stage
                let currentGrowthStage = 
                    Math.floor((currentGameHour - currentCrop.gameHourMade) % (5 * hoursPerGrowthStage) / hoursPerGrowthStage);
                //320 is the y value that would be after the last growth stage, so cycle to the earliest growth stage
                currentCrop.y = (currentGrowthStage * 64) + (currentCrop.row * 320) + 16;
            }
        }

        if (this.hitpoints <= 0) {
            this.game.lsystem.report(FARMDEATH, this.sanitizedX, this.sanitizedY);
            this.removeFromWorld = true;
            this.game.workers -= this.game.requiredResources["Farm"].workers;
            this.game.foodRate -= this.foodRate;
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 5; j++) {
                    this.game.collisionMap[(this.y - PARAMS.BLOCKWIDTH / 2) / PARAMS.BLOCKWIDTH + i - 2][(this.x - PARAMS.BLOCKWIDTH / 2) / PARAMS.BLOCKWIDTH + j - 2] = 1;
                }
            }
        }

        if (this.game.mouse && this.followMouse) {
            var x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            var stop = false;
            //console.log()
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 5; j++) {
                    let yGrid = sanitizeCord(y + i - 2);
                    let xGrid = sanitizeCord(x + j - 2);
                    /*if (this.game.mainMap.map[yGrid][xGrid].farm === false) {

                    } else {
                        console.log("false for: (" + yGrid + ", (" + xGrid);
                    }*/
                    //if (this.game.collisionMap[yGrid][xGrid] === 1 && this.game.mainMap.map[yGrid][xGrid].farm === false && this.game.mainMap.map[yGrid][xGrid].dirt === true) { 
                    if (this.game.collisionMap[yGrid][xGrid] === 1 && this.game.mainMap.map[yGrid][xGrid].dirt === true) {
                        this.placeable = true;
                    } else {
                        stop = true;
                    }
                }
                if (stop) {
                    this.placeable = false;
                    break;
                }
            }
            this.calcResourceRate();
        }

        //placing selected entity
        if (this.game.click && this.followMouse) {
            const x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            const y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            this.game.collisionMap[y][x] = 0 // set collision for farm building
            if (this.game.click.y < 15 && this.placeable) {
                for (var i = 0; i < 5; i++) {
                    for (var j = 0; j < 5; j++) {
                        //this.game.collisionMap[sanitizeCord(y + i - 2)][sanitizeCord(x + j - 2)] = 0;
                        this.game.mainMap.map[sanitizeCord(y + i - 2)][sanitizeCord(x + j - 2)].farm = true;
                    }
                }
                this.followMouse = false;
                this.sanitizedX = x;
                this.sanitizedY = y;
                this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2;
                this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2;

                this.game.workers += this.game.requiredResources["Farm"].workers;
                this.game.food -= this.game.requiredResources["Farm"].food;
                this.game.wood -= this.game.requiredResources["Farm"].wood;
                this.game.stone -= this.game.requiredResources["Farm"].stone;
                this.game.iron -= this.game.requiredResources["Farm"].iron;

                this.game.foodRate += this.foodRate;
            }
        }

        if (this.game.doubleClick) {
            const doubleX = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            const doubleY = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);

            if (doubleX * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2 === this.x &&
                this.y === doubleY * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2) 
            {
                this.game.collisionMap[sanitizeCord(doubleY)][sanitizeCord(doubleX)] = 1; // set farm position to be not a collision
                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 5; j++) {
                        //this.game.collisionMap[sanitizeCord(doubleY + i - 2)][sanitizeCord(doubleX + j - 2)] = 1;
                        this.game.mainMap.map[sanitizeCord(doubleY + i - 2)][sanitizeCord(doubleX + j - 2)].farm = false;
                    }
                }

                this.game.foodRate -= this.foodRate;
                this.game.workers -= this.game.requiredResources["Farm"].workers;
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

        const width = 32;
        const height = 32;
        const startY = 4 * 32;
        const startX = 64;

        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            if (this.placeable) {
                ctx.strokeStyle = 'Green';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            } else {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            }

            ctx.drawImage(this.spritesheet, startX, startY, width, height, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            ctx.strokeStyle = 'Purple';
            ctx.strokeRect((mouse.x - 2) * PARAMS.BLOCKWIDTH, (mouse.y - 2) * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH);
            ctx.font = "15px SpaceMono-Regular";
            ctx.fillStyle = "lightgreen";
            ctx.fillText("Surround the dirt tiles", (mouse.x - 2) * PARAMS.BLOCKWIDTH, (mouse.y - 1.7) * PARAMS.BLOCKWIDTH);
            ctx.fillText("to gain food", (mouse.x - 2) * PARAMS.BLOCKWIDTH, (mouse.y - 1.4) * PARAMS.BLOCKWIDTH);
            ctx.fillText(this.foodRate + " food", (mouse.x) * PARAMS.BLOCKWIDTH, (mouse.y + 3) * PARAMS.BLOCKWIDTH);

        }

        let cropStartX;
        let cropsStartY;
        const cropsWidth = 32;
        const cropsHeight = 48;
        if (!this.followMouse) {
            //Draw farm building in center
            ctx.drawImage(this.spritesheet, startX, startY, width, height, (this.x - PARAMS.BLOCKWIDTH / 2) - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (this.y - PARAMS.BLOCKWIDTH / 2) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            //Draw crops around building
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (!(i == 2 && j == 2)) {
                        ctx.drawImage(this.spritesheetCrops,
                            this.cropLocationsOnSpriteSheet[i][j].x,
                            this.cropLocationsOnSpriteSheet[i][j].y,
                            cropsWidth,
                            cropsHeight,
                            (this.x - PARAMS.BLOCKWIDTH / 2) - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH) - (j - 2) * PARAMS.BLOCKWIDTH,
                            (this.y - PARAMS.BLOCKWIDTH / 2) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH) - (i - 2) * PARAMS.BLOCKWIDTH,
                            PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH
                        );
                    }
                }
            }
        }

        if (this.hitpoints < MAX_FARM_HEALTH) {
            drawHealthbar(ctx, this.hitpoints, this.x, this.y, this.game, MAX_FARM_HEALTH);
        }

        if (PARAMS.DEBUG && !this.followMouse) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
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

        if ((this.x - PARAMS.BLOCKWIDTH / 2) >= 0 && (this.x - PARAMS.BLOCKWIDTH / 2) <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && (this.y - PARAMS.BLOCKWIDTH / 2) >= 0 && (this.y - PARAMS.BLOCKWIDTH / 2) <= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
            ctx.fillStyle = "Green";
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 5; j++) {
                    ctx.fillRect(mmX + (this.x - PARAMS.BLOCKWIDTH / 2) * PARAMS.MINIMAPSCALE + i - 2, mmY + (this.y - PARAMS.BLOCKWIDTH / 2) * PARAMS.MINIMAPSCALE + j - 2, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
                }
            }
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