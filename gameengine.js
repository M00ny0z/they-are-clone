// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor() {
        this.entities = [];

        this.ctx = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        this.startDate = new Date();
        this.hasPrintedReport = false;

        this.click = null;
        this.doubleClick = null;
        this.mouse = null;
        this.rightClick = null;

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        this.isDrawingRectangle = false;
        this.isDoneDrawing = false;
        this.rectangleStartX = undefined;
        this.rectangleStartY = undefined;
        this.rectangleEndX = undefined;
        this.rectangleEndY = undefined;

        //Boolean where true means that the game was won, false means that the game was lost
        this.wonTheGameFlag;
        this.gameOver = false;

        // // Time: 1 hour is 1 second, 1 day is 24 seconds
        // this.time = 0; // Elapsed time in Seconds (Decimal):  EX: 52.7345 
        // this.timeAsIntInSeconds = 0; // Elapsed Time in Seconds (Int):  EX: 52
        //this.day = 0; // integer day value:  EX: 52 / 24 = 2 days
        this.hour = 0; // integer hour value of the current day (0-23): EX: 52%24 = 4 hours into day 3 (So the value is 4)
        this.hourPrev = 1; // integer hour value of the current day (0-23): EX: 52%24 = 4 hours into day 3 (So the value is 4)
        this.elapsedHour = 0;
        this.elapsedDay = 0;
        this.workers = 0;
        this.maxWorkers = 25;
        this.food = 100;
        this.foodRate = 0;
        this.maxFood = 1000;
        this.wood = 100;
        this.woodRate = 0;
        this.maxWood = 1000;
        this.stone = 50;
        this.stoneRate = 0;
        this.maxStone = 1000;
        this.iron = 0;
        this.ironRate = 0;
        this.maxIron = 1000;
        this.elapsedHourPrev = 1;
        this.zoom = 1 // zoom factor of map, and all units.
        this.ready = false; // wait for game to load, before we let ui clickable.

        //this.food=1000;

        // For testing:
        /*this.food = 1000;
        this.wood = 1000;
        this.stone = 1000;
        this.iron = 1000;
        */
        //this.entities = {};
        /*this.entities["WoodHouse"] = {
            resources = {
                requires: {workers: 0, food: 0, wood: 20, stone: 0, iron: 0},
                provides: {workers: 0, food: 0, wood: 20, stone: 0, iron: 0},
                enoughResources = false
            },
            description = ["Basic dwelling for the colonists.", "Colonists provide workers for the colony."]
    }*/

        //this.requiredResourcesArray = ["workers", "food", "wood", "stone", "iron"]; // list of resources to traverse
        this.requiredResources = {};
        this.requiredResources["WoodHouse"] = { workers: 0, food: 0, wood: 50, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["StoneHouse"] = { workers: 0, food: 0, wood: 0, stone: 50, iron: 0, enoughResource: false };
        this.requiredResources["ApartmentComplex"] = { workers: 0, food: 0, wood: 50, stone: 50, iron: 20, enoughResource: false };

        this.requiredResources["FishermansCottage"] = { workers: 1, food: 0, wood: 30, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["Farm"] = { workers: 5, food: 0, wood: 30, stone: 10, iron: 0, enoughResource: false };
        this.requiredResources["Quarry"] = { workers: 6, food: 0, wood: 20, stone: 10, iron: 0, enoughResource: false };
        this.requiredResources["Sawmill"] = { workers: 3, food: 0, wood: 20, stone: 10, iron: 0, enoughResource: false };
        
        this.requiredResources["Ranger"] = { workers: 1, food: 70, wood: 30, stone: 0, iron: 5, enoughResource: false };
        this.requiredResources["Soldier"] = { workers: 1, food: 60, wood: 0, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["Sniper"] = { workers: 1, food: 100, wood: 40, stone: 0, iron: 10, enoughResource: false };
        this.requiredResources["Titan"] = { workers: 1, food: 200, wood: 50, stone: 0, iron: 100, enoughResource: false };
        this.requiredResources["Ballista"] = { workers: 1, food: 0, wood: 100, stone: 40, iron: 0, enoughResource: false };
        this.requiredResources["MachineGunTurret"] = { workers: 1, food: 0, wood: 0, stone: 100, iron: 50, enoughResource: false };

        this.requiredResources["WoodWall"] = { workers: 0, food: 0, wood: 40, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["WoodGate"] = { workers: 0, food: 0, wood: 40, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["StoneWall"] = { workers: 0, food: 0, wood: 0, stone: 40, iron: 0, enoughResource: false };
        this.requiredResources["StoneGate"] = { workers: 0, food: 0, wood: 0, stone: 40, iron: 0, enoughResource: false };

        this.stats = {};

        // Projectiles:
        this.stats["Arrow"] = { damage: 15, maxSpeed: 300, radius: 16};
        this.stats["CannonBall"] = { damage: 15, maxSpeed: 200, radius: 8};
        this.stats["FireBolt"] = { damage: 20, maxSpeed: 200, radius: 16};

        this.stats["SniperArrow"] = { damage: 20, maxSpeed: 300, radius: 16};
        this.stats["SoldierBolt"] = { damage: 5, maxSpeed: 300, radius: 16};
        this.stats["TitanArrow"] = { damage: 30, maxSpeed: 200, radius: 16};


        // Attacking Units:
        this.stats["Ranger"] = { attack: this.stats["Arrow"].damage, attackSpeedInSec: 1.5, maxSpeed: 35*3, visualRadius: 200, health: 80};
        this.stats["Ranger"].dps =  (this.stats["Arrow"].damage / this.stats["Ranger"].attackSpeedInSec)

        this.stats["Sniper"] = {attack: this.stats["SniperArrow"].damage, attackSpeedInSec: 3, maxSpeed: 25*2, visualRadius: 250, health: 100};
        this.stats["Sniper"].dps =  (this.stats["SniperArrow"].damage / this.stats["Sniper"].attackSpeedInSec)

        this.stats["Soldier"] = {attack: this.stats["SoldierBolt"].damage,  attackSpeedInSec: 0.8, maxSpeed: 40, visualRadius: 150, health: 100};
        this.stats["Soldier"].dps =  (this.stats["SoldierBolt"].damage / this.stats["Soldier"].attackSpeedInSec)

        this.stats["Titan"] = {attack: this.stats["TitanArrow"].damage, attackSpeedInSec: 1, maxSpeed: 31, visualRadius: 200, health: 250};
        this.stats["Titan"].dps =  (this.stats["TitanArrow"].damage / this.stats["Titan"].attackSpeedInSec)

        this.stats["Ballista"] = {attack: this.stats["Arrow"].damage, attackSpeedInSec: 1.5, visualRadius: 250, health: 200};
        this.stats["Ballista"].dps =  (this.stats["Arrow"].damage / this.stats["Ballista"].attackSpeedInSec)

        this.stats["MachineGunTurret"] = {attack: this.stats["CannonBall"].damage, attackSpeedInSec: 0.8, visualRadius: 200, health: 250};
        this.stats["MachineGunTurret"].dps =  (this.stats["CannonBall"].damage / this.stats["MachineGunTurret"].attackSpeedInSec)


        // Static Units
        let woodHealth = 100;
        let gateVisualRadius = 75;
        this.stats["WoodWall"] = {health: woodHealth};
        this.stats["WoodGate"] = {health: woodHealth, visualRadius: gateVisualRadius};
        this.stats["WoodHouse"] = {health: 125};

        let stoneHealth = 200;
        this.stats["StoneWall"] = {health: stoneHealth};
        this.stats["StoneGate"] = {health: stoneHealth, visualRadius: gateVisualRadius};
        this.stats["StoneHouse"] = {health: stoneHealth};
        this.stats["ApartmentComplex"] = {health: 250};

        // Resource Buildings:
        this.stats["Farm"] = {health: 150};
        this.stats["FishermansCottage"] = {health: 150};
        this.stats["Quarry"] = {health: 150};
        this.stats["Sawmill"] = {health: 150};



    };

    init(ctx) {
        if(PARAMS.PERFORMANCE_MEASURE) {
            this.performanceMeasuresStruct = {};
        }

        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
        this.times = [];
        this.fps = 0;
        this.refreshLoop();

        //Spawners for use in game
        this.allyspawner = new AllySpawner(this);
        this.enemyspawner = new EnemySpawner(this);
    };

    start() {
        var that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();

        if(PARAMS.PERFORMANCE_MEASURE) {
            console.log("Use gameEngine.printPerformanceReport() in console to get a performance report up to"
             + " that point. Can only be called once per run.")
        }
    };

    startInput() {
        let nameOfThisFunction = "startInput";
        if(PARAMS.PERFORMANCE_MEASURE) {
            if(this.performanceMeasuresStruct[nameOfThisFunction] == null) {
                //initialize
                this.performanceMeasuresStruct[nameOfThisFunction] = {};
                this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] = 0;
                this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] = 0;
            }
            this.performanceMeasuresStruct[nameOfThisFunction]["startTime"] = new Date();
        }

        var that = this;

        var getXandY = function (e) {
            var offsetX = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var offsetY = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            var x = Math.floor(offsetX / PARAMS.BLOCKWIDTH);
            var y = Math.floor(offsetY / PARAMS.BLOCKWIDTH);

            if (x < 0 || x > PARAMS.MAPWIDTH || y < 0 || y > PARAMS.MAPWIDTH) return null;

            return { x, y, offsetX, offsetY};
        }

        this.ctx.canvas.addEventListener("mousedown", function(e) {
            if(e.which === 1) that.isDrawingRectangle = true;
            that.rectangleStartX = e.offsetX;
            that.rectangleStartY = e.offsetY;
            that.rectangleEndX = undefined;
            that.rectangleEndY = undefined;
        }, false);

        this.ctx.canvas.addEventListener("mousemove", function (e) {
            that.mouse = getXandY(e);
            if(that.isDrawingRectangle === true) {
                that.rectangleEndX = e.offsetX;
                that.rectangleEndY = e.offsetY;
            }
        }, false);

        this.ctx.canvas.addEventListener("mouseup", function(e) {
            if(that.isDrawingRectangle === true) {
                that.rectangleEndX = e.offsetX;
                that.rectangleEndY = e.offsetY;
                that.isDrawingRectangle = false;
                that.isDoneDrawing = true;
            }
        });

        this.ctx.canvas.addEventListener("contextmenu", function(e) {
            e.preventDefault();
            that.rightClick = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", function (e) {
            that.click = getXandY(e); 
        }, false);

        this.ctx.canvas.addEventListener("dblclick", function (e) {
            that.doubleClick = getXandY(e);
        }, false);

        this.ctx.canvas.addEventListener("keydown", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = true;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = true;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = true;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = true;
                    break;
                case "KeyZ":
                    that.B = true;
                    break;
                case "KeyX":
                    that.A = true;
                    break;
            }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = false;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = false;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = false;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = false;
                    break;
                case "KeyZ":
                    that.B = false;
                    break;
                case "KeyX":
                    that.A = false;
                    break;
            }
        }, false);

        if(PARAMS.PERFORMANCE_MEASURE) {
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] += 
              new Date().getTime() - this.performanceMeasuresStruct[nameOfThisFunction]["startTime"].getTime();
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] += 1;
        }
    };

    addEntity(entity) {
        this.entities[entity.priority].push(entity);
    };

    draw() {
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

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (var i = 0; i < NUMBEROFPRIORITYLEVELS; i++) {
            for (var j = 0; j < this.entities[i].length; j++) {
                this.entities[i][j].draw(this.ctx);
            }
        }
        this.camera.draw(this.ctx);

        if(PARAMS.PERFORMANCE_MEASURE) {
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] += 
              new Date().getTime() - this.performanceMeasuresStruct[nameOfThisFunction]["startTime"].getTime();
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] += 1;
        }
    };

    // removeAll() {
    //     for (var i = this.entities.length - 1; i >= 0; --i) {
    //         for(var j = this.entities[i].length - 1; j >= 0; --j) {
    //             this.entities[i][j].removeFromWorld = true;
    //         }
    //     }
    // }

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

        if(this.daysToWin == null) {
            switch(this.currentMap) {
                case 1:
                    this.daysToWin = 10;
                    break;
                case 2:
                    this.daysToWin = 14;
                    break;
                case 3:
                    this.daysToWin = 23;
                    break;
            }
        }
        
        // Check if the game is over (when 10 days is reached. If it is, print some victory text)
        if(this.elapsedDay >= this.daysToWin && (this.gameOver == false)) {
            this.wonTheGameFlag = true;
            this.gameOver = true;
        }

        //Delete below code when priorities are working properly
        // var entitiesCount = this.entities.length;

        // for (var i = 0; i < entitiesCount; i++) {
        //     var entity = this.entities[i];

        //     if (!entity.removeFromWorld) {
        //         entity.update();
        //     }
        // }

        for (var i = 0; i < NUMBEROFPRIORITYLEVELS; i++) {
            for (var j = 0; j < this.entities[i].length; j++) {
                var entity = this.entities[i][j];

                if (!entity.removeFromWorld) {
                    entity.update();
                }
            }
        }
        this.camera.update();

        //Print performance report. Currently only takes a snapshot of all existing entities. For future,
        //maybe keep track of all entities that have existed
        if(PARAMS.PERFORMANCE_MEASURE && !this.hasPrintedReport) {
            //If it's time to print the report, update and report
            if((new Date().getTime() - this.startDate.getTime()) / 1000 >= PARAMS.PERFORMANCE_TIME_WINDOW) {
                    this.printPerformanceReport();
            } else {
                this.updatePerformanceInfo(false);
            }
        }
        
        for (var i = NUMBEROFPRIORITYLEVELS - 1; i >= 0; --i) {
            for (var j = this.entities[i].length - 1; j >= 0; --j) {
                if (this.entities[i][j].removeFromWorld) {
                    if(this.entities[i][j] instanceof CommandCenter && (this.gameOver == false)) {
                        this.wonTheGameFlag = false;
                        this.gameOver = true;
                    }
                    this.entities[i].splice(j, 1);
                }
            }
        } 
        /*
        // update the ingame resources every 1 hour
        if (this.hour >= this.hourPRev + 1) {
            //console.log("this.elapsedHour: " + this.elapsedHour + ", this.elapsedHourPrev + 3: " + this.elapsedHourPrev + 1);
            //console.log("update");
            //this.elapsedHour = 
            this.elapsedHourPrev = (this.elapsedHourPrev + 1) %24; //cycle from 0 to 24
            this.updateResourceCount();
        } else {
            //console.log("ELSE: this.elapsedHour: " + this.elapsedHour + "this.elapsedHourPrev + 3: " + this.elapsedHourPrev + 1);
        }*/

        // update the ingame resources every 1 hour
        let updateResourceEveryXHours = 3;
        if (this.hour >= this.hourPrev + updateResourceEveryXHours) {
            //console.log("this.elapsedHour: " + this.elapsedHour + ", this.elapsedHourPrev + 3: " + this.elapsedHourPrev + 1);
            //console.log("update");
            //this.elapsedHour = 
            this.hourPrev = this.hourPrev + updateResourceEveryXHours;
            this.updateResourceCount();
        } 

        if(this.gameOver) {
            this.gameEnd(this.wonTheGameFlag);
        }

        this.doubleClick = null;

        if(PARAMS.PERFORMANCE_MEASURE) {
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] += 
              new Date().getTime() - this.performanceMeasuresStruct[nameOfThisFunction]["startTime"].getTime();
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] += 1;
        }
    };

    gameEnd(wonTheGameFlag) {
        //Draw an opaque rectangle to fill the screen=
        this.ctx.globalAlpha = 0.3;
               
            
        this.ctx.fillRect(0, 0, PARAMS.BLOCKWIDTH * PARAMS.MAPWIDTH, PARAMS.BLOCKWIDTH * PARAMS.MAPWIDTH);
        if(wonTheGameFlag) {
            this.addEntity(new GameOverText(this, true)); // win
        } else {
            this.addEntity(new GameOverText(this, false)); // lose
        }
    }

    // update inGame resources (Every 1 hour in game)
    updateResourceCount() {

        this.food += this.foodRate;
        if (this.food > this.maxFood) {
            this.food = this.maxFood;
        }
        if(this.food < 0) {
            this.food = 0;
        }
        this.wood += this.woodRate;
        if (this.wood > this.maxWood) {
            this.wood = this.maxWood;
        }
        if(this.wood < 0) {
            this.wood = 0;
        }
        this.stone += this.stoneRate;
        if (this.stone > this.maxStone) {
            this.stone = this.maxStone;
        }
        if(this.stone < 0) {
            this.stone = 0;
        }
        this.iron += this.ironRate;
        if (this.iron > this.maxIron) {
            this.iron = this.maxIron;
        }
        if(this.iron < 0) {
            this.iron = 0;
        }
    }

    loop() {
        this.clockTick = this.timer.tick();
        this.time += this.clockTick; // update elapsed game time
        this.update();
        this.draw();
    };

    /////////////////////////////
