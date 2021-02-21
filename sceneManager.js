class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.cameraX = 10;
        this.cameraY = 27;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ui/frame.png");
        this.minimap = new Minimap(this.game, .15 * PARAMS.BLOCKWIDTH, 14.45 * PARAMS.BLOCKWIDTH);

        this.emptyIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_empty.png");
        this.buildingsImg = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.buildingsGreyImg = ASSET_MANAGER.getAsset("./sprites/buildings_grayscale.png");

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
        this.cancelIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_cancel.png");
        this.backIcon = ASSET_MANAGER.getAsset("./sprites/ui/icon_back.png");

        this.rangerIcon = ASSET_MANAGER.getAsset("./sprites/ranger.png");
        this.soldierIcon = ASSET_MANAGER.getAsset("./sprites/soldier.png");
        this.sniperIcon = ASSET_MANAGER.getAsset("./sprites/sniper.png");
        this.titanIcon = ASSET_MANAGER.getAsset("./sprites/titan.png");
        this.ballistaIcon = ASSET_MANAGER.getAsset("./sprites/ballista.png");
        this.machineGunTurretIcon = ASSET_MANAGER.getAsset("./sprites/machinegun_turret.png");

        this.display = 0; // 0 main, 1 colonist, 2 resources, 3 military, 4 defense
        this.selected = 0;

        this.loadEntities();
    };

    loadEntities() {
        ASSET_MANAGER.pauseBackgroundMusic();
        ASSET_MANAGER.playAsset("./music/backgroundMusic.mp3");
        
        this.game.entities = [];
        for(let i = 0; i < NUMBEROFPRIORITYLEVELS; i++) {
            this.game.entities.push([]);
        }

        this.game.addEntity(new MapOne(this.game));
        this.game.addEntity(new CommandCenter(this.game, 28, 35));
        this.game.addEntity(this.game.enemyspawner);
    };

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        PARAMS.CORD = document.getElementById("cord").checked;
        PARAMS.RESOURCEXY = document.getElementById("resourceXY").checked;

        this.updateAudio();

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
        if (this.cameraY > 31) {
            this.cameraY = 31;
        }
        if (this.cameraY < 0) {
            this.cameraY = 0;
        }

        // checking if there are enough resources to construct builidngs.
        if (this.game.workers >= this.game.requiredResources["WoodHouse"].workers &&
            this.game.food >= this.game.requiredResources["WoodHouse"].food &&
            this.game.wood >= this.game.requiredResources["WoodHouse"].wood &&
            this.game.stone >= this.game.requiredResources["WoodHouse"].stone &&
            this.game.iron >= this.game.requiredResources["WoodHouse"].iron) {
            this.game.requiredResources["WoodHouse"].enoughResource = true;
        } else {
            this.game.requiredResources["WoodHouse"].enoughResource = false;
        }

        if (this.game.workers >= this.game.requiredResources["StoneHouse"].workers &&
            this.game.food >= this.game.requiredResources["StoneHouse"].food &&
            this.game.wood >= this.game.requiredResources["StoneHouse"].wood &&
            this.game.stone >= this.game.requiredResources["StoneHouse"].stone &&
            this.game.iron >= this.game.requiredResources["StoneHouse"].iron) {
            this.game.requiredResources["StoneHouse"].enoughResource = true;
        } else {
            this.game.requiredResources["StoneHouse"].enoughResource = false;
        }

        if (this.game.workers >= this.game.requiredResources["ApartmentComplex"].workers &&
            this.game.food >= this.game.requiredResources["ApartmentComplex"].food &&
            this.game.wood >= this.game.requiredResources["ApartmentComplex"].wood &&
            this.game.stone >= this.game.requiredResources["ApartmentComplex"].stone &&
            this.game.iron >= this.game.requiredResources["ApartmentComplex"].iron) {
            this.game.requiredResources["ApartmentComplex"].enoughResource = true;
        } else {
            this.game.requiredResources["ApartmentComplex"].enoughResource = false;
        }

        if (this.game.workers >= this.game.requiredResources["FishermansCottage"].workers &&
            this.game.food >= this.game.requiredResources["FishermansCottage"].food &&
            this.game.wood >= this.game.requiredResources["FishermansCottage"].wood &&
            this.game.stone >= this.game.requiredResources["FishermansCottage"].stone &&
            this.game.iron >= this.game.requiredResources["FishermansCottage"].iron) {
            this.game.requiredResources["FishermansCottage"].enoughResource = true;
        } else {
            this.game.requiredResources["FishermansCottage"].enoughResource = false;
        }
        if (this.game.workers >= this.game.requiredResources["Farm"].workers &&
            this.game.food >= this.game.requiredResources["Farm"].food &&
            this.game.wood >= this.game.requiredResources["Farm"].wood &&
            this.game.stone >= this.game.requiredResources["Farm"].stone &&
            this.game.iron >= this.game.requiredResources["Farm"].iron) {
            this.game.requiredResources["Farm"].enoughResource = true;
        } else {
            this.game.requiredResources["Farm"].enoughResource = false;
        }
        if (this.game.workers >= this.game.requiredResources["Quarry"].workers &&
            this.game.food >= this.game.requiredResources["Quarry"].food &&
            this.game.wood >= this.game.requiredResources["Quarry"].wood &&
            this.game.stone >= this.game.requiredResources["Quarry"].stone &&
            this.game.iron >= this.game.requiredResources["Quarry"].iron) {
            this.game.requiredResources["Quarry"].enoughResource = true;
        } else {
            this.game.requiredResources["Quarry"].enoughResource = false;
        }
        if (this.game.workers >= this.game.requiredResources["Sawmill"].workers &&
            this.game.food >= this.game.requiredResources["Sawmill"].food &&
            this.game.wood >= this.game.requiredResources["Sawmill"].wood &&
            this.game.stone >= this.game.requiredResources["Sawmill"].stone &&
            this.game.iron >= this.game.requiredResources["Sawmill"].iron) {
            this.game.requiredResources["Sawmill"].enoughResource = true;
        } else {
            this.game.requiredResources["Sawmill"].enoughResource = false;
        }
        if (this.game.workers >= this.game.requiredResources["Ranger"].workers &&
            this.game.food >= this.game.requiredResources["Ranger"].food &&
            this.game.wood >= this.game.requiredResources["Ranger"].wood &&
            this.game.stone >= this.game.requiredResources["Ranger"].stone &&
            this.game.iron >= this.game.requiredResources["Ranger"].iron) {
            this.game.requiredResources["Ranger"].enoughResource = true;
        } else {
            this.game.requiredResources["Ranger"].enoughResource = false;
        }
        if (this.game.workers >= this.game.requiredResources["Soldier"].workers &&
            this.game.food >= this.game.requiredResources["Soldier"].food &&
            this.game.wood >= this.game.requiredResources["Soldier"].wood &&
            this.game.stone >= this.game.requiredResources["Soldier"].stone &&
            this.game.iron >= this.game.requiredResources["Soldier"].iron) {
            this.game.requiredResources["Soldier"].enoughResource = true;
        } else {
            this.game.requiredResources["Soldier"].enoughResource = false;
        }
        if (this.game.workers >= this.game.requiredResources["Sniper"].workers &&
            this.game.food >= this.game.requiredResources["Sniper"].food &&
            this.game.wood >= this.game.requiredResources["Sniper"].wood &&
            this.game.stone >= this.game.requiredResources["Sniper"].stone &&
            this.game.iron >= this.game.requiredResources["Sniper"].iron) {
            this.game.requiredResources["Sniper"].enoughResource = true;
        } else {
            this.game.requiredResources["Sniper"].enoughResource = false;
        }
        if (this.game.workers >= this.game.requiredResources["Titan"].workers &&
            this.game.food >= this.game.requiredResources["Titan"].food &&
            this.game.wood >= this.game.requiredResources["Titan"].wood &&
            this.game.stone >= this.game.requiredResources["Titan"].stone &&
            this.game.iron >= this.game.requiredResources["Titan"].iron) {
            this.game.requiredResources["Titan"].enoughResource = true;
        } else {
            this.game.requiredResources["Titan"].enoughResource = false;
        }
        if (this.game.workers >= this.game.requiredResources["Ballista"].workers &&
            this.game.food >= this.game.requiredResources["Ballista"].food &&
            this.game.wood >= this.game.requiredResources["Ballista"].wood &&
            this.game.stone >= this.game.requiredResources["Ballista"].stone &&
            this.game.iron >= this.game.requiredResources["Ballista"].iron) {
            this.game.requiredResources["Ballista"].enoughResource = true;
        } else {
            this.game.requiredResources["Ballista"].enoughResource = false;
        }
        if (this.game.workers >= this.game.requiredResources["MachineGunTurret"].workers &&
            this.game.food >= this.game.requiredResources["MachineGunTurret"].food &&
            this.game.wood >= this.game.requiredResources["MachineGunTurret"].wood &&
            this.game.stone >= this.game.requiredResources["MachineGunTurret"].stone &&
            this.game.iron >= this.game.requiredResources["MachineGunTurret"].iron) {
            this.game.requiredResources["MachineGunTurret"].enoughResource = true;
        } else {
            this.game.requiredResources["MachineGunTurret"].enoughResource = false;
        }
        if (this.game.workers >= this.game.requiredResources["WoodWall"].workers &&
            this.game.food >= this.game.requiredResources["WoodWall"].food &&
            this.game.wood >= this.game.requiredResources["WoodWall"].wood &&
            this.game.stone >= this.game.requiredResources["WoodWall"].stone &&
            this.game.iron >= this.game.requiredResources["WoodWall"].iron) {
            this.game.requiredResources["WoodWall"].enoughResource = true;
        } else {
            this.game.requiredResources["WoodWall"].enoughResource = false;
        }
        if (this.game.workers >= this.game.requiredResources["WoodGate"].workers &&
            this.game.food >= this.game.requiredResources["WoodGate"].food &&
            this.game.wood >= this.game.requiredResources["WoodGate"].wood &&
            this.game.stone >= this.game.requiredResources["WoodGate"].stone &&
            this.game.iron >= this.game.requiredResources["WoodGate"].iron) {
            this.game.requiredResources["WoodGate"].enoughResource = true;
        } else {
            this.game.requiredResources["WoodGate"].enoughResource = false;
        }
        if (this.game.workers >= this.game.requiredResources["StoneWall"].workers &&
            this.game.food >= this.game.requiredResources["StoneWall"].food &&
            this.game.wood >= this.game.requiredResources["StoneWall"].wood &&
            this.game.stone >= this.game.requiredResources["StoneWall"].stone &&
            this.game.iron >= this.game.requiredResources["StoneWall"].iron) {
            this.game.requiredResources["StoneWall"].enoughResource = true;
        } else {
            this.game.requiredResources["StoneWall"].enoughResource = false;
        }
        if (this.game.workers >= this.game.requiredResources["StoneGate"].workers &&
            this.game.food >= this.game.requiredResources["StoneGate"].food &&
            this.game.wood >= this.game.requiredResources["StoneGate"].wood &&
            this.game.stone >= this.game.requiredResources["StoneGate"].stone &&
            this.game.iron >= this.game.requiredResources["StoneGate"].iron) {
            this.game.requiredResources["StoneGate"].enoughResource = true;
        } else {
            this.game.requiredResources["StoneGate"].enoughResource = false;
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
                if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45) && this.game.requiredResources["WoodHouse"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new WoodHouse(this.game);
                    this.game.addEntity(this.selected);
                } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 739 && y <= 739 + 45) && this.game.requiredResources["StoneHouse"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new StoneHouse(this.game);
                    this.game.addEntity(this.selected);
                } else if ((x >= 1134 && x <= 1134 + 45) && (y >= 739 && y <= 739 + 95) && this.game.requiredResources["ApartmentComplex"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new ApartmentComplex(this.game);
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
                } else if ((x >= 1134 && x <= 1134 + 45) && (y >= 739 && y <= 739 + 95) && this.game.requiredResources["Quarry"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new Quarry(this.game);
                    this.game.addEntity(this.selected);
                } else if ((x >= 1184 && x <= 1184 + 45) && (y >= 739 && y <= 739 + 95) && this.game.requiredResources["Sawmill"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new Sawmill(this.game);
                    this.game.addEntity(this.selected);
                }
            } else if (this.display == 3) { // display 3
                if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45) && this.game.requiredResources["Soldier"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.game.allyspawner.spawnAllyRandomPath(SOLDIER);
                    this.game.workers -= this.game.requiredResources["Soldier"].workers;
                    this.game.workerRate -= this.game.requiredResources["Soldier"].workers;
                    this.game.food -= this.game.requiredResources["Soldier"].food;
                } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 739 && y <= 739 + 45) && this.game.requiredResources["Ranger"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.game.allyspawner.spawnAllyRandomPath(RANGER);
                    this.game.workers -= this.game.requiredResources["Ranger"].workers;
                    this.game.workerRate -= this.game.requiredResources["Ranger"].workers;
                    this.game.food -= this.game.requiredResources["Ranger"].food;
                    this.game.wood -= this.game.requiredResources["Ranger"].wood;
                    this.game.iron -= this.game.requiredResources["Ranger"].iron;
                } else if ((x >= 1134 && x <= 1134 + 45) && (y >= 739 && y <= 739 + 45) && this.game.requiredResources["Sniper"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.game.allyspawner.spawnAllyRandomPath(SNIPER);
                    this.game.workers -= this.game.requiredResources["Sniper"].workers;
                    this.game.workerRate -= this.game.requiredResources["Sniper"].workers;
                    this.game.food -= this.game.requiredResources["Sniper"].food;
                    this.game.iron -= this.game.requiredResources["Sniper"].iron;
                } else if ((x >= 1184 && x <= 1184 + 45) && (y >= 739 && y <= 739 + 45) && this.game.requiredResources["Titan"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.game.allyspawner.spawnAllyRandomPath(TITAN);
                    this.game.workers -= this.game.requiredResources["Titan"].workers;
                    this.game.workerRate -= this.game.requiredResources["Titan"].workers;
                    this.game.food -= this.game.requiredResources["Titan"].food;
                    this.game.iron -= this.game.requiredResources["Titan"].iron;
                } else if ((x >= 1037 && x <= 1037 + 45) && (y >= 789 && y <= 789 + 45) && this.game.requiredResources["Ballista"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new Ballista(this.game);
                    this.game.addEntity(this.selected);
                    this.game.workers -= this.game.requiredResources["Ballista"].workers;
                    this.game.workerRate -= this.game.requiredResources["Ballista"].workers;
                    this.game.iron -= this.game.requiredResources["Ballista"].iron;
                } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 789 && y <= 789 + 45) && this.game.requiredResources["MachineGunTurret"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new MachineGunTurret(this.game);
                    this.game.addEntity(this.selected);
                    this.game.workers -= this.game.requiredResources["MachineGunTurret"].workers;
                    this.game.workerRate -= this.game.requiredResources["MachineGunTurret"].workers;
                    this.game.stone -= this.game.requiredResources["MachineGunTurret"].stone;
                    this.game.iron -= this.game.requiredResources["MachineGunTurret"].iron;
                }
            } else if (this.display == 4) { // display 4
                if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45) && this.game.requiredResources["WoodWall"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new WoodWall(this.game);
                    this.game.addEntity(this.selected);
                } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 739 && y <= 739 + 45) && this.game.requiredResources["WoodGate"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new WoodGateHorizontal(this.game);
                    this.game.addEntity(this.selected);
                } else if ((x >= 1134 && x <= 1134 + 45) && (y >= 739 && y <= 739 + 45) && this.game.requiredResources["WoodGate"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new WoodGateVertical(this.game);
                    this.game.addEntity(this.selected);
                } else if ((x >= 1037 && x <= 1037 + 45) && (y >= 789 && y <= 789 + 45) && this.game.requiredResources["StoneWall"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new StoneWall(this.game);
                    this.game.addEntity(this.selected);
                } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 789 && y <= 789 + 45) && this.game.requiredResources["StoneGate"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new StoneGateHorizontal(this.game);
                    this.game.addEntity(this.selected);
                } else if ((x >= 1134 && x <= 1134 + 45) && (y >= 789 && y <= 789 + 45) && this.game.requiredResources["StoneGate"].enoughResource) {
                    if (this.selected) {
                        this.selected.removeFromWorld = true;
                    }
                    this.selected = new StoneGateVertical(this.game);
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

            // descriptions
            if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) { // COLONISTS
                ctx.strokeStyle = "grey";
                ctx.moveTo(500, 782);
                ctx.lineTo(985, 782);
                ctx.stroke();

                ctx.font = "25px SpaceMono-Regular";
                ctx.fillStyle = "AliceBlue";
                ctx.textBaseline = "bottom";
                ctx.fillText("COLONISTS", 500, 782);

                ctx.font = "15px SpaceMono-Regular";
                ctx.fillStyle = "white";
                ctx.fillText("Dwellings for the colonists.", 500, 812);
            } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 739 && y <= 739 + 45)) { // RESOURCES
                ctx.strokeStyle = "grey";
                ctx.moveTo(500, 782);
                ctx.lineTo(985, 782);
                ctx.stroke();

                ctx.font = "25px SpaceMono-Regular";
                ctx.fillStyle = "AliceBlue";
                ctx.textBaseline = "bottom";
                ctx.fillText("RESOURCES", 500, 782);

                ctx.font = "15px SpaceMono-Regular";
                ctx.fillStyle = "white";
                ctx.fillText("Structures dedicated to the resources prodcution.", 500, 812);
            } else if ((x >= 1134 && x <= 1134 + 45) && (y >= 739 && y <= 739 + 45)) {  // MILITARY
                ctx.strokeStyle = "grey";
                ctx.moveTo(500, 782);
                ctx.lineTo(985, 782);
                ctx.stroke();

                ctx.font = "25px SpaceMono-Regular";
                ctx.fillStyle = "AliceBlue";
                ctx.textBaseline = "bottom";
                ctx.fillText("MILITARY", 500, 782);

                ctx.font = "15px SpaceMono-Regular";
                ctx.fillStyle = "white";
                ctx.fillText("Military structures for attacking and units training.", 500, 812);
            } else if ((x >= 1184 && x <= 1184 + 45) && (y >= 739 && y <= 739 + 45)) { // DEFENSE
                ctx.strokeStyle = "grey";
                ctx.moveTo(500, 782);
                ctx.lineTo(985, 782);
                ctx.stroke();

                ctx.font = "25px SpaceMono-Regular";
                ctx.fillStyle = "AliceBlue";
                ctx.textBaseline = "bottom";
                ctx.fillText("DEFENSE", 500, 782);

                ctx.font = "15px SpaceMono-Regular";
                ctx.fillStyle = "white";
                ctx.fillText("Defensive and surveillance structures for the colony.", 500, 812);
            }
        } else if (this.display == 1) {
            // Wood House icon
            ctx.drawImage(this.emptyIcon, 1037, 739, 45, 45);
            if (this.game.requiredResources["WoodHouse"].enoughResource) {
                //ctx.drawImage(this.buildingsImg, 96, 395, 32, 39, 1042, 744, 35, 35);
                ctx.drawImage(this.buildingsImg, 192, 128, 32, 32, 1042, 744, 35, 35);
            } else {
                ctx.drawImage(this.buildingsGreyImg, 96, 395, 32, 39, 1042, 744, 35, 35);
            }
            // Stone House icon
            ctx.drawImage(this.emptyIcon, 1087, 739, 45, 45);
            if (this.game.requiredResources["StoneHouse"].enoughResource) {
                //ctx.drawImage(this.buildingsImg, 56, 387, 32, 47, 1092, 744, 35, 35);
                ctx.drawImage(this.buildingsImg, 224, 128, 32, 32, 1092, 744, 35, 35);

            } else {
                ctx.drawImage(this.buildingsGreyImg, 56, 387, 32, 47, 1092, 744, 35, 35);
            }
            // Apartment Complex icon
            ctx.drawImage(this.emptyIcon, 1134, 739, 45, 95);
            //ctx.drawImage(this.emptyIcon, 1134, 739, 45, 45);
            if (this.game.requiredResources["ApartmentComplex"].enoughResource) {
                // ctx.drawImage(this.buildingsImg, 0, 393, 48, 41, 1139, 744, 35, 35);
                ctx.drawImage(this.buildingsImg, 160, 96, 32, 64, 1139, 744, 35, 80);
            } else {
                ctx.drawImage(this.buildingsGreyImg, 160, 96, 32, 64, 1139, 744, 35, 80);
                //ctx.drawImage(this.buildingsGreyImg, 0, 393, 48, 41, 1139, 744, 35, 35);
            }
            // descriptions
            if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {
                this.addDescription(ctx, "WoodHouse", "WOOD HOUSE", ["wood"], 
                ["Basic dwelling for the colonists.", "Colonists provide workers for the colony."]);
            } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 739 && y <= 739 + 45)) {
                this.addDescription(ctx, "StoneHouse", "STONE HOUSE", ["stone"], 
                ["Medium level dwelling for the colonists.", "Colonists provide workers for the colony."]);
            } else if ((x >= 1134 && x <= 1134 + 45) && (y >= 739 && y <= 739 + 95)) {
                this.addDescription(ctx, "ApartmentComplex", "APARTMENT COMPLEX", ["wood", "stone", "iron"], 
                ["Highest dwelling for the colonists.", "Colonists provide workers for the colony."]);
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
            ctx.drawImage(this.emptyIcon, 1134, 739, 45, 95);
            if (this.game.requiredResources["Quarry"].enoughResource) {
                ctx.drawImage(this.buildingsImg, 0, 3 * 32, 32, 64, 1139, 744, 35, 80);
            } else {
                ctx.drawImage(this.buildingsGreyImg, 0, 3 * 32, 32, 64, 1139, 744, 35, 80);
            }
            // sawmill icon
            ctx.drawImage(this.emptyIcon, 1184, 739, 45, 95);
            if (this.game.requiredResources["Sawmill"].enoughResource) {
                ctx.drawImage(this.buildingsImg, 3 * 32, 3 * 32, 32, 64, 1189, 744, 35, 80);
            } else {
                ctx.drawImage(this.buildingsGreyImg, 3 * 32, 3 * 32, 32, 64, 1189, 744, 35, 80);
            }

            // descriptions
            if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {
                this.addDescription(ctx, "FishermansCottage", "FISHERMAN COTTAGE", ["workers", "wood", "iron"], 
                ["Produces food from surrounding sea cells.", "It must be placed near a water source."]);
            } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 739 && y <= 739 + 45)) {
                this.addDescription(ctx, "Farm", "FARM", ["workers", "wood", "stone", "iron"], 
                ["Produces food by harvesting grass field", "from the surroundings."]);
            } else if ((x >= 1134 && x <= 1134 + 45) && (y >= 739 && y <= 739 + 95)) {
                this.addDescription(ctx, "Quarry", "QUARRY", ["workers", "wood", "stone", "iron"], 
                ["Collects metals like stone, and iron", "from stone and iron rocks."]);
            } else if ((x >= 1184 && x <= 1184 + 45) && (y >= 739 && y <= 739 + 95)) {
                this.addDescription(ctx, "Sawmill", "SAWMILL", ["workers", "wood", "stone", "iron"], 
                ["Produces wood from surrounding trees."]);
            }
        } else if (this.display == 3) {
            // soldier icon
            ctx.drawImage(this.emptyIcon, 1037, 739, 45, 45);
            if (this.game.requiredResources["Soldier"].enoughResource) {
                ctx.drawImage(this.soldierIcon, 1061, 16, 60, 65, 1046, 744, 28, 33);
            } else {
                ctx.drawImage(this.soldierIcon, 1061, 16, 60, 65, 1046, 744, 28, 33);
            }
            // ranger icon
            ctx.drawImage(this.emptyIcon, 1087, 739, 45, 45);
            if (this.game.requiredResources["Ranger"].enoughResource) {
                ctx.drawImage(this.rangerIcon, 22, 1043, 73, 69, 1096, 743, 35, 35);
            } else {
                ctx.drawImage(this.rangerIcon, 22, 1043, 73, 69, 1096, 743, 35, 35);
            }
            // sniper icon
            ctx.drawImage(this.emptyIcon, 1134, 739, 45, 45);
            if (this.game.requiredResources["Sniper"].enoughResource) {
                ctx.drawImage(this.sniperIcon, 717, 14, 64, 82, 1145, 742, 28, 40);
            } else {
                ctx.drawImage(this.sniperIcon, 717, 14, 64, 82, 1145, 742, 28, 40);
            }
            // titan icon
            ctx.drawImage(this.emptyIcon, 1184, 739, 45, 45);
            if (this.game.requiredResources["Titan"].enoughResource) {
                ctx.drawImage(this.titanIcon, 3651, 795, 96, 87, 1184, 739, 45, 43);
            } else {
                ctx.drawImage(this.titanIcon, 3651, 795, 96, 87, 1184, 739, 45, 43);
            }
            // ballista icon
            ctx.drawImage(this.emptyIcon, 1037, 789, 45, 45);
            if (this.game.requiredResources["Ballista"].enoughResource) {
                ctx.drawImage(this.ballistaIcon, 0, 0, 64, 64, 1042, 794, 35, 35);
            } else {
                ctx.drawImage(this.ballistaIcon, 0, 0, 64, 64, 1042, 794, 35, 35);
            }
            // machine gun turret icon
            ctx.drawImage(this.emptyIcon, 1087, 789, 45, 45);
            if (this.game.requiredResources["MachineGunTurret"].enoughResource) {
                ctx.drawImage(this.machineGunTurretIcon, 0, 0, 110, 125, 1092, 794, 35, 35);
            } else {
                ctx.drawImage(this.machineGunTurretIcon, 0, 0, 110, 125, 1092, 794, 35, 35);
            }

            // descriptions
            if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {
                this.addDescription(ctx, "Soldier", "SOLDIER", ["workers", "food"], 
                ["This versatile unit can serve any purpose."]);
            } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 739 && y <= 739 + 45)) {
                this.addDescription(ctx, "Ranger", "RANGER", ["workers", "food", "wood", "iron"], 
                ["They run extremely fast and can shoot their", "arrows with their silent bow."]);
            } else if ((x >= 1134 && x <= 1134 + 45) && (y >= 739 && y <= 739 + 45)) {
                this.addDescription(ctx, "Sniper", "SNIPER", ["workers", "food", "iron"], 
                ["Snipers walk very slowly", "However, Snipers have a very high attack range."]);
            } else if ((x >= 1184 && x <= 1184 + 45) && (y >= 739 && y <= 739 + 45)) {
                this.addDescription(ctx, "Titan", "TITAN", ["workers", "food", "iron"], 
                ["Titans has an ultra fast burst shot and a wide"]);
                ctx.fillText("area of effect.", 500, 862);
            } else if ((x >= 1037 && x <= 1037 + 45) && (y >= 789 && y <= 789 + 45)) {
                this.addDescription(ctx, "Ballista", "BALLISTA", ["workers", "wood", "iron"], 
                ["Attacks nearby enemies by shooting large arrows."]);
            } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 789 && y <= 789 + 45)) {
                this.addDescription(ctx, "MachineGunTurret", "MACHINE GUN TURRET", ["workers", "stone", "iron"], 
                ["Attacks nearby enemies inflicting massive damage within", "an effect area of 0.6 cells radius."]);
            }
        } else if (this.display == 4) {
            // wood wall icon
            ctx.drawImage(this.emptyIcon, 1037, 739, 45, 45);
            if (this.game.requiredResources["WoodWall"].enoughResource) {
                ctx.drawImage(this.buildingsImg, 128, 32, 32, 32, 1042, 744, 35, 35);
            } else {
                ctx.drawImage(this.buildingsGreyImg, 128, 64, 32, 32, 1042, 744, 35, 35);
            }
            // wood gate horizontal icon
            ctx.drawImage(this.emptyIcon, 1087, 739, 45, 45);
            if (this.game.requiredResources["WoodGate"].enoughResource) {
                ctx.drawImage(this.buildingsImg, 0, 32, 32, 32, 1092, 744, 35, 35);
            } else {
                ctx.drawImage(this.buildingsGreyImg, 0, 32, 32, 32, 1092, 744, 35, 35);
            }
            // wood gate vertical icon
            ctx.drawImage(this.emptyIcon, 1134, 739, 45, 45);
            if (this.game.requiredResources["WoodGate"].enoughResource) {
                ctx.drawImage(this.buildingsImg, 64, 32, 32, 32, 1139, 744, 35, 35);
            } else {
                ctx.drawImage(this.buildingsGreyImg, 64, 32, 32, 32, 1139, 744, 35, 35);
            }
            // stone wall icon
            ctx.drawImage(this.emptyIcon, 1037, 789, 45, 45);
            if (this.game.requiredResources["StoneWall"].enoughResource) {
                ctx.drawImage(this.buildingsImg, 128, 0, 32, 32, 1042, 794, 35, 35);
            } else {
                ctx.drawImage(this.buildingsGreyImg, 128, 0, 32, 32, 1042, 794, 35, 35);
            }
            // stone gate horizontal icon
            ctx.drawImage(this.emptyIcon, 1087, 789, 45, 45);
            if (this.game.requiredResources["StoneGate"].enoughResource) {
                ctx.drawImage(this.buildingsImg, 0, 0, 32, 32, 1092, 794, 35, 35);
            } else {
                ctx.drawImage(this.buildingsGreyImg, 0, 0, 32, 32, 1092, 794, 35, 35);
            }
            // stone gate vertical icon
            ctx.drawImage(this.emptyIcon, 1134, 789, 45, 45);
            if (this.game.requiredResources["StoneGate"].enoughResource) {
                ctx.drawImage(this.buildingsImg, 64, 0, 32, 32, 1139, 794, 35, 35);
            } else {
                ctx.drawImage(this.buildingsGreyImg, 96, 0, 32, 32, 1139, 794, 35, 35);
            }

            // descriptions
            if ((x >= 1037 && x <= 1037 + 45) && (y >= 739 && y <= 739 + 45)) {
                this.addDescription(ctx, "WoodWall", "WOOD WALL", ["wood"], 
                ["Walls keep the colony defended from nearby enemies."]);
            } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 739 && y <= 739 + 45)) {
                this.addDescription(ctx, "WoodGate", "WOOD GATE (horizontal)", ["wood"], 
                ["Gates automatically allow friendly units to", "pass through the walls."]);
            } else if ((x >= 1134 && x <= 1134 + 45) && (y >= 739 && y <= 739 + 45)) {
                this.addDescription(ctx, "WoodGate", "WOOD GATE (vertical)", ["wood"], 
                ["Gates automatically allow friendly units to", "pass through the walls."]);
            } else if ((x >= 1037 && x <= 1037 + 45) && (y >= 789 && y <= 789 + 45)) {
                this.addDescription(ctx, "StoneWall", "STONE WALL", ["stone"], 
                ["Strong walls that keep the colony defended", "from nearby enemies."]);
            } else if ((x >= 1087 && x <= 1087 + 45) && (y >= 789 && y <= 789 + 45)) {
                this.addDescription(ctx, "StoneGate", "STONE GATE (horizontal)", ["stone"], 
                ["Stronger quality. Gates open and close automatically", "to allow friendly units to pass through the walls."]);
            } else if ((x >= 1134 && x <= 1134 + 45) && (y >= 789 && y <= 789 + 45)) {
                this.addDescription(ctx, "StoneGate", "STONE GATE (vertical)", ["stone"], 
                ["Stronger quality. Gates open and close automatically", "to allow friendly units to pass through the walls."]);
            }
        }

        if ((this.display == 1) || (this.display == 2) || (this.display == 3) || (this.display == 4)) {
            ctx.drawImage(this.cancelIcon, 1184, 837, 45, 45);
            ctx.drawImage(this.backIcon, 1233, 837, 45, 45);

            if ((x >= 1184 && x <= 1184 + 45) && (y >= 837 && y <= 837 + 45)) {
                ctx.strokeStyle = "grey";
                ctx.moveTo(500, 782);
                ctx.lineTo(985, 782);
                ctx.stroke();

                ctx.font = "25px SpaceMono-Regular";
                ctx.fillStyle = "yellow";
                ctx.textBaseline = "bottom";
                ctx.fillText("Cancel", 500, 782);

                ctx.font = "15px SpaceMono-Regular";
                ctx.fillStyle = "white";
                ctx.fillText("Cancel the selected building.", 500, 812);
            } else if ((x >= 1233 && x <= 1233 + 45) && (y >= 837 && y <= 837 + 45)) {
                ctx.strokeStyle = "grey";
                ctx.moveTo(500, 782);
                ctx.lineTo(985, 782);
                ctx.stroke();

                ctx.font = "25px SpaceMono-Regular";
                ctx.fillStyle = "yellow";
                ctx.textBaseline = "bottom";
                ctx.fillText("Back", 500, 782);

                ctx.font = "15px SpaceMono-Regular";
                ctx.fillStyle = "white";
                ctx.fillText("Go back to the previous screen.", 500, 812);
            }

        }

        //console.log("x is: ")

        // RESOURCES
        ctx.font = "15px SpaceMono-Regular";
        ctx.textBaseline = "bottom";
        ctx.fillStyle = "lightgreen";
        // Workers
        ctx.drawImage(this.unitsIcon, 1365, 780, 20, 18);
        this.drawHealthbar(ctx, 1400, 780, 100, 15, this.game.workers, this.game.maxWorkers);
        //console.log("workerRate is ")
        var workerRate = "";
        /*if (workerRate >= 0) {
            ctx.fillText("+" + this.game.workerRate.toString(), 1510, 796);
        } else {
            ctx.fillText(this.game.workerRate.toString(), 1510, 796);
        }*/
        ctx.fillText(this.game.workerRate.toString(), 1510, 796);

        // Food
        ctx.drawImage(this.foodIcon, 1365, 800, 20, 18);
        this.drawHealthbar(ctx, 1400, 800, 100, 15, this.game.food, this.game.maxFood);
        ctx.fillText("+" + this.game.foodRate.toString(), 1510, 816);


        // Wood
        ctx.drawImage(this.woodIcon, 1365, 820, 20, 18);
        this.drawHealthbar(ctx, 1400, 820, 100, 15, this.game.wood, this.game.maxWood);
        ctx.fillText("+" + this.game.woodRate.toString(), 1510, 836);

        // Stone
        ctx.drawImage(this.stoneIcon, 1365, 840, 20, 18);
        this.drawHealthbar(ctx, 1400, 840, 100, 15, this.game.stone, this.game.maxStone);
        ctx.fillText("+" + this.game.stoneRate.toString(), 1510, 856);

        // Iron               
        ctx.drawImage(this.ironIcon, 1365, 860, 20, 18);
        this.drawHealthbar(ctx, 1400, 860, 100, 15, this.game.iron, this.game.maxIron);
        ctx.fillText("+" + this.game.ironRate.toString(), 1510, 876);

        // FPS               
        ctx.fillText(this.game.fps.toString() + " fps", 1510, 776);

        // Minimap
        this.minimap.draw(ctx);
    };

    // creates the descriptions for a given UI element
    addDescription(ctx, unitType, headerText, resourcesStringArray, descriptionStringArray) {

        ctx.strokeStyle = "grey";
        ctx.moveTo(500, 782);
        ctx.lineTo(985, 782);
        ctx.stroke();

        ctx.font = "25px SpaceMono-Regular";
        ctx.fillStyle = "lightgreen";
        ctx.textBaseline = "bottom";
        ctx.fillText(headerText, 500, 782);

        ctx.font = "15px SpaceMono-Regular";

        // traverse each resource
        let resourceStringX = 500;
        //console.log(unitType);
        //console.log(this.game.requiredResources);
        let requiredResources = this.game.requiredResources[unitType];
        resourcesStringArray.forEach(resourceStr => {
            let availableResourceAmount = this.game[resourceStr];
            let resourceStrUpperCase = resourceStr[0].toUpperCase() + resourceStr.slice(1);
            let requiredResourceAmount = requiredResources[resourceStr];
            //console.log("resourceStr: " + resourceStr);
            //console.log("availableResourceAmount: " + availableResourceAmount);
            //console.log("requiredResourceAmount: " + requiredResourceAmount);
            if (requiredResourceAmount > availableResourceAmount) { // a required resource
                ctx.fillStyle = "#fc8583";
            } else {
                ctx.fillStyle = "lightgreen";
            }
            ctx.fillText(resourceStrUpperCase + ": " + requiredResourceAmount, resourceStringX, 812);
            resourceStringX += 100;

        });
        let descriptionTextY = 842;
        ctx.font = "15px SpaceMono-Regular";
        ctx.fillStyle = "white";

        descriptionStringArray.forEach(description => {
            ctx.fillText(description, 500, descriptionTextY);
            descriptionTextY += 20;
        })
    }

    drawHealthbar(ctx, x, y, width, height, val, maxVal) {
        const posX = x;
        const posY = y;

        ctx.save();

        ctx.strokeStyle = 'gray';
        ctx.strokeRect(posX, posY, width, height);

        ctx.fillStyle = 'black';
        ctx.fillRect(posX + 1, posY + 1, width - 2, height - 2);

        //ctx.fillStyle = val >= (maxVal / 2) ? 'green' : 'red';
        ctx.fillStyle = 'green';
        ctx.fillRect(posX + 2, posY + 2, (width - 4) * (val / maxVal), (height - 5));

        ctx.font = "10px SpaceMono-Regular";
        ctx.fillStyle = "white";
        ctx.fillText(val + "/" + maxVal, x + 30, y + 12);


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
