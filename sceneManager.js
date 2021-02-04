class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.cameraX = 0;
        this.cameraY = 0;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ui/frame.png");

        this.homeIcon = ASSET_MANAGER.getAsset("./sprites/ui/home_icon.png");
        this.workIcon = ASSET_MANAGER.getAsset("./sprites/ui/work_icon.png");

        this.tentIcon = ASSET_MANAGER.getAsset("./sprites/ui/tent_icon.png");

        this.selected = null;
        
        this.main = true;
        this.loadEntities();
    };

    loadEntities() {
        this.game.entities = [];

        this.game.addEntity(new MapOne(this.game));

        // this.game.addEntity(new InfectedUnit(this.game, 39, -1, [{ x: 2496 / 64, y: 480 / 64 }, { x: 2112 / 64, y: 480 / 64 }, { x: 2112 / 64, y: 1050 / 64 },
        //          { x: 2304 / 64, y: 1050 / 64 }, { x: 2304 / 64, y: 1420 / 64 }, { x: 1500 / 64, y: 1420 / 64 }]));

        this.game.addEntity(new EnemySpawner(this.game));

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
        // for (var i = 0; i < 10; i++) {
        //     this.game.addEntity(new InfectedUnit(this.game, 2496 / 64, (-100 + i * 50) / 64, [{ x: 2496 / 64, y: 480 / 64 }, { x: 2112 / 64, y: 480 / 64 }, { x: 2112 / 64, y: 1050 / 64 },
        //     { x: 2304 / 64, y: 1050 / 64 }, { x: 2304 / 64, y: 1420 / 64 }, { x: 1500 / 64, y: 1420 / 64 }]));
        // }
        // this.game.addEntity(new InfectedVenom(this.game, 2496 / 64, -150 / 64, [{ x: 2496 / 64, y: 480 / 64 }, { x: 2112 / 64, y: 480 / 64 }, { x: 2112 / 64, y: 1050 / 64 }, { x: 2304 / 64, y: 1050 / 64 },
        // { x: 2304 / 64, y: 1420 / 64 }, { x: 1500 / 64, y: 1420 / 64 }]));

        // this.game.addEntity(new Soldier(this.game, 1200 / 64, 1500 / 64, [{ x: 2500 / 64, y: 1500 / 64 }, { x: 2000 / 64, y: 700 / 64 }]));    //target
        // this.game.addEntity(new Soldier(this.game, 1000 / 64, 1500 / 64, [{ x: 2450 / 64, y: 1500 / 64 }, { x: 2100 / 64, y: 700 / 64 }]));    //target
        // this.game.addEntity(new Soldier(this.game, 800 / 64, 1500 / 64, [{ x: 2400 / 64, y: 1500 / 64 }, { x: 2200 / 64, y: 600 / 64 }]));    //target


        // this.game.addEntity(new InfectedVenom(this.game, 25, 48, [{ x: 28, y: 32 }]));
        // this.game.addEntity(new InfectedVenom(this.game, 25, 42, [{ x: 27, y: 32 }]));
        // this.game.addEntity(new InfectedVenom(this.game, 25, 50, [{ x: 31, y: 32 }]));
        // this.game.addEntity(new InfectedVenom(this.game, 25, 51, [{ x: 25, y: 32 }]));

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
        if (this.cameraY > (PARAMS.MAPHEIGHT - PARAMS.CAMERAHEIGHT) + 1) {
            this.cameraY = PARAMS.MAPHEIGHT - PARAMS.CAMERAHEIGHT + 1;
        }
        if (this.cameraY < 0) {
            this.cameraY = 0;
        }

        // checking if UI is clicked
        if (this.game.clickCanvas) {
            var x = this.game.clickCanvas.clientX;
            var y = this.game.clickCanvas.clientY;
            if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {
                if (this.main) {
                    this.main = false;
                } else {
                    let tent = new Tent(this.game);
                    this.game.addEntity(tent);
                    this.selected = tent;
                    
                      
                    //this.selected = TENT;
                    //this.game.addEntity(new (ENTITIES[this.selected])(this.game));
                }
            }
            this.game.clickCanvas = null;
        }

        // placing selected entity
        if (this.game.click) {
            var x = this.game.click.x + this.game.camera.cameraX;
            var y = this.game.click.y + this.game.camera.cameraY;
            if (this.selected != null && !this.game.mainMap.map[y][x].filled && !this.game.mainMap.map[y][x].collisions && this.game.click.y < 11) {
                this.game.mainMap.map[y][x].filled = true;
                this.selected.followMouse = false;
                this.selected.x = x;
                this.selected.y = y;
                this.selected = null;
            }
            this.game.click = null;
        }
    };

    // placeBuilding() {
    //     var x = this.game.click.x + this.game.camera.cameraX;
    //     var y = this.game.click.y + this.game.camera.cameraY;
    //     console.log(x + " : " + y);
    //     if (this.game.click && this.selectedBuilding &&
    //         !this.game.mainMap.map[y][x].filled && !this.game.mainMap.map[y][x].collisions) {
    //         this.game.mainMap.map[y][x].filled = true;
    //         console.log(new (BUILDINGS[this.selectedBuilding])(this.game, this.game.click.x, this.game.click.y));
    //         this.game.addEntity(new (BUILDINGS[this.selectedBuilding])(this.game));
    //     }
    // }



    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 645, 1600, 250);
        if (this.main) {
            ctx.drawImage(this.homeIcon, 1037, 739, 45, 45);
            ctx.drawImage(this.workIcon, 1087, 739, 45, 45);
        } else {
            ctx.drawImage(this.tentIcon, 1037, 739, 45, 45);
        }
    };
};
