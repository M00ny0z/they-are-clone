class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.cameraX = 0;
        this.cameraY = 0;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ui/frame.png");

        this.emptyIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_empty.png");
        this.buildingsImg = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.buildingsGreyImg = ASSET_MANAGER.getAsset("./sprites/buildings_grey.png");

        // Resources (Bottom Left) Panel
        this.foodIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_food.png");
        this.ironIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_iron.png");
        this.stoneIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_stone.png");
        this.unitsIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_units.png");
        this.woodIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_wood.png");
        // Timer
        this.zeroIcon = ASSET_MANAGER.getAsset("./sprites/ui/0.png");
        this.oneIcon = ASSET_MANAGER.getAsset("./sprites/ui/1.png");
        this.twoIcon = ASSET_MANAGER.getAsset("./sprites/ui/2.png");
        this.threeIcon = ASSET_MANAGER.getAsset("./sprites/ui/3.png");
        this.fourIcon = ASSET_MANAGER.getAsset("./sprites/ui/4.png");
        this.fiveIcon = ASSET_MANAGER.getAsset("./sprites/ui/5.png");
        this.sixIcon = ASSET_MANAGER.getAsset("./sprites/ui/6.png");
        this.sevenIcon = ASSET_MANAGER.getAsset("./sprites/ui/7.png");
        this.eightIcon = ASSET_MANAGER.getAsset("./sprites/ui/8.png");
        this.nineIcon = ASSET_MANAGER.getAsset("./sprites/ui/9.png");
        // display 0
        this.colonistIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_colonist.png");
        this.resourcesIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_resources.png");
        this.militaryIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_military.png");
        this.defenseIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_defense.png");
        // display 1
        this.tentIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_tent.png");
        // display 2
        // display 3
        this.ballistaIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_ballista.png");
        // display 4
        this.woodWallIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_woodWall.png");

        this.cancelIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_cancel.png");
        this.backIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_back.png");


        this.display = 0; // 0 main, 1 colonist, 2 resources, 3 military, 4 defense
        this.selected = 0;

        this.loadEntities();
    };

    loadEntities() {
        this.game.entities = [];

        this.game.addEntity(new MapOne(this.game));

        this.game.addEntity(new EnemySpawner(this.game));

        //this.game.addEntity(new Farm(this.game, PARAMS.BLOCKWIDTH * 14, PARAMS.BLOCKWIDTH * 5));
        //this.game.addEntity(new Quarry(this.game,PARAMS.BLOCKWIDTH * 11, PARAMS.BLOCKWIDTH * 15));
        //this.game.addEntity(new Sawmill(this.game, PARAMS.BLOCKWIDTH * 14, PARAMS.BLOCKWIDTH * 6));
        //this.game.addEntity(new FishermansCottage(this.game,PARAMS.BLOCKWIDTH * 8, PARAMS.BLOCKWIDTH * 4));


        // this.game.addEntity(new MachineGunTurret(this.game, 64 * 14, 64 * 30));
        // this.game.addEntity(new StoneGateVertical(this.game, 64 * 10, 64 * 35));
        // this.game.addEntity(new WoodGateVertical(this.game, 64 * 10, 64 * 36));

        // this.game.addEntity(new StoneGateHorizontal(this.game, 64 * 12, 64 * 35));
        // this.game.addEntity(new WoodGateHorizontal(this.game, 64 * 12, 64 * 36));
        // this.game.addEntity(new WoodWall(this.game, 64 * 15, 64 * 36));
        // this.game.addEntity(new StoneWall(this.game, 64 * 15, 64 * 35));

        //Spawn 10 zombies from the top of map to follow railroad
        // for (var i = 0; i < 10; i++) {
        //     this.game.addEntity(new InfectedUnit(this.game, 2496 / 64, (-100 + i * 50) / 64, [{ x: 2496 / 64, y: 480 / 64 }, { x: 2112 / 64, y: 480 / 64 }, { x: 2112 / 64, y: 1050 / 64 },
        //     { x: 2304 / 64, y: 1050 / 64 }, { x: 2304 / 64, y: 1420 / 64 }, { x: 1500 / 64, y: 1420 / 64 }]));
        // }
        // this.game.addEntity(new InfectedVenom(this.game, 2496 / 64, -150 / 64, [{ x: 2496 / 64, y: 480 / 64 }, { x: 2112 / 64, y: 480 / 64 }, { x: 2112 / 64, y: 1050 / 64 }, { x: 2304 / 64, y: 1050 / 64 },
        // { x: 2304 / 64, y: 1420 / 64 }, { x: 1500 / 64, y: 1420 / 64 }]));

        //this.game.addEntity(new Soldier(this.game, 1200 / PARAMS.BLOCKWIDTH, 1500 / PARAMS.BLOCKWIDTH, [{ x: 2500 / PARAMS.BLOCKWIDTH, y: 1500 / PARAMS.BLOCKWIDTH }, { x: 2000 / PARAMS.BLOCKWIDTH, y: 700 / PARAMS.BLOCKWIDTH }]));    //target
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
        PARAMS.DEBUG = document.getElementById("debug").checked;
        PARAMS.CORD = document.getElementById("cord").checked;
        PARAMS.RESOURCEXY = document.getElementById("resourceXY").checked;

        this.game.elapsedHour += this.game.clockTick;

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

        if (this.cameraX > 17) {
            this.cameraX = 17;
        }
        if (this.cameraX < 0) {
            this.cameraX = 0;
        }
        if (this.cameraY > 34) {
            this.cameraY = 34;
        }
        if (this.cameraY < 0) {
            this.cameraY = 0;
        }

        // checking if there are enough resources to construct builidngs.
        if (this.game.numWorkers >= this.game.requiredResources["FishermansCottage"].workers &&
            this.game.food >= this.game.requiredResources["FishermansCottage"].food &&
            this.game.wood >= this.game.requiredResources["FishermansCottage"].wood &&
            this.game.stone >= this.game.requiredResources["FishermansCottage"].stone &&
            this.game.iron >= this.game.requiredResources["FishermansCottage"].iron) {
            this.game.requiredResources["FishermansCottage"].enoughResource = true;
        } else {
            this.game.requiredResources["FishermansCottage"].enoughResource = false;
        }
        if (this.game.numWorkers >= this.game.requiredResources["Farm"].workers &&
            this.game.food >= this.game.requiredResources["Farm"].food &&
            this.game.wood >= this.game.requiredResources["Farm"].wood &&
            this.game.stone >= this.game.requiredResources["Farm"].stone &&
            this.game.iron >= this.game.requiredResources["Farm"].iron) {
            this.game.requiredResources["Farm"].enoughResource = true;
        } else {
            this.game.requiredResources["Farm"].enoughResource = false;
        }
        if (this.game.numWorkers >= this.game.requiredResources["Quarry"].workers &&
            this.game.food >= this.game.requiredResources["Quarry"].food &&
            this.game.wood >= this.game.requiredResources["Quarry"].wood &&
            this.game.stone >= this.game.requiredResources["Quarry"].stone &&
            this.game.iron >= this.game.requiredResources["Quarry"].iron) {
            this.game.requiredResources["Quarry"].enoughResource = true;
        } else {
            this.game.requiredResources["Quarry"].enoughResource = false;
        }
        if (this.game.numWorkers >= this.game.requiredResources["Sawmill"].workers &&
            this.game.food >= this.game.requiredResources["Sawmill"].food &&
            this.game.wood >= this.game.requiredResources["Sawmill"].wood &&
            this.game.stone >= this.game.requiredResources["Sawmill"].stone &&
            this.game.iron >= this.game.requiredResources["Sawmill"].iron) {
            this.game.requiredResources["Sawmill"].enoughResource = true;
        } else {
            this.game.requiredResources["Sawmill"].enoughResource = false;
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
                } else if ((x >= 1233 && x <= 1233 + 45) && (y >= 837 && y <= 837 + 45)) {
                    this.display = 0;
                }
            } else if (this.display == 1) { // display 1
                if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new Tent(this.game);
                    this.game.addEntity(this.selected);

                }
            } else if (this.display == 2) { // display 2
                if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45) && this.game.requiredResources["FishermansCottage"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new FishermansCottage(this.game);
                    this.game.addEntity(this.selected);
                } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 739 && y <= 739 + 45) && this.game.requiredResources["Farm"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new Farm(this.game);
                    this.game.addEntity(this.selected);
                } else if ((x >= 1134 && x <= 1134 + 45) && (y >= 739 && y <= 739 + 45) && this.game.requiredResources["Quarry"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new Quarry(this.game);
                    this.game.addEntity(this.selected);
                } else if ((x >= 1184 && x <= 1184 + 45) && (y >= 739 && y <= 739 + 45) && this.game.requiredResources["Sawmill"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new Sawmill(this.game);
                    this.game.addEntity(this.selected);
                }
            } else if (this.display == 3) { // display 3
                if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new Ballista(this.game);
                    this.game.addEntity(this.selected);

                }
            } else if (this.display == 4) { // display 4
                if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new WoodWall(this.game);
                    this.game.addEntity(this.selected);

                }
            }
            this.game.clickCanvas = null;
        }

        if ((this.display == 1) || (this.display == 2) || (this.display == 3) || (this.display == 4)) {
            if ((x >= 1184 && x <= 1184 + 45) && (y >= 837 && y <= 837 + 45)) { // cancel button
                if (this.selected) {
                    this.selected.removeFromWorld = true;
                    this.selected = null;
                }
            } else if ((x >= 1233 && x <= 1233 + 45) && (y >= 837 && y <= 837 + 45)) { // back button
                this.display = 0;
            }
        }
        if (this.selected) {
            if (!this.selected.followMouse) {
                this.selected = null;
            }
        }
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 645, 1600, 250);

        this.drawTimer(ctx);

        if (this.game.mouseCanvas != null) {
            var x = this.game.mouseCanvas.clientX;
            var y = this.game.mouseCanvas.clientY;
        }

        if (this.display == 0) {
            ctx.drawImage(this.colonistIcon, 1037, 739, 45, 45);
            ctx.drawImage(this.resourcesIcon, 1087, 739, 45, 45);
            ctx.drawImage(this.militaryIcon, 1136, 739, 45, 45);
            ctx.drawImage(this.defenseIcon, 1185, 739, 45, 45);
            if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {

            } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 739 && y <= 739 + 45)) {

            } else if ((x >= 1134 && x <= 1134 + 45) && (y >= 739 && y <= 739 + 45)) {

            } else if ((x >= 1184 && x <= 1184 + 45) && (y >= 739 && y <= 739 + 45)) {

            } else if ((x >= 1233 && x <= 1233 + 45) && (y >= 837 && y <= 837 + 45)) {

            }
        } else if (this.display == 1) {
            ctx.drawImage(this.tentIcon, 1037, 739, 45, 45);
            if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {

            } else if ((x >= 1233 && x <= 1233 + 45) && (y >= 837 && y <= 837 + 45)) {

            }
        } else if (this.display == 2) {
            // fishermanCottage icon
            ctx.drawImage(this.emptyIcon, 1037, 739, 45, 45);
            if (this.game.requiredResources["FishermansCottage"].enoughResource) {
                ctx.drawImage(this.buildingsImg, 32, 4 * 32, 32, 32, 1042, 744, 35, 35);
            } else {
                ctx.drawImage(this.buildingsGreyImg, 32, 4 * 32, 32, 32, 1042, 744, 35, 35);
            }
            // farm icon
            ctx.drawImage(this.emptyIcon, 1087, 739, 45, 45);
            if (this.game.requiredResources["Farm"].enoughResource) {
                ctx.drawImage(this.buildingsImg, 64, 4 * 32, 32, 32, 1092, 744, 35, 35);
            } else {
                ctx.drawImage(this.buildingsGreyImg, 64, 4 * 32, 32, 32, 1092, 744, 35, 35);
            }
            // quarry icon
            ctx.drawImage(this.emptyIcon, 1134, 739, 45, 45);
            if (this.game.requiredResources["Quarry"].enoughResource) {
                ctx.drawImage(this.buildingsImg, 0, 3 * 32, 32, 64, 1139, 744, 35, 35);
            } else {
                ctx.drawImage(this.buildingsGreyImg, 0, 3 * 32, 32, 64, 1139, 744, 35, 35);
            }
            // sawmill icon
            ctx.drawImage(this.emptyIcon, 1184, 739, 45, 45);
            if (this.game.requiredResources["Sawmill"].enoughResource) {
                ctx.drawImage(this.buildingsImg, 3 * 32, 3 * 32, 32, 64, 1189, 744, 35, 35);
            } else {
                ctx.drawImage(this.buildingsGreyImg, 3 * 32, 3 * 32, 32, 64, 1189, 744, 35, 35);
            }

            if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {
                ctx.strokeStyle = "grey";
                ctx.moveTo(500, 782);
                ctx.lineTo(985, 782);
                ctx.stroke();

                ctx.font = "25px SpaceMono-Regular";
                ctx.fillStyle = "lightgreen";
                ctx.textBaseline = "bottom";
                ctx.fillText("FISHERMAN COTTAGE", 500, 782);

                ctx.font = "15px SpaceMono-Regular";
                ctx.fillStyle = "green";
                ctx.fillText("Gold: 300", 500, 812);
                ctx.fillText("Gold: 30", 500, 812);

                ctx.fillStyle = "white";
                ctx.fillText("Produces food from surrounding sea cells.", 500, 842);
                ctx.fillText("It must be placed near a water source.", 500, 862);
            } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 739 && y <= 739 + 45)) {
                ctx.strokeStyle = "grey";
                ctx.moveTo(500, 782);
                ctx.lineTo(985, 782);
                ctx.stroke();

                ctx.font = "25px SpaceMono-Regular";
                ctx.fillStyle = "lightgreen";
                ctx.textBaseline = "bottom";
                ctx.fillText("FARM", 500, 782);

                ctx.font = "15px SpaceMono-Regular";
                ctx.fillStyle = "green";
                ctx.fillText("Gold: 80", 500, 812);

                ctx.fillStyle = "white";
                ctx.fillText("Produces food by harvesting grass field", 500, 842);
                ctx.fillText("from the surroundings.", 500, 862);
            } else if ((x >= 1134 && x <= 1134 + 45) && (y >= 739 && y <= 739 + 45)) {
                ctx.strokeStyle = "grey";
                ctx.moveTo(500, 782);
                ctx.lineTo(985, 782);
                ctx.stroke();

                ctx.font = "25px SpaceMono-Regular";
                ctx.fillStyle = "lightgreen";
                ctx.textBaseline = "bottom";
                ctx.fillText("QUARRY", 500, 782);

                ctx.font = "15px SpaceMono-Regular";
                ctx.fillStyle = "green";
                ctx.fillText("Wood: 30", 500, 812);
                ctx.fillText("Workers: 4", 500, 827);

                ctx.fillStyle = "white";
                ctx.fillText("Collects minerals like stone, and iron", 500, 848);
                ctx.fillText("from surrounding mineral seams.", 500, 868);
            } else if ((x >= 1184 && x <= 1184 + 45) && (y >= 739 && y <= 739 + 45)) {
                ctx.strokeStyle = "grey";
                ctx.moveTo(500, 782);
                ctx.lineTo(985, 782);
                ctx.stroke();

                ctx.font = "25px SpaceMono-Regular";
                ctx.fillStyle = "lightgreen";
                ctx.textBaseline = "bottom";
                ctx.fillText("SAWMILL", 500, 782);

                ctx.font = "15px SpaceMono-Regular";
                ctx.fillStyle = "green";
                ctx.fillText("Workers: 4", 500, 812);

                ctx.fillStyle = "white";
                ctx.fillText("Produces wood from surrounding trees.", 500, 842);
            }
        } else if (this.display == 3) {
            ctx.drawImage(this.ballistaIcon, 1037, 739, 45, 45);
            if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {

            }
        } else if (this.display == 4) {
            ctx.drawImage(this.woodWallIcon, 1037, 739, 45, 45);
            if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {

            }
        }

        if ((this.display == 1) || (this.display == 2) || (this.display == 3) || (this.display == 4)) {
            ctx.drawImage(this.cancelIcon, 1184, 837, 45, 45);
            ctx.drawImage(this.backIcon, 1233, 837, 45, 45);
        }

        // RESOURCES
        ctx.font = "15px SpaceMono-Regular";
        ctx.fillStyle = "lightgreen";
        // Workers
        ctx.drawImage(this.unitsIcon, 1365, 780, 20, 18);
        this.drawHealthbar(ctx, 1400, 780, 100, 15, this.game.numWorkers, this.game.maxWorkers);

        // Food
        ctx.drawImage(this.foodIcon, 1365, 800, 20, 18);
        this.drawHealthbar(ctx, 1400, 800, 100, 15, this.game.food, this.game.maxFood);
        ctx.fillText("+" + this.game.foodRate.toString(), 1510, 812);


        // Wood
        ctx.drawImage(this.woodIcon, 1365, 820, 20, 18);
        this.drawHealthbar(ctx, 1400, 820, 100, 15, this.game.wood, this.game.maxWood);
        ctx.fillText("+" + this.game.woodRate.toString(), 1510, 832);

        // Stone
        ctx.drawImage(this.stoneIcon, 1365, 840, 20, 18);
        this.drawHealthbar(ctx, 1400, 840, 100, 15, this.game.stone, this.game.maxStone);
        ctx.fillText("+" + this.game.stoneRate.toString(), 1510, 852);

        // Iron               
        ctx.drawImage(this.ironIcon, 1365, 860, 20, 18);
        this.drawHealthbar(ctx, 1400, 860, 100, 15, this.game.iron, this.game.maxIron);
        ctx.fillText("+" + this.game.ironRate.toString(), 1510, 872);

        // FPS               
        ctx.fillText(this.game.fps.toString() + " fps", 1510, 770);
    };


    drawHealthbar(ctx, x, y, width, height, val, maxVal) {
        const posX = x;
        //const posX = x - this.xOffset - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH);
        //const posY = y - this.yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH);
        const posY = y;

        ctx.save();

        ctx.strokeStyle = 'gray';
        ctx.strokeRect(posX, posY, width, height);

        ctx.fillStyle = 'black';
        ctx.fillRect(posX + 1, posY + 1, width - 2, height - 2);

        ctx.fillStyle = val >= 50 ? 'green' : 'red';
        ctx.fillRect(posX + 2, posY + 2, (width - 4) * (val / maxVal), (height - 5));

        ctx.font = "10px SpaceMono-Regular";
        ctx.fillStyle = "white";
        ctx.fillText(val + "/" + maxVal, x + 30, y + 10);


        ctx.restore();
    };


    drawTimer(ctx) {
        // Hour
        if (Math.floor(this.game.elapsedHour / 24) == 0) {
            switch (Math.floor(this.game.elapsedHour) % 10) {
                case 0:
                    ctx.drawImage(this.zeroIcon, 362, 786, 17, 29);
                    break;
                case 1:
                    ctx.drawImage(this.oneIcon, 362, 786, 17, 29);
                    break;
                case 2:
                    ctx.drawImage(this.twoIcon, 362, 786, 17, 29);
                    break;
                case 3:
                    ctx.drawImage(this.threeIcon, 362, 786, 17, 29);
                    break;
                case 4:
                    ctx.drawImage(this.fourIcon, 362, 786, 17, 29);
                    break;
                case 5:
                    ctx.drawImage(this.fiveIcon, 362, 786, 17, 29);
                    break;
                case 6:
                    ctx.drawImage(this.sixIcon, 362, 786, 17, 29);
                    break;
                case 7:
                    ctx.drawImage(this.sevenIcon, 362, 786, 17, 29);
                    break;
                case 8:
                    ctx.drawImage(this.eightIcon, 362, 786, 17, 29);
                    break;
                case 9:
                    ctx.drawImage(this.nineIcon, 362, 786, 17, 29);
                    break;
            }

            switch (Math.floor(this.game.elapsedHour / 10) % 100) {
                case 0:
                    ctx.drawImage(this.zeroIcon, 344, 786, 17, 29);
                    break;
                case 1:
                    ctx.drawImage(this.oneIcon, 344, 786, 17, 29);
                    break;
                case 2:
                    ctx.drawImage(this.twoIcon, 344, 786, 17, 29);
                    break;
                case 3:
                    ctx.drawImage(this.threeIcon, 344, 786, 17, 29);
                    break;
                case 4:
                    ctx.drawImage(this.fourIcon, 344, 786, 17, 29);
                    break;
                case 5:
                    ctx.drawImage(this.fiveIcon, 344, 786, 17, 29);
                    break;
                case 6:
                    ctx.drawImage(this.sixIcon, 344, 786, 17, 29);
                    break;
                case 7:
                    ctx.drawImage(this.sevenIcon, 344, 786, 17, 29);
                    break;
                case 8:
                    ctx.drawImage(this.eightIcon, 344, 786, 17, 29);
                    break;
                case 9:
                    ctx.drawImage(this.nineIcon, 344, 786, 17, 29);
                    break;
            }
        } else {
            this.game.elapsedHour = 0;
            this.game.elapsedDay++;
        }

        // Day
        switch (Math.floor(this.game.elapsedDay) % 10) {
            case 0:
                ctx.drawImage(this.zeroIcon, 250, 786, 17, 29);
                break;
            case 1:
                ctx.drawImage(this.oneIcon, 250, 786, 17, 29);
                break;
            case 2:
                ctx.drawImage(this.twoIcon, 250, 786, 17, 29);
                break;
            case 3:
                ctx.drawImage(this.threeIcon, 250, 786, 17, 29);
                break;
            case 4:
                ctx.drawImage(this.fourIcon, 250, 786, 17, 29);
                break;
            case 5:
                ctx.drawImage(this.fiveIcon, 250, 786, 17, 29);
                break;
            case 6:
                ctx.drawImage(this.sixIcon, 250, 786, 17, 29);
                break;
            case 7:
                ctx.drawImage(this.sevenIcon, 250, 786, 17, 29);
                break;
            case 8:
                ctx.drawImage(this.eightIcon, 250, 786, 17, 29);
                break;
            case 9:
                ctx.drawImage(this.nineIcon, 250, 786, 17, 29);
                break;
        }

        switch (Math.floor(this.game.elapsedDay / 10) % 10) {
            case 0:
                ctx.drawImage(this.zeroIcon, 232, 786, 17, 29);
                break;
            case 1:
                ctx.drawImage(this.oneIcon, 232, 786, 17, 29);
                break;
            case 2:
                ctx.drawImage(this.twoIcon, 232, 786, 17, 29);
                break;
            case 3:
                ctx.drawImage(this.threeIcon, 232, 786, 17, 29);
                break;
            case 4:
                ctx.drawImage(this.fourIcon, 232, 786, 17, 29);
                break;
            case 5:
                ctx.drawImage(this.fiveIcon, 232, 786, 17, 29);
                break;
            case 6:
                ctx.drawImage(this.sixIcon, 232, 786, 17, 29);
                break;
            case 7:
                ctx.drawImage(this.sevenIcon, 232, 786, 17, 29);
                break;
            case 8:
                ctx.drawImage(this.eightIcon, 232, 786, 17, 29);
                break;
            case 9:
                ctx.drawImage(this.nineIcon, 232, 786, 17, 29);
                break;
        }

        switch (Math.floor(this.game.elapsedDay / 100) % 10) {
            case 0:
                ctx.drawImage(this.zeroIcon, 214, 786, 17, 29);
                break;
            case 1:
                ctx.drawImage(this.oneIcon, 214, 786, 17, 29);
                break;
            case 2:
                ctx.drawImage(this.twoIcon, 214, 786, 17, 29);
                break;
            case 3:
                ctx.drawImage(this.threeIcon, 214, 786, 17, 29);
                break;
            case 4:
                ctx.drawImage(this.fourIcon, 214, 786, 17, 29);
                break;
            case 5:
                ctx.drawImage(this.fiveIcon, 214, 786, 17, 29);
                break;
            case 6:
                ctx.drawImage(this.sixIcon, 214, 786, 17, 29);
                break;
            case 7:
                ctx.drawImage(this.sevenIcon, 214, 786, 17, 29);
                break;
            case 8:
                ctx.drawImage(this.eightIcon, 214, 786, 17, 29);
                break;
            case 9:
                ctx.drawImage(this.nineIcon, 214, 786, 17, 29);
                break;
        }
    }

};
