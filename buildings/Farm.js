class Farm extends Building {
    constructor(game) {
        const placementLogic = () => this.game.click.y < 15 && this.placeable;
        const updateLogic = () => {};
        const drawFunction = (ctx, mouse) => {
            this.calcResourceRate();
            ctx.strokeStyle = 'Purple';
            ctx.strokeRect((mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-2) * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH);
        };

        const updateFunction = () => {
            this.game.foodRate += this.foodRate;
        };

        const drawText = (ctx, mouse) => {
            ctx.font = "15px SpaceMono-Regular";
            ctx.fillStyle = "lightgreen";
            ctx.fillText("Surround the dirt tiles", (mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-1.7)*PARAMS.BLOCKWIDTH);
            ctx.fillText("to gain food", (mouse.x-2) * PARAMS.BLOCKWIDTH, (mouse.y-1.4)*PARAMS.BLOCKWIDTH);
            ctx.fillText(this.foodRate + " food", (mouse.x) * PARAMS.BLOCKWIDTH, (mouse.y+3)*PARAMS.BLOCKWIDTH);
        };

        super(game, ASSET_MANAGER.getAsset("./sprites/buildings.png"), 
              32, 32, 64, 32*4, 
              true, 1, placementLogic, updateLogic, drawFunction, updateFunction, drawText);
        this.foodRate = 0;
    };

    calcResourceRate() {
        this.foodRate = 0;
        // traverse from (-2,-2) to (+2,+2) from current (x,y) location (calculate a 5x5 grid of resources)
        const mapStartX = Math.max((this.game.mouse.x + this.game.camera.cameraX - 2), 0);
        const mapStartY = Math.max((this.game.mouse.y + this.game.camera.cameraY - 2), 0);
        const mapEndX = (mapStartX + 4) > 49 ? 49 : mapStartX + 4;
        const mapEndY = (mapStartY + 4) > 49 ? 49 : mapStartY + 4;

        for (let i = mapStartX; i <= mapEndX; i++) {
            for (let j = mapStartY; j <= mapEndY; j++) {
                if (this.game.mainMap.map[i][j].dirt) {
                    this.foodRate += 1;
                }
            }
        }
        console.log(this.foodRate);
        if (PARAMS.RESOURCEXY){ 
            console.log("mapStartX:" + mapStartX + ", mapStartY:" +  mapStartY + ", mapEndX:" + mapEndX + ", mapEndY: " + mapEndY);
        }
    }
};