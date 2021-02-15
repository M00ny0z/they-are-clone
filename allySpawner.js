class AllySpawner {
    /**
     * Can be used to spawn ally units along either a predefined path or a manual path. Useful for debugging.
     */
    constructor(game) {
        Object.assign(this, { game });

        this.timeElapsed = 0;

        this.path1 = { 
            startX : 27, startY : 35, path : [
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
            ]};
    }

    /**
     * Spawns an Ally on a random path along the railroads.
     * @param {entity} id The type of you unit you want to spawn. ENTITIES.RANGER = Ranger, etc.
     */
    spawnAllyRandomPath(id) {
        let roll = Math.random();
        if(roll <= 0.5) {
            this.spawnAllyPrewrittenPath(id, 1);
        } else {
            this.spawnAllyPrewrittenPath(id, 2);
        }
    }

    /**
     * Spawns an ally that travels a prewritten path specified by the pathNum parameter.
     * @param {entity} id The type of you unit you want to spawn. ENTITIES.RANGER = Ranger, etc.
     * @param {integer} pathNum Path to travel on this map. 1 = Path goes up railroad, 2 = Path goes down railroad
     */
    spawnAllyPrewrittenPath(id, pathNum) {
        if(pathNum < 1 || pathNum > 2) {
            console.log("Enter an integer pathNum between 1 and 2 for the unit to travel.")
        }
        
        if(pathNum == 1) {
            this.spawnAlly(id, this.path1.startX, this.path1.startY, this.copyPath(this.path1.path));
        } else if(pathNum == 2) {
            this.spawnAlly(id, this.path2.startX, this.path2.startY, this.copyPath(this.path2.path));
        }
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