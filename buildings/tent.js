class Tent extends Building {
    constructor(game) {
        const placementLogic = () => this.game.click.y < 15 && this.placeable;
        const updateLogic = () => {};
        const width = 0;
        const height = 0;
        const spriteX = 0;
        const spriteY = 0;
        const followMouse = true;

        const drawText = () => {};
        const updateFunction = () => {};
        const drawFunction = () => {};
        super(game, ASSET_MANAGER.getAsset("./sprites/tent.png"), 
        width, height, spriteX, spriteY, 
        followMouse, placementLogic, updateLogic, drawFunction, updateFunction, drawText);
    };   
    
    draw(ctx) {
        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            if (this.placeable) {
                ctx.strokeStyle = 'Green';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            } else {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            }
            ctx.drawImage(this.spritesheet, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }
 
        if(!this.followMouse){
            ctx.drawImage(this.spritesheet, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }
    };

};