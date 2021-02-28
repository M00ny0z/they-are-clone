class CommandCenter {
   constructor(game, x, y) {
      Object.assign(this, { game, x, y });

      this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2;
      this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2;
      this.hitpoints = 1000;
      this.radius = 80;

      /*for (var i = 34; i <= 36; i++) {
         for(var j = 27; j <= 29; j++) {
            this.game.mainMap.map[i][j].collisions = true;
         }
      }*/
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
      this.priority = BUILDINGPRIORITY;

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
         this.game.mainMap.map[(this.y - PARAMS.BLOCKWIDTH / 2) / PARAMS.BLOCKWIDTH][(this.x - PARAMS.BLOCKWIDTH / 2) / PARAMS.BLOCKWIDTH].collisions = false;
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

      const width = 64;
      const height = 64;
      const startY = 161;
      const startX = 128;
      
      ctx.drawImage(this.spritesheet, startX, startY, width, height, (this.x - PARAMS.BLOCKWIDTH / 2 - PARAMS.BLOCKWIDTH) - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (this.y - PARAMS.BLOCKWIDTH / 2 - PARAMS.BLOCKWIDTH) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 3);

      if (this.hitpoints < MAX_COMMANDCENTER_HEALTH) {
         drawHealthbar(ctx, this.hitpoints, this.x, this.y - 50, this.game, MAX_COMMANDCENTER_HEALTH);
      }


      if (PARAMS.DEBUG) {
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
         for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
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