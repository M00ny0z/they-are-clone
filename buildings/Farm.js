class Farm {
    constructor(game) {
        Object.assign(this, { game });
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.spritesheetCrops = ASSET_MANAGER.getAsset("./sprites/crops.png");
        this.priority = BUILDINGPRIORITY;
        this.followMouse = true;
        this.placeable = false;
        this.hitpoints = 150;
        this.foodRate = 0;
        this.radius = 30;

        this.initializeCropSprites();
    };

    initializeCropSprites() {
        let rowsOfCrops = 2;
        let numOfCropsInEachRow = 32;
        let numOfGrowthStages = 5;
        this.cropLocationsOnSpriteSheet = [];
        //Add a random crop (crops start at stage 0) to a 2d array that represents all the crops for this farm
        for (let i = 0; i < 5; i++) {
            this.cropLocationsOnSpriteSheet.push([]);
            for (let j = 0; j < 5; j++) {
                let r = this.getRandomInt(0, rowsOfCrops - 1);
                //Randomly select a crop
                //rows are 1-based
                this.cropLocationsOnSpriteSheet[i][j] = { 
                    row: r,
                    x: this.getRandomInt(0, 31) * 32, 
                    y: (r * 320 + 16),
                    growthRate: this.getRandomInt(8, 24),
                    gameHourMade: (this.game.elapsedDay * 24) + this.game.elapsedHour
                };
            }
        }
    }

    drawHealthbar(ctx) {
        const posX = this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH) - 30;
        const posY = this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH) - 20;

        ctx.save();

        ctx.strokeStyle = 'gray';
        ctx.strokeRect(posX, posY, 70, 8);
        
        ctx.fillStyle = 'white';
        ctx.fillRect(posX + 1, posY + 1, 68, 6);

        ctx.fillStyle = this.hitpoints >= 50 ? 'green' : 'red';
        ctx.fillRect(posX + 2, posY + 2, 66 * (this.hitpoints / MAX_UNIT_HEALTH), 3);
        
        ctx.restore();
    };

    /**
     * 
     * @param {int} min Lower bound inclusive
     * @param {int} max Upper bound inclusive
     */
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    calcResourceRate() {
        this.foodRate = 0;
        // traverse from (-2,-2) to (+2,+2) from current (x,y) location (calculate a 5x5 grid of resources)
        let mapStartX = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX - 2);
        let mapStartY = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY - 2);
        let mapEndX = sanitizeCord(mapStartX + 4);
        let mapEndY = sanitizeCord(mapStartY + 4);
        for (var i = mapStartY; i <= mapEndY; i++) {
            for (var j = mapStartX; j <= mapEndX; j++) {
                if (this.game.mainMap.map[i][j].dirt) {
                    this.foodRate += 1;
                }
            }
        }
        if (PARAMS.RESOURCEXY) {
            console.log("mapStartX:" + mapStartX + ", mapStartY:" + mapStartY + ", mapEndX:" + mapEndX + ", mapEndY: " + mapEndY);
        }
    }

    update() {
        let currentGameHour = (this.game.elapsedDay * 24) + this.game.elapsedHour;

        //update crop growth stages
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let currentCrop = this.cropLocationsOnSpriteSheet[i][j];
                let hoursPerGrowthStage = currentCrop.growthRate;
                //Current growth stage = hours passed % (# of stages * # of hours per stage) / hours per stage
                let currentGrowthStage = 
                    Math.floor((currentGameHour - currentCrop.gameHourMade) % (5 * hoursPerGrowthStage) / hoursPerGrowthStage);
                //320 is the y value that would be after the last growth stage, so cycle to the earliest growth stage
                currentCrop.y = (currentGrowthStage * 64) + (currentCrop.row * 320) + 16;
            }
        }

        if (this.hitpoints <= 0) {
            this.removeFromWorld = true;
            this.game.foodRate -= this.foodRate;
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 5; j++) {
                    this.game.mainMap.map[(this.y - PARAMS.BLOCKWIDTH / 2) / PARAMS.BLOCKWIDTH + i - 2][(this.x - PARAMS.BLOCKWIDTH / 2) / PARAMS.BLOCKWIDTH + j - 2].collisions = false;
                }
            }
        }

        if (this.game.mouse && this.followMouse) {
            var x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            var stop = false;
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 5; j++) {
                    if (!this.game.mainMap.map[sanitizeCord(y + i - 2)][sanitizeCord(x + j - 2)].collisions) { 
                        this.placeable = true;
                    } else {
                        stop = true;
                    }
                }
                if (stop) {
                    this.placeable = false;
                    break;
                }
            }
            this.calcResourceRate();
        }

        //placing selected entity
        if (this.game.click && this.followMouse) {
            var x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            if (this.game.click.y < 15 && this.placeable) {
                for (var i = 0; i < 5; i++) {
                    for (var j = 0; j < 5; j++) {
                        this.game.mainMap.map[sanitizeCord(y + i - 2)][sanitizeCord(x + j - 2)].collisions = true;
                    }
                }
                this.followMouse = false;
                this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2;
                this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH / 2;

                this.game.workerRate -= this.game.requiredResources["Farm"].workers;
                this.game.workers -= this.game.requiredResources["Farm"].workers;
                this.game.food -= this.game.requiredResources["Farm"].food;
                this.game.wood -= this.game.requiredResources["Farm"].wood;
                this.game.stone -= this.game.requiredResources["Farm"].stone;
                this.game.iron -= this.game.requiredResources["Farm"].iron;

                this.game.foodRate += this.foodRate;
            }
            this.game.click = null;
        }
    };

    draw(ctx) {
        const width = 32;
        const height = 32;
        const startY = 4 * 32;
        const startX = 64;

        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            if (this.placeable) {
                ctx.strokeStyle = 'Green';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            } else {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            }

            ctx.drawImage(this.spritesheet, startX, startY, width, height, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            ctx.strokeStyle = 'Purple';
            ctx.strokeRect((mouse.x - 2) * PARAMS.BLOCKWIDTH, (mouse.y - 2) * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH);
            ctx.font = "15px SpaceMono-Regular";
            ctx.fillStyle = "lightgreen";
            ctx.fillText("Surround the dirt tiles", (mouse.x - 2) * PARAMS.BLOCKWIDTH, (mouse.y - 1.7) * PARAMS.BLOCKWIDTH);
            ctx.fillText("to gain food", (mouse.x - 2) * PARAMS.BLOCKWIDTH, (mouse.y - 1.4) * PARAMS.BLOCKWIDTH);
            ctx.fillText(this.foodRate + " food", (mouse.x) * PARAMS.BLOCKWIDTH, (mouse.y + 3) * PARAMS.BLOCKWIDTH);

        }

        let cropStartX;
        let cropsStartY;
        const cropsWidth = 32;
        const cropsHeight = 48;
        if (!this.followMouse) {
            //Draw farm building in center
            ctx.drawImage(this.spritesheet, startX, startY, width, height, (this.x - PARAMS.BLOCKWIDTH / 2) - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (this.y - PARAMS.BLOCKWIDTH / 2) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            //Draw crops around building
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (!(i == 2 && j == 2)) {
                        ctx.drawImage(this.spritesheetCrops,
                            this.cropLocationsOnSpriteSheet[i][j].x,
                            this.cropLocationsOnSpriteSheet[i][j].y,
                            cropsWidth,
                            cropsHeight,
                            (this.x - PARAMS.BLOCKWIDTH / 2) - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH) - (j - 2) * PARAMS.BLOCKWIDTH,
                            (this.y - PARAMS.BLOCKWIDTH / 2) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH) - (i - 2) * PARAMS.BLOCKWIDTH,
                            PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH
                        );
                    }
                }
            }
        }

        if (this.hitpoints < MAX_FARM_HEALTH) {
            drawHealthbar(ctx, this.hitpoints, this.x, this.y, this.game, MAX_FARM_HEALTH);
        }

        if (PARAMS.DEBUG && !this.followMouse) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
    };

    drawMinimap(ctx, mmX, mmY) {
        if ((this.x - PARAMS.BLOCKWIDTH / 2) >= 0 && (this.x - PARAMS.BLOCKWIDTH / 2) <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && (this.y - PARAMS.BLOCKWIDTH / 2) >= 0 && (this.y - PARAMS.BLOCKWIDTH / 2) <= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
            ctx.fillStyle = "Green";
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 5; j++) {
                    ctx.fillRect(mmX + (this.x - PARAMS.BLOCKWIDTH / 2) * PARAMS.MINIMAPSCALE + i - 2, mmY + (this.y - PARAMS.BLOCKWIDTH / 2) * PARAMS.MINIMAPSCALE + j - 2, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
                }
            }
        }
    }
};