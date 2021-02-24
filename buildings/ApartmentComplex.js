
class ApartmentComplex {
    constructor(game) {
        Object.assign(this, { game });
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
        this.priority = BUILDINGPRIORITY;
        this.followMouse = true;
        this.placeable = false;
        this.hitpoints = 150;
        this.radius = 30;
        this.workerRate = 5;
    };
    
    update() {
        if (this.hitpoints <= 0) {
            this.removeFromWorld = true;
            this.game.workerRate -= this.workerRate;
            //this.game.mainMap.map[(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH][(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].collisions = false;
            //this.game.mainMap.map[(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH + 1][(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].collisions = false;
            this.game.mainMap.map[(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH][(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH].collisions = false;
            this.game.mainMap.map[(this.x - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH][(this.y - PARAMS.BLOCKWIDTH/2)/PARAMS.BLOCKWIDTH + 1].collisions = false;
        }
        
        if (this.game.mouse && this.followMouse) {
            var x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            if ((y+1 <= 49) && // cursor is not at bottom edge of map (and therefore can place 2nd half of apartment)
                !this.game.mainMap.map[x][y].collisions && !this.game.mainMap.map[x][y+1].collisions) {
                    this.placeable = true;
            } else {
                this.placeable = false;
            }
        }

        //placing selected entity
        if (this.game.click && this.followMouse) {
            var x = sanitizeCord(this.game.mouse.x + this.game.camera.cameraX);
            var y = sanitizeCord(this.game.mouse.y + this.game.camera.cameraY);
            if (this.game.click.y < 15 && this.placeable) {
                this.game.mainMap.map[x][y].collisions = true;
                this.game.mainMap.map[x][y+1].collisions = true;
                this.followMouse = false;
                this.x = x * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;
                this.y = y * PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH/2;

                this.game.workers -= this.game.requiredResources["ApartmentComplex"].workers;
                this.game.food -= this.game.requiredResources["ApartmentComplex"].food;
                this.game.wood -= this.game.requiredResources["ApartmentComplex"].wood;
                this.game.stone -= this.game.requiredResources["ApartmentComplex"].stone;
                this.game.iron -= this.game.requiredResources["ApartmentComplex"].iron;
                
                this.game.workerRate += this.workerRate;
            }
            this.game.click = null;
        }
    };

    drawHealthbar(ctx) {
        const posX = this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH) - 30;
        const posY = this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH) - 20;

        ctx.save();

        ctx.strokeStyle = 'gray';
        ctx.strokeRect(posX, posY, 70, 8);
        
        ctx.fillStyle = 'white';
        ctx.fillRect(posX + 1, posY + 1, 68, 6);

        ctx.fillStyle = this.hitpoints >= 50 ? 'green' : 'red';
        ctx.fillRect(posX + 2, posY + 2, 66 * (this.hitpoints / MAX_APARTMENT_HEATLH), 3);
        
        ctx.restore();
    };

    draw(ctx) {
        const width = 32;
        const height = 64;
        const startY = 96;
        const startX = 160;
        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            if (this.placeable) {
                ctx.strokeStyle = 'Green';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
            } else {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
            }
            ctx.drawImage(this.spritesheet, startX, startY, width, height, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
            //ctx.strokeStyle = 'Purple';
            //ctx.strokeRect((mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-2) * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH, 6 * PARAMS.BLOCKWIDTH);
            ctx.font = "15px SpaceMono-Regular";
            ctx.fillStyle = "lightgreen";
            ctx.fillText("Place to recruit workers.", (mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-1.7)*PARAMS.BLOCKWIDTH);
            ctx.fillText(this.workerRate + " workers", (mouse.x) * PARAMS.BLOCKWIDTH, (mouse.y+3)*PARAMS.BLOCKWIDTH);
        }

        if(!this.followMouse){
            ctx.drawImage(this.spritesheet, startX, startY, width, height, (this.x - PARAMS.BLOCKWIDTH/2) - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (this.y - PARAMS.BLOCKWIDTH/2) - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
        }

        if (this.hitpoints < MAX_APARTMENT_HEALTH) {
            drawHealthbar(ctx, this.hitpoints, this.x, this.y, this.game, MAX_APARTMENT_HEALTH);
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
        if((this.x - PARAMS.BLOCKWIDTH/2) >= 0 && (this.x - PARAMS.BLOCKWIDTH/2) <= PARAMS.MAPWIDTH * PARAMS.BLOCKWIDTH && (this.y - PARAMS.BLOCKWIDTH/2) >= 0 && (this.y - PARAMS.BLOCKWIDTH/2)<= PARAMS.MAPHEIGHT * PARAMS.BLOCKWIDTH) {
            ctx.fillStyle = "Green";
            ctx.fillRect(mmX + (this.x - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE, mmY + (this.y - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
            ctx.fillRect(mmX + (this.x - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE, mmY + (this.y - PARAMS.BLOCKWIDTH/2) * PARAMS.MINIMAPSCALE + 1, PARAMS.MINIMAPUNITSIZE, PARAMS.MINIMAPUNITSIZE);
          }
    }
};