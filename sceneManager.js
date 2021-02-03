class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.cameraX = 0;
        this.cameraY = 0;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ui-layout.png");


        this.loadEntities();
    };

    
    loadEntities() {
        this.game.entities = [];

        this.game.addEntity(new MapOne(this.game));

        // this.game.addEntity(new Farm(this.game, 64 * 10, 64 * 30));
        // this.game.addEntity(new Quarry(this.game, 64 * 11, 64 * 30));
        // this.game.addEntity(new Sawmill(this.game, 64 * 12, 64 * 30));

        // this.game.addEntity(new MachineGunTurret(this.game, 64 * 14, 64 * 30));
        // this.game.addEntity(new StoneGateVertical(this.game, 64 * 10, 64 * 35));
        // this.game.addEntity(new WoodGateVertical(this.game, 64 * 10, 64 * 36));
    
        // this.game.addEntity(new StoneGateHorizontal(this.game, 64 * 12, 64 * 35));
        // this.game.addEntity(new WoodGateHorizontal(this.game, 64 * 12, 64 * 36));
        // this.game.addEntity(new WoodWall(this.game, 64 * 15, 64 * 36));
        // this.game.addEntity(new StoneWall(this.game, 64 * 15, 64 * 35));
        
        // this.game.addEntity(new CommandCenter(this.game, 64 * 28, 64 * 35));
    
        //Spawn 10 zombies from the top of map to follow railroad
        for(var i = 0; i < 10; i++) {
            this.game.addEntity(new InfectedUnit(this.game, 2496/64, (-100 + i * 50)/64, [{x : 2496/64, y: 480/64}, {x : 2112/64, y: 480/64}, {x : 2112/64, y: 1050/64}, 
                {x : 2304/64, y: 1050/64}, {x : 2304/64, y: 1420/64}, {x : 1500/64, y: 1420/64}]));
        }
        this.game.addEntity(new InfectedVenom(this.game, 2496/64, -150/64, [{x : 2496/64, y: 480/64}, {x : 2112/64, y: 480/64}, {x : 2112/64, y: 1050/64}, {x : 2304/64, y: 1050/64}, 
            {x : 2304/64, y: 1420/64}, {x : 1500/64, y: 1420/64}]));
    
        this.game.addEntity(new Soldier(this.game, 1200/64, 1500/64, [{x: 2500/64, y: 1500/64}, {x: 2000/64, y: 700/64}]));    //target
        this.game.addEntity(new Soldier(this.game, 1000/64, 1500/64, [{x: 2450/64, y: 1500/64}, {x: 2100/64, y: 700/64}]));    //target
        this.game.addEntity(new Soldier(this.game, 800/64, 1500/64, [{x: 2400/64, y: 1500/64}, {x: 2200/64, y: 600/64}]));    //target
    
    
        this.game.addEntity(new InfectedVenom(this.game, 25, 48,  [{x: 28, y: 32}]));
        this.game.addEntity(new InfectedVenom(this.game, 25, 42,  [{x: 27, y: 32}]));
        this.game.addEntity(new InfectedVenom(this.game, 25, 50,  [{x: 31, y: 32}]));
        this.game.addEntity(new InfectedVenom(this.game, 25, 51,  [{x: 25, y: 32}]));
    
    };

    update() {
        if (this.game.left) {
            this.cameraX -= 1;
        }

        if (this.game.right) {
            this.cameraX += 1;
        }

        if (this.game.up) {
            this.cameraY -= 1;
        }

        if (this.game.down) {
            this.cameraY += 1;
        }
        if (this.cameraX > (PARAMS.MAPWIDTH - PARAMS.CAMERAWIDTH)) {
            this.cameraX = PARAMS.MAPWIDTH - PARAMS.CAMERAWIDTH;
        }
        if (this.cameraX < 0) {
            this.cameraX = 0;
        }
        if (this.cameraY > (PARAMS.MAPHEIGHT-PARAMS.CAMERAHEIGHT) + 3) {
            this.cameraY = PARAMS.MAPHEIGHT-PARAMS.CAMERAHEIGHT + 3;
        }
        if (this.cameraY < 0) {
            this.cameraY = 0;
        }
    };

    draw(ctx) {
       ctx.drawImage(this.spritesheet, 0, 594, 1600, 300);
    };
};
