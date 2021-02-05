class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.cameraX = 0;
        this.cameraY = 0;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ui/frame.png");

        this.colonistIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_colonist.png");
        this.resourcesIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_resources.png");

        this.tentIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_tent.png");

        this.fishermanCottageIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_fishermanCottage.png");
        this.farmIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_farm.png");
        this.quarryIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_quarry.png");
        this.sawmillIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_sawmill.png");

        this.backIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_back.png");

        this.selected = null;

        this.display = 0; // 0 main, 1 colonist, 2 resources
        this.loadEntities();
        //this.game.ready = true
    };

    loadEntities() {
        this.game.entities = [];

        this.game.addEntity(new MapOne(this.game));

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
                if (this.display == 0) {
                    this.display = 1;
                } else if (this.display == 1) {
                    let tent = new Tent(this.game);
                    this.game.addEntity(tent);
                    this.selected = tent;

                    //this.selected = TENT;
                    //this.game.addEntity(new (ENTITIES[this.selected])(this.game));
                } else if (this.display == 2) {
                    
                }
            } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 739 && y <= 739 + 45)) {
                if (this.display == 0) {
                    this.display = 2;
                } else if (this.display == 1) {
                    
                } else if (this.display == 2) {
                    
                }
            } else if ((x >= 1233 && x <= 1233 + 45) && (y >= 838 && y <= 838 + 45)) {
                this.display = 0;
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

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 645, 1600, 250);
        if (this.display == 0) {
            ctx.drawImage(this.colonistIcon, 1037, 739, 45, 45);
            ctx.drawImage(this.resourcesIcon, 1087, 739, 45, 45);
        } else if (this.display == 1) {
            ctx.drawImage(this.tentIcon, 1037, 739, 45, 45);
            ctx.drawImage(this.backIcon, 1233, 838, 45, 45);
        } else if (this.display == 2) {
            ctx.drawImage(this.fishermanCottageIcon, 1037, 739, 45, 45);
            ctx.drawImage(this.farmIcon, 1086, 739, 45, 45);
            ctx.drawImage(this.quarryIcon, 1134, 739, 45, 45);
            ctx.drawImage(this.sawmillIcon, 1184, 739, 45, 45);
            ctx.drawImage(this.backIcon, 1233, 838, 45, 45);
        }
    };
};