// FPS MONITOR
// https://stackoverflow.com/questions/8279729/calculate-fps-in-canvas-using-requestanimationframe
    refreshLoop() {
        let nameOfThisFunction = "refreshLoop";
        if(PARAMS.PERFORMANCE_MEASURE) {
            if(this.performanceMeasuresStruct[nameOfThisFunction] == null) {
                //initialize
                this.performanceMeasuresStruct[nameOfThisFunction] = {};
                this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] = 0;
                this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] = 0;
            }
            this.performanceMeasuresStruct[nameOfThisFunction]["startTime"] = new Date();
        }

        window.requestAnimationFrame(() => {
          const now = performance.now();
          //console.log("this.times is: ");
          //console.log(this.times);
          while (this.times.length > 0 && this.times[0] <= now - 1000) {
            this.times.shift();
          }
          this.times.push(now);
          this.fps = this.times.length;
          //console.log(this.fps);
          this.refreshLoop();
        });

        if(PARAMS.PERFORMANCE_MEASURE) {
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuntime"] += 
              new Date().getTime() - this.performanceMeasuresStruct[nameOfThisFunction]["startTime"].getTime();
            this.performanceMeasuresStruct[nameOfThisFunction]["totalRuns"] += 1;
        }
      }

    updatePerformanceInfo(timeToReport) {
        if(this.performanceInfo == null) {
            this.performanceInfo = [];
            for(let i = 0; i < 6; i++) {
                this.performanceInfo.push({});
            }
        }
        //Iterate through all entities and report
        for (var i = 0; i < NUMBEROFPRIORITYLEVELS; i++) {
            for (var j = 0; j < this.entities[i].length; j++) {
                var entity = this.entities[i][j];
                var aliveEntity = false;
                //If it's not time to report, only update an entity if it is dead
                if(!timeToReport && !entity.removeFromWorld) {
                    continue;
                }
                if(entity.priority >= 1 && entity.priority <= 4) {
                    let nameOfClass = entity.__proto__.constructor.name;
                    //Summarize runtime info for a few individual methods of this entity
                    for(let funcName of Object.keys(entity.performanceMeasuresStruct)) {
                        //Initialize if necessary
                        if(this.performanceInfo[entity.priority - 1][funcName] == null) {
                            this.performanceInfo[entity.priority - 1][funcName] = {};
                            this.performanceInfo[entity.priority - 1][funcName]["totalRuntime"] = 0;
                            this.performanceInfo[entity.priority - 1][funcName]["totalRuns"] = 0;
                        }

                        let totalRuntime = entity.performanceMeasuresStruct[funcName]["totalRuntime"];
                        let totalRuns = entity.performanceMeasuresStruct[funcName]["totalRuns"];
                        //Update this.performanceInfo
                        this.performanceInfo[entity.priority - 1][funcName]["totalRuntime"] += totalRuntime;
                        this.performanceInfo[entity.priority - 1][funcName]["totalRuns"] += totalRuns;
                    }
                }
            }
        }
        //Report game engine performance
        for(let funcName of Object.keys(this.performanceMeasuresStruct)) {
            //Initialize if necessary
            if(this.performanceInfo[4][funcName] == null) {
                this.performanceInfo[4][funcName] = {};
                this.performanceInfo[4][funcName]["totalRuntime"] = 0;
                this.performanceInfo[4][funcName]["totalRuns"] = 0;
            }

            let totalRuntime = this.performanceMeasuresStruct[funcName]["totalRuntime"];
            let totalRuns = this.performanceMeasuresStruct[funcName]["totalRuns"];
            //Update this.performanceInfo
            this.performanceInfo[4][funcName]["totalRuntime"] = totalRuntime;
            this.performanceInfo[4][funcName]["totalRuns"] = totalRuns;
        }

        //Report scene manager performance
        for(let funcName of Object.keys(this.sceneManager.performanceMeasuresStruct)) {
            //Initialize if necessary
            if(this.performanceInfo[5][funcName] == null) {
                this.performanceInfo[5][funcName] = {};
                this.performanceInfo[5][funcName]["totalRuntime"] = 0;
                this.performanceInfo[5][funcName]["totalRuns"] = 0;
            }

            let totalRuntime = this.sceneManager.performanceMeasuresStruct[funcName]["totalRuntime"];
            let totalRuns = this.sceneManager.performanceMeasuresStruct[funcName]["totalRuns"];
            //Update this.performanceInfo
            this.performanceInfo[5][funcName]["totalRuntime"] = totalRuntime;
            this.performanceInfo[5][funcName]["totalRuns"] = totalRuns;
        }
    }

    //Only call this once per run
    printPerformanceReport() {
        if(this.hasPrintedReport) {
            return "Report can only be called once per run";
        }

        this.updatePerformanceInfo(true);

        console.log("--PERFORMANCE REPORT--");
        for (var i = 0; i < 4; i++) {
            var category;
            switch(i) {
                case 0:
                    category = "BUILDINGS";
                    break;
                case 1:
                    category = "ALLY UNITS";
                    break;
                case 2:
                    category = "ENEMY UNITS";
                    break;
                case 3:
                    category = "EFFECTS (PROJECTILES)";
                    break;
            }
            console.log("   " + category);
            for(let funcName of Object.keys(this.performanceInfo[i])) {                
                console.log("       Function: " + funcName)
                console.log("           Total Runtime (seconds): " + Math.round(this.performanceInfo[i][funcName]["totalRuntime"] / 1000 * 10000000) / 10000000);
                console.log("           Total Runs: " + this.performanceInfo[i][funcName]["totalRuns"]);
                console.log("           Average Runtime per Call (seconds): " 
                    + Math.round((this.performanceInfo[i][funcName]["totalRuntime"] / this.performanceInfo[i][funcName]["totalRuns"]) / 1000 * 10000000) / 10000000);
            }
            console.log();
        }
        console.log("   GAME ENGINE");
        for(let funcName of Object.keys(this.performanceInfo[4])) {                
            console.log("       Function: " + funcName)
            console.log("           Total Runtime (seconds): " + Math.round(this.performanceInfo[4][funcName]["totalRuntime"] / 1000 * 10000000) / 10000000);
            console.log("           Total Runs: " + this.performanceInfo[4][funcName]["totalRuns"]);
            console.log("           Average Runtime per Call (seconds): " 
                + Math.round((this.performanceInfo[4][funcName]["totalRuntime"] / this.performanceInfo[4][funcName]["totalRuns"]) / 1000 * 10000000) / 10000000);
        }
        console.log();

        console.log("   Scene Manager");
        for(let funcName of Object.keys(this.performanceInfo[5])) {                
            console.log("       Function: " + funcName)
            console.log("           Total Runtime (seconds): " + Math.round(this.performanceInfo[5][funcName]["totalRuntime"] / 1000 * 10000000) / 10000000);
            console.log("           Total Runs: " + this.performanceInfo[5][funcName]["totalRuns"]);
            console.log("           Average Runtime per Call (seconds): " 
                + Math.round((this.performanceInfo[5][funcName]["totalRuntime"] / this.performanceInfo[5][funcName]["totalRuns"]) / 1000 * 10000000) / 10000000);
        }
        console.log();

        this.hasPrintedReport = true;
    }
};


function convertGridCordToPixelCord(gridCord) {
    return gridCord * PARAMS.BLOCKWIDTH;
}