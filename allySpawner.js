class AllySpawner {
    /**
     * Can be used to spawn ally units along either a predefined path or a manual path. Useful for debugging.
     */
    constructor(game) {
        Object.assign(this, { game });
const MISCELLANEOUSPRIORITY = 5;
        this.priority = MISCELLANEOUSPRIORITY;

        this.timeElapsed = 0;

        /*this.path1 = { 
            startX : 26, startY : 35, path : [
                { x: 18, y: 35 },
                { x: 18, y: 22 },
                { x: 36, y: 22 }, 
                { x: 36, y: 16 }, 
                { x: 33, y: 16 },
                { x: 33, y: 7 }, 
                { x: 39, y: 7 },
                { x: 39, y: 0}
            ]
        };

        this.path2 = { 
            startX : 28, startY : 36, path : [
                { x: 28, y: 42 },
                { x: 22, y: 42 },
                { x: 22, y: 48 },
                { x: 25, y: 48 },
                { x: 25, y: 49 }
            ]};*/

        // 2 spawn locations for each map.
        this.spawnLocationsForEachMap = [ 
            [ 
                {startX: 26,  startY: 35, path: []}, {startX: 28,  startY: 37, path: []} // map 1
            ],
            [
                {startX: 19,  startY: 30, path: []}, {startX: 21,  startY: 32, path: []} // map 2
            ],
            [
                {startX: 22,  startY: 21, path: []}, {startX: 24,  startY: 23, path: []} // map 3
            ]
        ]
    };
                                        
                                    

    /**
     * Spawns an Ally on a random path along the railroads.
     * @param {entity} id The type of you unit you want to spawn. ENTITIES.RANGER = Ranger, etc.
     */
    spawnAllyRandomPath(id) {
        let roll = Math.random();
        if(roll <= 0.5) {
            this.spawnAllyPrewrittenPath(id, 0);
        } else {
            this.spawnAllyPrewrittenPath(id, 1);
        }
    }

    /**
     * Spawns an ally that travels a prewritten path specified by the pathNum parameter.
     * @param {entity} id The type of you unit you want to spawn. ENTITIES.RANGER = Ranger, etc.
     * @param {integer} pathNum Path to travel on this map. 1 = Path goes up railroad, 2 = Path goes down railroad
     */
    /*spawnAllyPrewrittenPath(id, pathNum) {
        if(pathNum < 1 || pathNum > 2) {
            console.log("Enter an integer pathNum between 1 and 2 for the unit to travel.")
        }
        
        if(pathNum == 1) {
            this.spawnAlly(id, this.path1.startX, this.path1.startY, this.copyPath(this.path1.path));
        } else if(pathNum == 2) {
            this.spawnAlly(id, this.path2.startX, this.path2.startY, this.copyPath(this.path2.path));
        }
    }*/
    spawnAllyPrewrittenPath(id, pathNum) {
        if(pathNum < 0 || pathNum > 1) {
            console.log("Enter an integer pathNum between 0 and 1 for the unit to travel.")
        }

        let mapNum = this.game.mainMap.mapNum;
        let paths = this.spawnLocationsForEachMap[mapNum-1]; // mapNum is 1 to 3 (mapOne == 1, etc), our indices are 0 to 2

        this.spawnAlly(id, paths[pathNum].startX, paths[pathNum].startY, this.copyPath(paths[pathNum].path));
    }


    /**
     * Spawns an ally that travels along a manual path provided.
     * @param {entity} id The type of you unit you want to spawn. ENTITIES.RANGER = Ranger, etc.
     * @param {integer} pathStartX X spawn coordinate.
     * @param {integer} pathStartY Y spawn coordinate.
     * @param {array} path A manual path to travel. ex. [ { x: 28, y: 42 }, { x: 22, y: 42 } ]
     */
    spawnAlly(id, pathStartX, pathStartY, path) {
        switch(id) {
            case RANGER:
                this.game.addEntity(new Ranger(this.game, pathStartX, pathStartY, path));
                break;
            case SOLDIER:
                this.game.addEntity(new Soldier(this.game, pathStartX, pathStartY, path));
                break;
            case SNIPER:
                this.game.addEntity(new Sniper(this.game, pathStartX, pathStartY, path));
                break;
            case TITAN:
                this.game.addEntity(new Titan(this.game, pathStartX, pathStartY, path));
                break;
        }
    }

    //Nothing needs to be drawn for the spawner
    draw() {

    }

    drawMinimap(ctx, mmX, mmY) {
        
    }

    update() {
        
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