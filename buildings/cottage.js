class Cottage {
    constructor(game) {
        Object.assign(this, { game });
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.followMouse = true;
        this.placeable = false;
        this.hitpoints = 150;
        this.radius = 30;
        this.workerRate = 2;

        //Performance Measuring Variables
        //2d array where first dimension is each function, second dimension: 0 = function name, 1 = start time
        if(PARAMS.PERFORMANCE_MEASURE) {
            this.performanceMeasuresStruct = {};
            this.totalLoadAnimationsRuntime = 0;
            this.totalLoadAnimationsRuns = 0;
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

        if (this.hitpoints <= 0) {
            this.removeFromWorld = true;
            this.game.workerRate -= this.workerRate;
            this.game.mainMap.map[(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH][(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].filled = false;
            this.game.mainMap.map[(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH + 1][(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].filled = false;
        }
        
        if (this.game.mouse && this.followMouse) {
            var x = this.game.mouse.x + this.game.camera.cameraX;
            var y = this.game.mouse.y + this.game.camera.cameraY;
            if ((!this.game.mainMap.map[y][x].collisions && !this.game.mainMap.map[y][x].filled) &&
                (!this.game.mainMap.map[y+1][x].collisions && !this.game.mainMap.map[y+1][x].filled)) {
                this.placeable = true;
            } else {
                this.placeable = false;
            }
        }

        //placing selected entity
        if (this.game.click && this.followMouse) {
            var x = this.game.click.x + this.game.camera.cameraX;
            var y = this.game.click.y + this.game.camera.cameraY;
            if (this.game.click.y < 15 && this.placeable) {
                this.game.mainMap.map[y][x].filled = true;
                this.game.mainMap.map[y+1][x].filled = true;
                this.followMouse = false;
                this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;
                this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;

                this.game.workers -= this.game.requiredResources["Cottage"].workers;
                this.game.food -= this.game.requiredResources["Cottage"].food;
                this.game.wood -= this.game.requiredResources["Cottage"].wood;
                this.game.stone -= this.game.requiredResources["Cottage"].stone;
                this.game.iron -= this.game.requiredResources["Cottage"].iron;
                
                this.game.workerRate += this.workerRate;
            }
            this.game.click = null;
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
        const height = 47;
        const startY = 387;
        const startX = 56;
        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            if (this.placeable) {
                ctx.strokeStyle = 'Green';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
            } else {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
            }
            ctx.drawImage(this.spritesheet, startX, startY, width, height, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
            ctx.strokeStyle = 'Purple';
            ctx.strokeRect((mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-2) * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH, 6 * PARAMS.BLOCKWIDTH);
            ctx.font = "15px SpaceMono-Regular";
            ctx.fillStyle = "lightgreen";
            ctx.fillText("Place to recruit workers.", (mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-1.7)*PARAMS.BLOCKWIDTH);
            ctx.fillText(this.workerRate + " workers", (mouse.x) * PARAMS.BLOCKWIDTH, (mouse.y+3)*PARAMS.BLOCKWIDTH);
        }

        if(!this.followMouse){
            ctx.drawImage(this.spritesheet, startX, startY, width, height, (this.x - PARAMS.BLOCKWIDTH/2) - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (this.y - PARAMS.BLOCKWIDTH/2) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
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
        
        if((this.x - PARAMS.BLOCKWIDTH/2) >= 0 && (this.x - PARAMS.BLOCKWIDTH/2) <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && (this.y - PARAMS.BLOCKWIDTH/2) >= 0 && (this.y - PARAMS.BLOCKWIDTH/2)<= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
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