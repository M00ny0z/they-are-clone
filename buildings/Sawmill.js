class Sawmill {
    constructor(game) {
        Object.assign(this, { game});
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.priority = BUILDINGPRIORITY;
        this.followMouse = true;
        this.placeable = false;
        this.hitpoints = 150;
        this.radius = 50;
        
        this.woodRate = 0;

        //Performance Measuring Variables
        //2d array where first dimension is each function, second dimension: 0 = function name, 1 = start time
        if(PARAMS.PERFORMANCE_MEASURE) {
            this.performanceMeasuresStruct = {};
            this.totalLoadAnimationsRuntime = 0;
            this.totalLoadAnimationsRuns = 0;
        }
    };

    // takes gameEngines map object which is a 2D array of tiles
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

        this.woodRate = 0;
        // traverse from (-2,-2) to (+2,+2) from current (x,y) location (calculate a 5x5 grid of resources)
        let mapStartX = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX - 2);
        let mapStartY = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY - 2);
        let mapEndX = sanitizeCord(mapStartX + 4);
        let mapEndY = sanitizeCord(mapStartY + 5);
        for (var i = mapStartY; i <= mapEndY; i++) {
            for (var j = mapStartX; j <= mapEndX; j++) {
                if (this.game.mainMap.map[i][j].green) {
                    this.woodRate += 1;
                }
            }
        }
        if (PARAMS.RESOURCEXY){ 
            console.log("mapStartX:" + mapStartX + ", mapStartY:" +  mapStartY + ", mapEndX:" + mapEndX + ", mapEndY: " + mapEndY);
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

        if (this.hitpoints <= 0) {
            this.removeFromWorld = true;
            this.game.workers += this.game.requiredResources["Sawmill"].workers;
            this.game.woodRate -= this.woodRate;
            this.game.mainMap.map[(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH][(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].collisions = false;
            this.game.mainMap.map[(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH + 1][(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].collisions = false;
            this.game.mainMap.map[(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH][(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].Sawmill = false;
            this.game.mainMap.map[(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH + 1][(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].Sawmill = false;
        }
        
        if (this.game.mouse && this.followMouse) {
            var x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            if ((y+1 <= 49) && // cursor is not at bottom edge of map (and therefore can place 2nd half of building)
                (!this.game.mainMap.map[y][x].collisions) &&
                (!this.game.mainMap.map[y+1][x].collisions) &&
                checkSameBuildingTypeInMapResourceGrid("Sawmill", x, y, 5, 2)) {
                    this.placeable = true;
            } else {
                this.placeable = false;
            }
            this.calcResourceRate();
        }

        //placing selected entity
        if (this.game.click && this.followMouse) {
            var x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            if (!this.game.mainMap.map[y][x].collisions && this.game.click.y < 15 && this.placeable) {
                this.game.mainMap.map[y][x].collisions = true;
                this.game.mainMap.map[y+1][x].collisions = true;
                this.game.mainMap.map[y][x].Sawmill = true;
                this.game.mainMap.map[y+1][x].Sawmill = true;
                this.followMouse = false;
                this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;
                this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;

                this.game.workers -= this.game.requiredResources["Sawmill"].workers;
                this.game.food -= this.game.requiredResources["Sawmill"].food;
                this.game.wood -= this.game.requiredResources["Sawmill"].wood;
                this.game.stone -= this.game.requiredResources["Sawmill"].stone;
                this.game.iron -= this.game.requiredResources["Sawmill"].iron;

                this.game.woodRate += this.woodRate;
                this.game.click = null;
            }
        }

        if (this.game.doubleClick) {
            const doubleX = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            const doubleY = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);

            if ((doubleX * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2) === this.x &&
                this.y === (doubleY * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2)) 
            {

                this.game.mainMap.map[doubleY][doubleX].collisions = false;
                this.game.mainMap.map[doubleY + 1][doubleX].collisions = false;
                this.game.mainMap.map[doubleY][doubleX].Sawmill = false;
                this.game.mainMap.map[doubleY + 1][doubleX].Sawmill = false;

                this.game.woodRate -= this.woodRate;
                this.game.workers += this.game.requiredResources["Sawmill"].workers;
                this.game.workerRate += this.game.requiredResources["Sawmill"].workers;
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
        const height = 64;
        const startY = 3 * 32;
        const startX = 3 * 32;

        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            if (this.placeable) {
                ctx.strokeStyle = 'Green';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 2 *PARAMS.BLOCKWIDTH);
            } else {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
            }

            ctx.drawImage(this.spritesheet, startX, startY, width, height, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
            ctx.strokeStyle = 'Purple';
            ctx.strokeRect((mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-2) * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH, 6 * PARAMS.BLOCKWIDTH);
               //ctx.strokeRect(0, 0, 200, 50);
            ctx.font = "15px SpaceMono-Regular";
            ctx.fillStyle = "lightgreen";
            ctx.fillText("Surround the green tiles", (mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-1.7)*PARAMS.BLOCKWIDTH);
            ctx.fillText("to gain wood", (mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-1.4)*PARAMS.BLOCKWIDTH);
            ctx.fillText(this.woodRate + " wood", (mouse.x) * PARAMS.BLOCKWIDTH, (mouse.y+3)*PARAMS.BLOCKWIDTH);

        }

        if (!this.followMouse) {
            ctx.drawImage(this.spritesheet, startX, startY, width, height, (this.x - PARAMS.BLOCKWIDTH/2) - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (this.y - PARAMS.BLOCKWIDTH/2) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
        }

        if (this.hitpoints < MAX_SAWMILL_HEALTH) {
            drawHealthbar(ctx, this.hitpoints, this.x, this.y, this.game, MAX_SAWMILL_HEALTH);
        }

        if (PARAMS.DEBUG && !this.followMouse) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (this.y + PARAMS.BLOCKWIDTH / 2) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), this.radius, 0, 2 * Math.PI);
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

        if((this.x - PARAMS.BLOCKWIDTH/2) >= 0 && (this.x - PARAMS.BLOCKWIDTH/2) <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && (this.y - PARAMS.BLOCKWIDTH/2) >= 0 && (this.y - PARAMS.BLOCKWIDTH/2) <= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
          ctx.fillStyle = "Green";
          ctx.fillRect(mmX + (this.x - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE, mmY + (this.y - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
          ctx.fillRect(mmX + (this.x - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE, mmY + (this.y - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE + 1, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
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