class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.cameraX = 0;
        this.cameraY = 0;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ui/frame.png");

        // display 0
        this.colonistIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_colonist.png");
        this.resourcesIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_resources.png");
        this.militaryIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_military.png");
        this.defenseIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_defense.png");
        // display 1
        this.tentIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_tent.png");
        // display 2
        this.fishermanCottageIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_fishermanCottage.png");
        this.farmIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_farm.png");
        this.quarryIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_quarry.png");
        this.sawmillIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_sawmill.png");
        // display 3
        this.ballistaIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_ballista.png");
        // display 4
        this.woodWallIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_woodWall.png");

        this.backIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_back.png");

        this.selected = null;

        this.display = 0; // 0 main, 1 colonist, 2 resources, 3 military, 4 defense
        this.loadEntities();
    };

    loadEntities() {
        this.game.entities = [];

        this.game.addEntity(new MapOne(this.game));

        this.game.addEntity(new CommandCenter(this.game, 28, 35));
        //Spawn 10 zombies from the top of map to follow railroad
        for (var i = 0; i < 10; i++) {
            this.game.addEntity(new InfectedUnit(this.game, 2496 / 64, (-100 + i * 50) / 64, [{ x: 2496 / 64, y: 480 / 64 }, { x: 2112 / 64, y: 480 / 64 }, { x: 2112 / 64, y: 1050 / 64 },
            { x: 2304 / 64, y: 1050 / 64 }, { x: 2304 / 64, y: 1420 / 64 }, { x: 1500 / 64, y: 1420 / 64 }]));
        }
        this.game.addEntity(new InfectedVenom(this.game, 2496 / 64, -150 / 64, [{ x: 2496 / 64, y: 480 / 64 }, { x: 2112 / 64, y: 480 / 64 }, { x: 2112 / 64, y: 1050 / 64 }, { x: 2304 / 64, y: 1050 / 64 },
        { x: 2304 / 64, y: 1420 / 64 }, { x: 1500 / 64, y: 1420 / 64 }]));

        this.game.addEntity(new Soldier(this.game, 1200 / 64, 1500 / 64, [{ x: 2500 / 64, y: 1500 / 64 }, { x: 2000 / 64, y: 700 / 64 }]));    //target
        this.game.addEntity(new Soldier(this.game, 1000 / 64, 1500 / 64, [{ x: 2450 / 64, y: 1500 / 64 }, { x: 2100 / 64, y: 700 / 64 }]));    //target
        this.game.addEntity(new Soldier(this.game, 800 / 64, 1500 / 64, [{ x: 2400 / 64, y: 1500 / 64 }, { x: 2200 / 64, y: 600 / 64 }]));    //target


        this.game.addEntity(new InfectedVenom(this.game, 25, 48, [{ x: 28, y: 32 }]));
        this.game.addEntity(new InfectedVenom(this.game, 25, 42, [{ x: 27, y: 32 }]));
        this.game.addEntity(new InfectedVenom(this.game, 25, 50, [{ x: 31, y: 32 }]));
        this.game.addEntity(new InfectedVenom(this.game, 25, 51, [{ x: 25, y: 32 }]));

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

            if (this.display == 0) { // display 0
                if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {
                    this.display = 1;
                } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 739 && y <= 739 + 45)) {
                    this.display = 2;
                } else if ((x >= 1134 && x <= 1134 + 45) && (y >= 739 && y <= 739 + 45)) {
                    this.display = 3;
                } else if ((x >= 1184 && x <= 1184 + 45) && (y >= 739 && y <= 739 + 45)) {
                    this.display = 4;
                } else if ((x >= 1233 && x <= 1233 + 45) && (y >= 838 && y <= 838 + 45)) {
                    this.display = 0;
                }
            } else if (this.display == 1) { // display 1
                if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {
                    let tent = new Tent(this.game);
                    this.game.addEntity(tent);
                    this.selected = tent;
                } else if ((x >= 1233 && x <= 1233 + 45) && (y >= 838 && y <= 838 + 45)) {
                    this.display = 0;
                }
            } else if (this.display == 2) { // display 2
                if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {
                    let fishermansCottage = new FishermansCottage(this.game);
                    this.game.addEntity(fishermansCottage);
                    this.selected = fishermansCottage;
                } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 739 && y <= 739 + 45)) {
                    let farm = new Farm(this.game);
                    this.game.addEntity(farm);
                    this.selected = farm;
                } else if ((x >= 1134 && x <= 1134 + 45) && (y >= 739 && y <= 739 + 45)) {
                    let quarry = new Quarry(this.game);
                    this.game.addEntity(quarry);
                    this.selected = quarry;
                } else if ((x >= 1184 && x <= 1184 + 45) && (y >= 739 && y <= 739 + 45)) {
                    let sawmill = new Sawmill(this.game);
                    this.game.addEntity(sawmill);
                    this.selected = sawmill;
                } else if ((x >= 1233 && x <= 1233 + 45) && (y >= 838 && y <= 838 + 45)) {
                    this.display = 0;
                }
            } else if (this.display == 3) { // display 3
                if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {
                    let ballista = new Ballista(this.game);
                    this.game.addEntity(ballista);
                    this.selected = ballista;
                } else if ((x >= 1233 && x <= 1233 + 45) && (y >= 838 && y <= 838 + 45)) {
                    this.display = 0;
                }
            } else if (this.display == 4) { // display 4
                if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {
                    let woodWall = new WoodWall(this.game);
                    this.game.addEntity(woodWall);
                    this.selected = woodWall;
                } else if ((x >= 1233 && x <= 1233 + 45) && (y >= 838 && y <= 838 + 45)) {
                    this.display = 0;
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

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 645, 1600, 250);
        if (this.display == 0) {
            ctx.drawImage(this.colonistIcon, 1037, 739, 45, 45);
            ctx.drawImage(this.resourcesIcon, 1087, 739, 45, 45);
            ctx.drawImage(this.militaryIcon, 1136, 739, 45, 45);
            ctx.drawImage(this.defenseIcon, 1186, 739, 45, 45);
        } else if (this.display == 1) {
            ctx.drawImage(this.tentIcon, 1037, 739, 45, 45);
            ctx.drawImage(this.backIcon, 1233, 838, 45, 45);
        } else if (this.display == 2) {
            ctx.drawImage(this.fishermanCottageIcon, 1037, 739, 45, 45);
            ctx.drawImage(this.farmIcon, 1087, 739, 45, 45);
            ctx.drawImage(this.quarryIcon, 1134, 739, 45, 45);
            ctx.drawImage(this.sawmillIcon, 1184, 739, 45, 45);
            ctx.drawImage(this.backIcon, 1233, 838, 45, 45);
        } else if (this.display == 3) {
            ctx.drawImage(this.ballistaIcon, 1037, 739, 45, 45);
            ctx.drawImage(this.backIcon, 1233, 838, 45, 45);
        } else if (this.display == 4) {
            ctx.drawImage(this.woodWallIcon, 1037, 739, 45, 45);
            ctx.drawImage(this.backIcon, 1233, 838, 45, 45);
        }
    };
};
