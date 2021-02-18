// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor() {
        this.entities = [];
        this.ctx = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        this.click = null;
        this.clickCanvas = null;
        this.mouse = null;
        this.mouseCanvas = null;

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        // // Time: 1 hour is 1 second, 1 day is 24 seconds
        // this.time = 0; // Elapsed time in Seconds (Decimal):  EX: 52.7345 
        // this.timeAsIntInSeconds = 0; // Elapsed Time in Seconds (Int):  EX: 52
        // this.day = 0; // integer day value:  EX: 52 / 24 = 2 days
        // this.hour = 0; // integer hour value of the current day (0-23): EX: 52%24 = 4 hours into day 3 (So the value is 4)
        this.elapsedHour = 0;
        this.elapsedDay = 0;
        this.workers = 3;
        this.workerRate = 0;
        this.maxWorkers = 50;
        this.food = 500;
        this.foodRate = 0;
        this.maxFood = 1000;
        this.wood = 50;
        this.woodRate = 0;
        this.maxWood = 200;
        this.stone = 50;
        this.stoneRate = 0;
        this.maxStone = 200;
        this.iron = 50;
        this.ironRate = 0;
        this.maxIron = 200;
        this.elapsedHourPrev = 1;
        this.zoom = 1 // zoom factor of map, and all units.
        this.ready = false; // wait for game to load, before we let ui clickable.

        this.requiredResources = {};
        this.requiredResources["Tent"] = { workers: 0, food: 0, wood: 0, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["Cottage"] = { workers: 0, food: 0, wood: 0, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["StoneHouse"] = { workers: 0, food: 0, wood: 0, stone: 0, iron: 0, enoughResource: false };

        this.requiredResources["FishermansCottage"] = { workers: 0, food: 0, wood: 0, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["Farm"] = { workers: 0, food: 0, wood: 0, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["Quarry"] = { workers: 0, food: 0, wood: 0, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["Sawmill"] = { workers: 0, food: 0, wood: 0, stone: 0, iron: 0, enoughResource: false };
        
        this.requiredResources["Ranger"] = { workers: 0, food: 0, wood: 0, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["Soldier"] = { workers: 0, food: 0, wood: 0, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["Sniper"] = { workers: 0, food: 0, wood: 0, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["Titan"] = { workers: 0, food: 0, wood: 0, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["Ballista"] = { workers: 0, food: 0, wood: 0, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["MachineGunTurret"] = { workers: 0, food: 0, wood: 0, stone: 0, iron: 0, enoughResource: false };

        this.requiredResources["WoodWall"] = { workers: 0, food: 0, wood: 0, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["WoodGate"] = { workers: 0, food: 0, wood: 0, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["StoneWall"] = { workers: 0, food: 0, wood: 0, stone: 0, iron: 0, enoughResource: false };
        this.requiredResources["StoneGate"] = { workers: 0, food: 0, wood: 0, stone: 0, iron: 0, enoughResource: false };
    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
        this.times = [];
        this.fps = 0;
        this.refreshLoop();

        //Spawners for use in game/debugging
        this.allyspawner = new AllySpawner(this);
        this.enemyspawner = new EnemySpawner(this);
    };

    start() {
        var that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    };

    startInput() {
        var that = this;

        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            x = Math.floor(x / PARAMS.BLOCKWIDTH);
            y = Math.floor(y / PARAMS.BLOCKWIDTH);

            if (x < 0 || x > PARAMS.MAPWIDTH || y < 0 || y > PARAMS.MAPWIDTH) return null;

            return { x: x, y: y };
        }

        this.ctx.canvas.addEventListener("mousemove", function (e) {
            //console.log(getXandY(e));
            that.mouse = getXandY(e);
            that.mouseCanvas = e;
        }, false);

        this.ctx.canvas.addEventListener("click", function (e) {
            //console.log(getXandY(e));
            that.click = getXandY(e);
            that.clickCanvas = e;
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
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
        this.camera.draw(this.ctx);
    };

    update() {
        var entitiesCount = this.entities.length;

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        this.camera.update();
        
        for (var i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        } 
        // update the ingame resources every 1 hour
        if (this.elapsedHour >= this.elapsedHourPrev + 1) {
            //console.log("update");
            this.elapsedHourPrev = (this.elapsedHourPrev + 1) %24; //cycle from 0 to 24
            this.updateResourceCount();
        }

        // Check if the game is over (when 10 days is reached. If it is, print some victory text)
        if(this.elapsedDay >= 10) {
            this.gameEnd(this, true);
        }
    };

    gameEnd(winorloss) {
        //Draw an opaque rectangle to fill the screen
        if(this.elapsedDay > 11) {
            this.ctx.globalAlpha = 0.1;
        } else {
            this.ctx.globalAlpha = 0.3;
        }
               
            
        this.ctx.fillRect(0, 0, PARAMS.BLOCKWIDTH * PARAMS.MAPWIDTH, PARAMS.BLOCKWIDTH * PARAMS.MAPWIDTH)
        if(!this.gameOver) {
            if(winorloss == "win") {
                this.addEntity(new GameOverText(this, "win"));
            } else {
                this.addEntity(new GameOverText(this, "lose"));
            }
            this.gameOver = true;
        }
    }

    // update inGame resources (Every 1 hour in game)
    updateResourceCount() {
        this.workers += this.workerRate;
        if (this.workers > this.maxWorkers) {
            this.workers = this.maxWorkers;
        }

        this.food += this.foodRate;
        if (this.food > this.maxFood) {
            this.food = this.maxFood;
        }
        this.wood += this.woodRate;
        if (this.wood > this.maxWood) {
            this.wood = this.maxWood;
        }
        this.stone += this.stoneRate;
        if (this.stone > this.maxStone) {
            this.stone = this.maxStone;
        }
        this.iron += this.ironRate;
        if (this.iron > this.maxIron) {
            this.iron = this.maxIron;
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
      }


};
