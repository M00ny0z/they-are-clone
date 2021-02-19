class Minimap {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 4 * PARAMS.BLOCKWIDTH;
        this.height = 4 * PARAMS.BLOCKWIDTH;

        this.cameraWidthOnMinimap = 4 * PARAMS.CAMERAWIDTH;
        this.cameraHeightOnMinimap = 4 * PARAMS.CAMERAHEIGHT;

    };

    update() {

    };

    draw(ctx) {
        if(PARAMS.DEBUG) {
            // ctx.strokeStyle = "Yellow";
            // ctx.strokeRect(this.x, this.y, this.width, this.height);
        }

        //this.game.entities[1].drawMinimap(ctx, this.x, this.y);
        for (var i = 0; i < this.game.entities.length; i++) {
            // console.log(this.game.entities[i]);
            this.game.entities[i].drawMinimap(ctx, this.x, this.y);
        }

        //Draw a rectangle on minimap to show where player is currently looking
        ctx.strokeStyle = "Blue";
        var cameraStartXOnMinimap = this.x + this.game.camera.cameraX * PARAMS.MINIMAPSCALE * PARAMS.BLOCKWIDTH;
        var cameraStartYOnMinimap = this.y + this.game.camera.cameraY * PARAMS.MINIMAPSCALE * PARAMS.BLOCKWIDTH;
        ctx.strokeRect(cameraStartXOnMinimap, cameraStartYOnMinimap, this.cameraWidthOnMinimap, this.cameraHeightOnMinimap);
    };
}