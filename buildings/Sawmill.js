class Sawmill extends Building {
    constructor(game) {
        const width = 32;
        const height = 64;
        const spriteY = 3 * 32;
        const spriteX = 3 * 32;
        const followMouse = true;
        const heightMultiplier = 2;

        const updateLogic = (x, y) => 
            (this.game.mainMap.map[y + 1][x].green == true) || 
            (y > 0 && this.game.mainMap.map[y - 1][x].green == true) ||
            (this.game.mainMap.map[y][x + 1].green == true) || 
            (x > 0 && this.game.mainMap.map[y][x - 1].green == true);

        const placementLogic = () => this.game.click.y < 15 && this.placeable;

        const updateFunction = () => this.game.woodRate += this.woodRate;

        const drawFunction = (ctx, mouse) => {
            this.calcResourceRate();
            ctx.strokeStyle = 'Purple';
            ctx.strokeRect(
                (mouse.x-2) * PARAMS.BLOCKWIDTH, 
                (mouse.y-2) * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH, 
                6 * PARAMS.BLOCKWIDTH
            );
        };
        
        const drawText = (ctx, mouse) => {
            ctx.font = "15px SpaceMono-Regular";
            ctx.fillStyle = "lightgreen";
            ctx.fillText(
                "Surround the green tiles", 
                (mouse.x-2) * PARAMS.BLOCKWIDTH, 
                (mouse.y-1.7)*PARAMS.BLOCKWIDTH
            );
            ctx.fillText(
                "to gain wood", 
                (mouse.x-2) * PARAMS.BLOCKWIDTH, 
                (mouse.y-1.4)*PARAMS.BLOCKWIDTH
            );
            ctx.fillText(
                this.woodRate + " wood", 
                (mouse.x) * PARAMS.BLOCKWIDTH, 
                (mouse.y + 3)*PARAMS.BLOCKWIDTH
            );
        };


        super(game, ASSET_MANAGER.getAsset("./sprites/buildings.png"), width, height, 
              spriteX, spriteY, followMouse, heightMultiplier,
              placementLogic, updateLogic, drawFunction, updateFunction, drawText);
        
        this.woodRate = 0;
    };

    // takes gameEngines map object which is a 2D array of tiles
    calcResourceRate() {
        this.woodRate = 0;
        // traverse from (-2,-2) to (+2,+2) from current (x,y) location (calculate a 5x5 grid of resources)
        const mapStartX = Math.max((this.game.mouse.x + this.game.camera.cameraX - 2), 0);
        const mapStartY = Math.max((this.game.mouse.y + this.game.camera.cameraY - 2), 0);
        const mapEndX = (mapStartX + 4) > 49 ? 49 : (mapStartX + 4);
        const mapEndY = (mapStartY + 5) > 49 ? 49 : (mapStartY + 4);
        for (let i = mapStartX; i <= mapEndX; i++) {
            for (let j = mapStartY; j <= mapEndY; j++) {
                if (this.game.mainMap.map[i][j].green) {
                    this.woodRate += 1;
                }
            }
        }
        if (PARAMS.RESOURCEXY){ 
            console.log("mapStartX:" + mapStartX + ", mapStartY:" +  mapStartY + ", mapEndX:" + mapEndX + ", mapEndY: " + mapEndY);
        }
        //console.log("Wood resources is: " + this.woodRate);
        //this.game.woodRate += this.woodRate;
    };
};