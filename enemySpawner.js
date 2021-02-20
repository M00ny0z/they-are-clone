class EnemySpawner {
    /**
     * Can be used to spawn enemy units along either a predefined path or a manual path. Useful for debugging.
     * Can also be inserted into the game engine's gameEntities to spawn waves of enemies.
     */
    constructor(game) {
        Object.assign(this, { game });
        this.priority = MISCELLANEOUSPRIORITY;

        this.spawnFirstWave = false;
        this.spawnSecondtWave = false;
        this.spawnThirdWave = false;
        this.spawnFourthWave = false;

        this.path1 = { 
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
        };

        this.path2 = { 
            startX : 25, startY : 51, path : [
            { x: 25, y: 48 },
            { x: 22, y: 48 },
            { x: 22, y: 42 },
            { x: 28, y: 42 },
            { x: 28, y: 35 }
            ]};
    }

    /**
     * Spawns an Enemy on a random path along the railroads.
     * @param {entity} id The type of you unit you want to spawn. ENTITIES.INFECTEDUNIT = InfectedUnit, etc.
     */
    spawnEnemyPrewrittenPath(id) {
        let roll = Math.random();  
        if(roll <= 0.5) {
            this.spawnEnemyPrewrittenPath(id, 1);
        } else {
            this.spawnEnemyPrewrittenPath(id, 2);
        }
    }

    /**
     * Spawns an Enemy that travels a prewritten path specified by the pathNum parameter.
     * @param {entity} id The type of you unit you want to spawn. ENTITIES.INFECTEDUNIT = InfectedUnit, etc.
     * @param {integer} pathNum Path to travel on this map. 1 = Path goes from TOP towards town center, 2 = Path goes from BOTTOM towards town center
     */
    spawnEnemyPrewrittenPath(id, pathNum) {
        if(pathNum < 1 || pathNum > 2) {
            console.log("Enter an integer pathNum between 1 and 2 for the unit to travel.")
        }
        
        if(pathNum == 1) {
            this.spawnEnemy(id, this.path1.startX, this.path1.startY, this.copyPath(this.path1.path));
        } else if(pathNum == 2) {
            this.spawnEnemy(id, this.path2.startX, this.path2.startY, this.copyPath(this.path2.path));
        }
    }

    /**
     * Spawns an Enemy that travels along a manual path provided.
     * @param {entity} id The type of you unit you want to spawn. ENTITIES.INFECTEDUNIT = InfectedUnit, etc.
     * @param {integer} pathStartX X spawn coordinate.
     * @param {integer} pathStartY Y spawn coordinate.
     * @param {array} path A manual path to travel. ex. [ { x: 28, y: 42 }, { x: 22, y: 42 } ]
     */
    spawnEnemy(id, pathStartX, pathStartY, path) {
        switch(id) {
            case INFECTEDUNIT:
                this.game.addEntity(new InfectedUnit(this.game, pathStartX, pathStartY, path));
                break;
            case INFECTEDVENOM:
                this.game.addEntity(new InfectedVenom(this.game, pathStartX, pathStartY, path));
                break;
            case INFECTEDHARPY:
                this.game.addEntity(new InfectedHarpy(this.game, pathStartX, pathStartY, path));
                break;
            case INFECTEDCHUBBY:
                this.game.addEntity(new InfectedChubby(this.game, pathStartX, pathStartY, path));
                break;
            default:
                console.log("Id doesn't match any existing unit.");
        }
    }

    //Nothing needs to be drawn for the spawner
    draw() {

    }

    drawMinimap(ctx, mmX, mmY) {
        
    }

    update() {
        switch(true) {
            //Wave 1
            case this.game.elapsedHour >= 12 && !this.spawnFirstWave:
                //Path 1
                for (var i = 0; i < 2; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.path1.startX, this.path1.startY + (i * -1), this.copyPath(this.path1.path)));
                }

                //Path 2
                for (var i = 0; i < 3; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.path2.startX, this.path2.startY + (i * 1), this.copyPath(this.path2.path)));
                }
                this.spawnFirstWave = true;
                break;

            //Wave 2
            case this.game.elapsedDay >= 1 && this.game.elapsedHour >= 12 && !this.spawnSecondWave:
                //Path 1
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.path1.startX, this.path1.startY + (i * -1), this.copyPath(this.path1.path)));
                }
                this.game.addEntity(new InfectedVenom(this.game, this.path1.startX, this.path1.startY - 4, this.copyPath(this.path1.path)));

                //Path 2
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.path2.startX, this.path2.startY + (i * 1), this.copyPath(this.path2.path)));
                }
                this.game.addEntity(new InfectedVenom(this.game, this.path2.startX, this.path2.startY + 4, this.copyPath(this.path2.path)));
                this.game.addEntity(new InfectedVenom(this.game, this.path2.startX, this.path2.startY + 5, this.copyPath(this.path2.path)));
                this.spawnSecondWave = true;
                break;

            //Wave 3
            case this.game.elapsedDay >= 3 && !this.spawnThirdWave:
                //Path 1
                for (var i = 0; i < 7; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.path1.startX, this.path1.startY + (i * -1), this.copyPath(this.path1.path)));
                }
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.path1.startX, this.path1.startY + (i * -2 - 3), this.copyPath(this.path1.path)));
                }
                for (var i = 0; i < 5; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.path1.startX, this.path1.startY + (i * -1.5 - 0.2), this.copyPath(this.path1.path)));
                }

                //Path 2
                for (var i = 0; i < 9; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.path2.startX, this.path2.startY + (i * 1), this.copyPath(this.path2.path)));
                }
                for (var i = 0; i < 5; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.path2.startX, this.path2.startY + (i * 2 + 1), this.copyPath(this.path2.path)));
                }
                for (var i = 0; i < 4; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.path2.startX, this.path2.startY + (i * 1.5), this.copyPath(this.path2.path)));
                }
                this.spawnThirdWave = true;
                break;

            //Wave 4   
            case this.game.elapsedDay >= 5 && this.game.elapsedHour >= 12 && !this.spawnFourthWave:
                //Path 1
                for (var i = 0; i < 11; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.path1.startX, this.path1.startY + (i * -1), this.copyPath(this.path1.path)));
                }
                for (var i = 0; i < 7; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.path1.startX, this.path1.startY + (i * -2 - 3), this.copyPath(this.path1.path)));
                }
                for (var i = 0; i < 5; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.path1.startX, this.path1.startY + (i * -2.5 - 0.5), this.copyPath(this.path1.path)));
                }
                // for (var i = 0; i < 3; i++) {
                //     this.game.addEntity(new InfectedChubby(this.game, this.path2.startX, this.path2.startY + (i), this.copyPath(this.path2.path)));
                // }

                //Path 2
                for (var i = 0; i < 9; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.path2.startX, this.path2.startY + (i * 1), this.copyPath(this.path2.path)));
                }
                for (var i = 0; i < 10; i++) {
                    this.game.addEntity(new InfectedVenom(this.game, this.path2.startX, this.path2.startY + (i * 2 + 1), this.copyPath(this.path2.path)));
                }
                for (var i = 0; i < 7; i++) {
                    this.game.addEntity(new InfectedHarpy(this.game, this.path2.startX, this.path2.startY + (i * 2.5 + 0.5), this.copyPath(this.path2.path)));
                }
                // for (var i = 0; i < 2; i++) {
                //     this.game.addEntity(new InfectedChubby(this.game, this.path2.startX, this.path2.startY + (i * 32 + 5), this.copyPath(this.path2.path)));
                // }
                this.spawnFourthWave = true;
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