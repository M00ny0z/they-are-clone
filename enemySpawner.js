class EnemySpawner {
    constructor(game) {
        Object.assign(this, { game });

        this.timeElapsed = 0;

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
            startX : 23, startY : 51, path : [
            { x: 22, y: 47 },
            { x: 22, y: 42 },
            { x: 28, y: 42 },
            { x: 28, y: 35 }
            ]};
    }

    //Nothing needs to be drawn for the spawner
    draw() {

    }

    update() {
        this.timeElapsed += this.game.clockTick;
        switch(true) {
            //Wave 1
            case this.timeElapsed > 0.5 && !this.spawnFirstWave:
                //Path 1
                for (var i = 0; i < 2; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.path1.startX, this.path1.startY + (i * -1), this.copyPath(this.copyPath(this.path1.path))));
                }

                //Path 2
                for (var i = 0; i < 3; i++) {
                    this.game.addEntity(new InfectedUnit(this.game, this.path2.startX, this.path2.startY + (i * 1), this.copyPath(this.copyPath(this.path2.path))));
                }
                this.spawnFirstWave = true;
                break;

            //Wave 2
            case this.timeElapsed > 10 && !this.spawnSecondWave:
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
            case this.timeElapsed > 25 && !this.spawnThirdWave:
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
            case this.timeElapsed > 50 && !this.spawnFourthWave:
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