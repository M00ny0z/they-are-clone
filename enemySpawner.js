class EnemySpawner {
    /**
     * Can be used to spawn enemy units along either a predefined path or a manual path. Useful for debugging.
     * Can also be inserted into the game engine's gameEntities to spawn waves of enemies.
     */
    constructor(game, mapNum) {
        Object.assign(this, { game, mapNum });
        this.priority = MISCELLANEOUSPRIORITY;

        this.spawnedWanderingZombies = false;
        //An array where each index represents whether that wave has spawned in (boolean value)
        this.spawnedWaveFlags = [];

        this.paths = [];
        this.initializePaths();
    }

    //Nothing needs to be drawn for the spawner
    draw() {

    }

    drawMinimap(ctx, mmX, mmY) {
        
    }

    update() {
        //Initial zombies wandering the map
        if(!this.spawnedWanderingZombies && this.game.elapsedHour >= 0) {
            this.spawnWanderingZombies();
            this.spawnedWanderingZombies = true;
        }
        switch(this.mapNum) {
            //Map 1
            case 1:
                this.initializeZombieWaveFlags(4);
                this.map1ZombieSpawn();
                break;
            case 2:
                this.initializeZombieWaveFlags(5);
                this.map2ZombieSpawn();
                break;
            case 3:
                this.initializeZombieWaveFlags(6);
                this.map3ZombieSpawn();
                break;
        }
    }

    initializeZombieWaveFlags(numWaves) {
        for(let i = 0; i < numWaves; i++) {
            this.spawnedWaveFlags.push(false);
        }
    }

    initializePaths() {
        switch(this.mapNum) {
            case 1:
                //0 Upper path
                this.paths.push({ 
                    startX : 39, startY : -1, path : [
                    { x: 39, y: 7 }, 
                    { x: 33, y: 7 }, 
                    { x: 33, y: 16 },
                    { x: 36, y: 16 }, 
                    { x: 36, y: 22 }, 
                    { x: 18, y: 22 },
                    { x: 18, y: 35 },
                    { x: 28, y: 35 }
                    ]
                });
                //1 lower path
                this.paths.push({ 
                    startX : 25, startY : 51, path : [
                    { x: 25, y: 48 },
                    { x: 22, y: 48 },
                    { x: 22, y: 42 },
                    { x: 28, y: 42 },
                    { x: 28, y: 35 }
                    ]});
                break;
            case 2:
                //0 Upper left
                this.paths.push({  
                    startX : 7, startY : -1, path : [
                    { x: 7, y: 14 }, 
                    { x: 10, y: 14 }, 
                    { x: 10, y: 30 },
                    { x: 21, y: 30 }
                    ]
                });
                //1 Upper right
                this.paths.push({  
                    startX : 39, startY : -1, path : [
                    { x: 39, y: 9 }, 
                    { x: 36, y: 9 }, 
                    { x: 36, y: 20 },
                    { x: 33, y: 20 },
                    { x: 33, y: 34 },
                    { x: 21, y: 34 },
                    { x: 21, y: 30 },
                    ]
                });
                //2 Right up
                this.paths.push({  
                    startX : 50, startY : 14, path : [
                    { x: 30, y: 14 }, 
                    { x: 30, y: 11 }, 
                    { x: 21, y: 11 },
                    { x: 21, y: 30 }
                    ]
                });
                //3 Right down
                this.paths.push({ 
                    startX : 50, startY : 31, path : [
                    { x: 33, y: 31 }, 
                    { x: 33, y: 34 }, 
                    { x: 21, y: 34 },
                    { x: 21, y: 30 }
                    ]
                });
                //4 Bottom right
                this.paths.push({  
                    startX : 30, startY : 50, path : [
                    { x: 30, y: 40 }, 
                    { x: 27, y: 40 }, 
                    { x: 27, y: 34 },
                    { x: 21, y: 34 },
                    { x: 21, y: 30 }
                    ]
                });
                //5 Bottom left
                this.paths.push({ 
                    startX : 13, startY : 50, path : [
                    { x: 13, y: 39 }, 
                    { x: 16, y: 39 }, 
                    { x: 16, y: 30 },
                    { x: 21, y: 30 }
                    ]
                });
                //6 Left down
                this.paths.push({ 
                    startX : -1, startY : 28, path : [
                    { x: 10, y: 28 }, 
                    { x: 10, y: 30 }, 
                    { x: 21, y: 30 }
                    ]
                });
                break;
            case 3:
                //0 Far left
                this.paths.push({  
                    startX : 18, startY : -1, path : [
                    { x: 18, y: 10 }, 
                    { x: 12, y: 10 }, 
                    { x: 12, y: 21 },
                    { x: 3, y: 21 },
                    { x: 3, y: 35 },
                    { x: 21, y: 35 },
                    { x: 21, y: 26 },
                    { x: 24, y: 26 },
                    { x: 24, y: 21 }
                    ]
                });
                //1 Middle left
                this.paths.push({ 
                    startX : 21, startY : -1, path : [
                    { x: 21, y: 10 },  
                    { x: 12, y: 10 }, 
                    { x: 12, y: 21 },
                    { x: 24, y: 21 }
                    ]
                });
                //2 Middle
                this.paths.push({ 
                    startX : 24, startY : -1, path : [
                    { x: 24, y: 10 },  
                    { x: 33, y: 10 }, 
                    { x: 33, y: 16 },
                    { x: 43, y: 16 },
                    { x: 43, y: 19 },
                    { x: 46, y: 19 },
                    { x: 46, y: 26 },
                    { x: 35, y: 26 },
                    { x: 35, y: 21 },
                    { x: 24, y: 21 },
                    ]
                });
                //3 Middle right
                this.paths.push({ 
                    startX : 27, startY : -1, path : [
                    { x: 27, y: 10 }, 
                    { x: 33, y: 10 }, 
                    { x: 33, y: 16 },
                    { x: 43, y: 16 },
                    { x: 43, y: 19 },
                    { x: 46, y: 19 },
                    { x: 46, y: 26 },
                    { x: 24, y: 26 },
                    { x: 24, y: 21 },
                    ]
                });
                //4 Far right
                this.paths.push({ 
                    startX : 30, startY : -1, path : [
                    { x: 30, y: 10 },  
                    { x: 33, y: 10 }, 
                    { x: 33, y: 16 },
                    { x: 43, y: 16 },
                    { x: 43, y: 19 },
                    { x: 46, y: 19 },
                    { x: 46, y: 29 },
                    { x: 33, y: 29 },
                    { x: 33, y: 35 },
                    { x: 21, y: 35 },
                    { x: 21, y: 26 },
                    { x: 24, y: 26 },
                    { x: 24, y: 21 }
                    ]
                });
                break;
        }
    }

    spawnWanderingZombies() {
        switch(this.mapNum) {
            case 1:
                //Open space upper left corner
                this.spawnEnemy(INFECTEDUNIT, 12, 5, [{ x: 12, y: 6 }])
                this.spawnEnemy(INFECTEDUNIT, 15, 4, [{ x: 16, y: 4 }])

                //Spawn zombies near upper left mine
                this.spawnEnemy(INFECTEDUNIT, 10, 16, [{ x: 10, y: 17 }])
                this.spawnEnemy(INFECTEDUNIT, 9, 14, [{ x: 9, y: 15 }])
                this.spawnEnemy(INFECTEDUNIT, 6, 16, [{ x: 6, y: 17 }])

                //Spawn zombies near upper middle part of map
                this.spawnEnemy(INFECTEDUNIT, 25, 14, [{ x: 25, y: 15 }])

                //Spawn zombies near upper right part of map
                this.spawnEnemy(INFECTEDUNIT, 42, 11, [{ x: 43, y: 11 }])

                //Spawn zombies near middle right mine
                this.spawnEnemy(INFECTEDUNIT, 40, 19, [{ x: 40, y: 20 }])
                this.spawnEnemy(INFECTEDUNIT, 43, 21, [{ x: 43, y: 22 }])
                this.spawnEnemy(INFECTEDUNIT, 43, 21, [{ x: 43, y: 22 }])

                //Spawn zombies near bottom left mine
                this.spawnEnemy(INFECTEDUNIT, 10, 40, [{ x: 10, y: 41 }])
                this.spawnEnemy(INFECTEDUNIT, 9, 39, [{ x: 8, y: 38 }])
                this.spawnEnemy(INFECTEDHARPY, 4, 44, [{ x: 5, y: 44 }])
                this.spawnEnemy(INFECTEDHARPY, 4, 42, [{ x: 5, y: 42 }])
                this.spawnEnemy(INFECTEDVENOM, 4, 43, [{ x: 5, y: 43 }])
                this.spawnEnemy(INFECTEDUNIT, 10, 32, [{ x: 11, y: 32 }])
                this.spawnEnemy(INFECTEDUNIT, 12, 29, [{ x: 12, y: 28 }])

                // Testing:

                /*this.spawnEnemy(INFECTEDUNIT, 18, 40, [{x: 19, y:40}])
                this.spawnEnemy(INFECTEDVENOM, 18, 36, [{x: 19, y:36}])
                this.spawnEnemy(INFECTEDHARPY, 18, 32, [{x: 19, y:32}])
                this.spawnEnemy(INFECTEDCHUBBY, 18, 28, [{x: 19, y:28}])*/



                //Location for test zombies
                this.spawnEnemy(INFECTEDUNIT, 23, 23, [{ x: 23, y: 24 }])
                break;
            case 2:
                //Upper left corner
                this.spawnEnemy(INFECTEDUNIT, 5, 6, [{ x: 5, y: 7 }])

                //Upper left corner near ores
                this.spawnEnemy(INFECTEDVENOM, 11, 13, [{ x: 11, y: 14 }])
                this.spawnEnemy(INFECTEDVENOM, 13, 13, [{ x: 13, y: 14 }])

                //Middle upper left corner near ores
                this.spawnEnemy(INFECTEDUNIT, 6, 20, [{ x: 7, y: 20 }])
                this.spawnEnemy(INFECTEDUNIT, 4, 24, [{ x: 4, y: 25 }])

                //Center upper woods
                this.spawnEnemy(INFECTEDVENOM, 24, 5, [{ x: 24, y: 6 }])
                this.spawnEnemy(INFECTEDCHUBBY, 24, 6, [{ x: 24, y: 7 }])

                //Center ore deposit
                this.spawnEnemy(INFECTEDUNIT, 20, 19, [{ x: 20, y: 20 }])
                this.spawnEnemy(INFECTEDUNIT, 25, 20, [{ x: 25, y: 21 }])

                //Bottom left
                this.spawnEnemy(INFECTEDUNIT, 4, 30, [{ x: 5, y: 30 }])
                this.spawnEnemy(INFECTEDUNIT, 7, 33, [{ x: 7, y: 34 }])
                this.spawnEnemy(INFECTEDUNIT, 7, 38, [{ x: 8, y: 38 }])
                this.spawnEnemy(INFECTEDVENOM, 7, 39, [{ x: 8, y: 39 }])

                //Bottom right (ores)
                this.spawnEnemy(INFECTEDCHUBBY, 41, 28, [{ x: 40, y: 28 }])
                this.spawnEnemy(INFECTEDUNIT, 42, 29, [{ x: 42, y: 30 }])
                this.spawnEnemy(INFECTEDUNIT, 37, 26, [{ x: 37, y: 25 }])

                //Upper right
                this.spawnEnemy(INFECTEDUNIT, 37, 10, [{ x: 38, y: 10 }])
                this.spawnEnemy(INFECTEDUNIT, 38, 12, [{ x: 38, y: 13 }])
                this.spawnEnemy(INFECTEDUNIT, 42, 13, [{ x: 42, y: 14 }])
                this.spawnEnemy(INFECTEDUNIT, 40, 18, [{ x: 41, y: 17 }])
                break;
            case 3:
                //Upper left
                this.spawnEnemy(INFECTEDHARPY, 5, 13, [{ x: 5, y: 14 }])
                this.spawnEnemy(INFECTEDHARPY, 6, 12, [{ x: 6, y: 13 }])
                this.spawnEnemy(INFECTEDHARPY, 6, 13, [{ x: 6, y: 14 }])
                this.spawnEnemy(INFECTEDHARPY, 7, 12, [{ x: 7, y: 13 }])
                this.spawnEnemy(INFECTEDHARPY, 7, 13, [{ x: 7, y: 14 }])

                //Left ore deposit
                this.spawnEnemy(INFECTEDUNIT, 5, 23, [{ x: 5, y: 22 }])  
                this.spawnEnemy(INFECTEDUNIT, 12, 31, [{ x: 13, y: 32 }]) 
                this.spawnEnemy(INFECTEDVENOM, 7, 32, [{ x: 8, y: 32 }])
                this.spawnEnemy(INFECTEDVENOM, 7, 33, [{ x: 8, y: 33 }]) 

                //Scattered throughout bottom (called from left to right)
                this.spawnEnemy(INFECTEDUNIT, 3, 39, [{ x: 4, y: 39 }])
                this.spawnEnemy(INFECTEDUNIT, 7, 40, [{ x: 8, y: 39 }])
                this.spawnEnemy(INFECTEDVENOM, 10, 42, [{ x: 10, y: 41 }])
                this.spawnEnemy(INFECTEDUNIT, 12, 40, [{ x: 12, y: 39 }])
                this.spawnEnemy(INFECTEDCHUBBY, 14, 42, [{ x: 13, y: 41 }])
                this.spawnEnemy(INFECTEDUNIT, 15, 37, [{ x: 15, y: 38 }])
                this.spawnEnemy(INFECTEDUNIT, 21, 40, [{ x: 20, y: 40 }])
                this.spawnEnemy(INFECTEDUNIT, 25, 39, [{ x: 26, y: 38 }])
                this.spawnEnemy(INFECTEDVENOM, 29, 43, [{ x: 29, y: 42 }])
                this.spawnEnemy(INFECTEDUNIT, 33, 38, [{ x: 33, y: 39 }])

                //Right ore deposit
                this.spawnEnemy(INFECTEDUNIT, 42, 22, [{ x: 42, y: 23 }])  
                this.spawnEnemy(INFECTEDVENOM, 43, 22, [{ x: 43, y: 23 }])  
                this.spawnEnemy(INFECTEDUNIT, 44, 22, [{ x: 44, y: 23 }]) 

                //Bottom right brown square
                this.spawnEnemy(INFECTEDCHUBBY, 41, 35, [{ x: 41, y: 36 }])  
                this.spawnEnemy(INFECTEDVENOM, 41, 36, [{ x: 42, y: 36 }])  
                this.spawnEnemy(INFECTEDVENOM, 41, 36, [{ x: 41, y: 37 }])  
                this.spawnEnemy(INFECTEDVENOM, 41, 36, [{ x: 40, y: 36 }])  
                this.spawnEnemy(INFECTEDVENOM, 41, 36, [{ x: 41, y: 35 }])  

                //Upper right
                this.spawnEnemy(INFECTEDHARPY, 35, 10, [{ x: 35, y: 11 }])
                this.spawnEnemy(INFECTEDHARPY, 36, 10, [{ x: 36, y: 11 }])
                this.spawnEnemy(INFECTEDHARPY, 37, 10, [{ x: 37, y: 11 }])

        }
    }
        

    /**
     * Spawns an Enemy on a random path along the railroads.
     * @param {entity} id The type of you unit you want to spawn. ENTITIES.INFECTEDUNIT = InfectedUnit, etc.
     */
    spawnEnemyPrewrittenPath(id) {
        let roll = Math.random();  
        let step = roll / this.paths.length;
        for(let i = 1; i <= this.paths.length; i++) {
            if(roll < i * step) {
                this.spawnEnemyPrewrittenPath(id, i);
                return;
            }
        }
        //In case of weird rounding issues
        this.spawnEnemyPrewrittenPath(id, this.paths.length);
    }

    /**
     * Spawns an Enemy that travels a prewritten path specified by the pathNum parameter.
     * @param {entity} id The type of you unit you want to spawn. ENTITIES.INFECTEDUNIT = InfectedUnit, etc.
     * @param {integer} pathNum Path to travel on this map. 1 = Path goes from TOP towards town center, 2 = Path goes from BOTTOM towards town center
     */
    spawnEnemyPrewrittenPath(id, pathNum) {
        if(pathNum < 0 || pathNum > this.paths.length - 1) {
            console.log("Invalid path length.")
        }
        this.spawnEnemy(id, this.paths[pathNum].startX, this.paths[pathNum].startY, this.copyPath(this.paths[pathNum].path));
    }

    /**
     * Spawns an Enemy that travels along a manual path provided.
     * @param {entity} id The type of you unit you want to spawn. ENTITIES.INFECTEDUNIT = InfectedUnit, etc.
     * @param {integer} pathStartX X spawn coordinate.
     * @param {integer} pathStartY Y spawn coordinate.
     * @param {array} path A manual path to travel. ex. [ { x: 28, y: 42 }, { x: 22, y: 42 } ]
     */
    spawnEnemy(id, pathStartX, pathStartY, path) {
        this.game.addEntity(new ENTITIES[id](this.game, pathStartX, pathStartY, path));
        // switch(id) {
        //     case INFECTEDUNIT:
        //         this.game.addEntity(new InfectedUnit(this.game, pathStartX, pathStartY, path));
        //         break;
        //     case INFECTEDVENOM:
        //         this.game.addEntity(new InfectedVenom(this.game, pathStartX, pathStartY, path));
        //         break;
        //     case INFECTEDHARPY:
        //         this.game.addEntity(new InfectedHarpy(this.game, pathStartX, pathStartY, path));
        //         break;
        //     case INFECTEDCHUBBY:
        //         this.game.addEntity(new InfectedChubby(this.game, pathStartX, pathStartY, path));
        //         break;
        //     default:
        //         console.log("Id doesn't match any existing unit.");
        // }
    }

    map1ZombieSpawn() {
        switch(true) {
            //Wave 1
            case !this.spawnedWaveFlags[0] && this.game.elapsedDay >= 1:
                //Path 1
                for (var i = 0; i < 2; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[0].startX, this.paths[0].startY + (i * -1), this.copyPath(this.paths[0].path)));
                }

                //Path 2
                for (var i = 0; i < 3; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[1].startX, this.paths[1].startY + (i * 1), this.copyPath(this.paths[1].path)));
                }
                this.spawnedWaveFlags[0] = true;
                break;

            //Wave 2
            case !this.spawnedWaveFlags[1] && this.game.elapsedDay >= 2:
                //Path 1
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[0].startX, this.paths[0].startY + (i * -1), this.copyPath(this.paths[0].path)));
                }
                this.game.addEntity(new InfectedVenom(this.game, this.paths[0].startX, this.paths[0].startY - 4, this.copyPath(this.paths[0].path)));

                //Path 2
                for (var i = 0; i < 2; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[1].startX, this.paths[1].startY + (i * 1), this.copyPath(this.paths[1].path)));
                }
                //this.game.addEntity(new InfectedVenom(this.game, this.paths[1].startX, this.paths[1].startY + 4, this.copyPath(this.paths[1].path)));
                //this.game.addEntity(new InfectedVenom(this.game, this.paths[1].startX, this.paths[1].startY + 5, this.copyPath(this.paths[1].path)));
                this.spawnedWaveFlags[1] = true;
                break;

            //Wave 3
            case !this.spawnedWaveFlags[2] && this.game.elapsedDay >= 3 && this.game.elapsedHour >= 12:
                //Path 1
                for (var i = 0; i < 7; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[0].startX, this.paths[0].startY + (i * -1), this.copyPath(this.paths[0].path)));
                }
                for (var i = 0; i < 2; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[0].startX, this.paths[0].startY + (i * -2 - 3), this.copyPath(this.paths[0].path)));
                }
                for (var i = 0; i < 5; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[0].startX, this.paths[0].startY + (i * -1.5 - 0.2), this.copyPath(this.paths[0].path)));
                }
                for (var i = 0; i < 2; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[0].startX, this.paths[0].startY + (i * -5), this.copyPath(this.paths[0].path)));
                }

                //Path 2
                for (var i = 0; i < 9; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[1].startX, this.paths[1].startY + (i * 1), this.copyPath(this.paths[1].path)));
                }
                for (var i = 0; i < 3; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[1].startX, this.paths[1].startY + (i * 2 + 1), this.copyPath(this.paths[1].path)));
                }
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[1].startX, this.paths[1].startY + (i * 1.5), this.copyPath(this.paths[1].path)));
                }
                for (var i = 0; i < 2; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[1].startX, this.paths[1].startY + (i * 5), this.copyPath(this.paths[1].path)));
                }
                this.spawnedWaveFlags[2] = true;
                break;

            //Wave 4   
            case !this.spawnedWaveFlags[3] && this.game.elapsedDay >= 5 && this.game.elapsedHour >= 12:
                //Path 1
                for (var i = 0; i < 11; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[0].startX, this.paths[0].startY + (i * -1), this.copyPath(this.paths[0].path)));
                }
                for (var i = 0; i < 5; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[0].startX, this.paths[0].startY + (i * -2 - 3), this.copyPath(this.paths[0].path)));
                }
                for (var i = 0; i < 5; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[0].startX, this.paths[0].startY + (i * -2.5 - 0.5), this.copyPath(this.paths[0].path)));
                }
                 for (var i = 0; i < 3; i++) {
                     this.game.addEntity(new InfectedChubby(this.game, this.paths[1].startX, this.paths[1].startY + (i), this.copyPath(this.paths[1].path)));
                 }

                //Path 2
                for (var i = 0; i < 6; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[1].startX, this.paths[1].startY + (i * 1), this.copyPath(this.paths[1].path)));
                }
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[1].startX, this.paths[1].startY + (i * 2 + 1), this.copyPath(this.paths[1].path)));
                }
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[1].startX, this.paths[1].startY + (i * 2.5 + 0.5), this.copyPath(this.paths[1].path)));
                }
                // for (var i = 0; i < 2; i++) {
                //     this.game.addEntity(new InfectedChubby(this.game, this.paths[1].startX, this.paths[1].startY + (i * 32 + 5), this.copyPath(this.paths[1].path)));
                // }
                this.spawnedWaveFlags[3] = true;
                break;   
        }
    }

    map2ZombieSpawn() {
        let currentPath;
        switch(true) {
            //Wave 1
            case !this.spawnedWaveFlags[0] && this.game.elapsedDay >= 1:
                currentPath = 3;
                for (var i = 0; i < 2; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX + (i * 1), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 6;
                for (var i = 0; i < 3; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX + (i * -1), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }
                this.spawnedWaveFlags[0] = true;
                break;

            //Wave 2
            case !this.spawnedWaveFlags[1] && this.game.elapsedDay >= 2:
                currentPath = 3;
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX + (i * 1), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 2; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX + (i * 1.5), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 6;
                for (var i = 0; i < 5; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX + (i * -1), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX + (i * -1), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }
                this.spawnedWaveFlags[1] = true;
                break;

            //Wave 3
            case !this.spawnedWaveFlags[2] && this.game.elapsedDay >= 3 && this.game.elapsedHour >= 12:
                currentPath = 0;
                for (var i = 0; i < 8; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 3;
                for (var i = 0; i < 6; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX + (i * 1), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 2; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX + (i * 1 + 0.5), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 4;
                for (var i = 0; i < 8; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * 1.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 6;
                for (var i = 0; i < 5; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX + (i * -1), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX + (i * -1), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }
                this.spawnedWaveFlags[2] = true;
                break;

            //Wave 4   
            case !this.spawnedWaveFlags[3] && this.game.elapsedDay >= 5 && this.game.elapsedHour >= 12:
                currentPath = 0;
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 8; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 3;
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX + (i * 1), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 7; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX + (i * 1 + 0.5), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 2; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[currentPath].startX + (i * 1 + 0.5), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 4;
                for (var i = 0; i < 8; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * 1.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 6;
                for (var i = 0; i < 12; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX + (i * -1), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 5; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX + (i * -1), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 1; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[currentPath].startX + (i * -1 - 0.5), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }
                this.spawnedWaveFlags[3] = true;
                break;  

            //Wave 5   
            case !this.spawnedWaveFlags[4] && this.game.elapsedDay >= 8 && this.game.elapsedHour >= 0:
                currentPath = 0;
                for (var i = 0; i < 3; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 8; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 1;
                for (var i = 0; i < 6; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 2;
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[currentPath].startX + (i * 1 + 0.5), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 3;
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX + (i * 1), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 7; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX + (i * 1 + 0.5), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 10; i++) {
                    this.game.addHarpy(new InfectedChubby(this.game, this.paths[currentPath].startX + (i * 1 + 0.5), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 4;
                for (var i = 0; i < 6; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * 1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 6; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * 1 + 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 5;
                for (var i = 0; i < 8; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * 1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 2; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * 1 + 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 6;
                for (var i = 0; i < 7; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX + (i * -1), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 3; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[currentPath].startX + (i * -1 - 0.5), this.paths[currentPath].startY, this.copyPath(this.paths[currentPath].path)));
                }
                this.spawnedWaveFlags[4] = true;
                break;  
        }
    }

    map3ZombieSpawn() {
        let currentPath;
        switch(true) {
            //Wave 1
            case !this.spawnedWaveFlags[0] && this.game.elapsedDay >= 1:
                currentPath = 1;
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 3;
                for (var i = 0; i < 3; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                this.spawnedWaveFlags[0] = true;
                break;

            //Wave 2
            case !this.spawnedWaveFlags[1] && this.game.elapsedDay >= 2:
                currentPath = 0;
                for (var i = 0; i < 6; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 1;
                for (var i = 0; i < 6; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 3;
                for (var i = 0; i < 6; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 4;
                for (var i = 0; i < 6; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                this.spawnedWaveFlags[1] = true;
                break;

            //Wave 3
            case !this.spawnedWaveFlags[2] && this.game.elapsedDay >= 3 && this.game.elapsedHour >= 12:
                currentPath = 0;
                for (var i = 0; i < 6; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 3; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 1;
                for (var i = 0; i < 6; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 3; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 2;
                for (var i = 0; i < 6; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 6; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 3;
                for (var i = 0; i < 2; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 4;
                for (var i = 0; i < 12; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                this.spawnedWaveFlags[2] = true;
                break;

            //Wave 4   
            case !this.spawnedWaveFlags[3] && this.game.elapsedDay >= 5 && this.game.elapsedHour >= 12:
                currentPath = 0;
                for (var i = 0; i < 8; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 3; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 2; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 1;
                for (var i = 0; i < 8; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 6; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 2;
                for (var i = 0; i < 9; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 8; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 3;
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 8; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 4;
                for (var i = 0; i < 16; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                this.spawnedWaveFlags[3] = true;
                break;  

            //Wave 5   
            case !this.spawnedWaveFlags[4] && this.game.elapsedDay >= 8 && this.game.elapsedHour >= 0:
                currentPath = 0;
                for (var i = 0; i < 10; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 5; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 1; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 1;
                for (var i = 0; i < 8; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 7; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 0; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 2;
                for (var i = 0; i < 3; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 10; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 2; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 3;
                for (var i = 0; i < 6; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 6; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 0; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 0; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 4;
                for (var i = 0; i < 8; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 5; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 8; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 1; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                this.spawnedWaveFlags[4] = true;
                break;  

            //Wave 6   
            case !this.spawnedWaveFlags[5] && this.game.elapsedDay >= 8 && this.game.elapsedHour >= 0:
                currentPath = 0;
                for (var i = 0; i < 0; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 12; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 10; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 3; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 1;
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 12; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 10; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 2; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 2;
                for (var i = 0; i < 5; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 14; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 8; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 1; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 3;
                for (var i = 0; i < 6; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 10; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 10; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 0; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }

                currentPath = 4;
                for (var i = 0; i < 2; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 7; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 15; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                for (var i = 0; i < 1; i++) {
                    this.game.addEntity(new InfectedChubby(this.game, this.paths[currentPath].startX, this.paths[currentPath].startY + (i * -1 - 0.5), this.copyPath(this.paths[currentPath].path)));
                }
                this.spawnedWaveFlags[5] = true;
                break;  
        }
    }

    //Helper function to deep copy paths
    copyPath(originalPath) {
        let copiedPath = [];
        for(let i = 0; i < originalPath.length; i++) {
            copiedPath[i] = { x : originalPath[i].x, y : originalPath[i].y }
        }
        return copiedPath;
    }
}