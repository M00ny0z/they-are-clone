
class Unit {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/black.png");
    }

    update() {
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, (this.x - this.game.camera.cameraX) * PARAMS.BITWIDTH, (this.y - this.game.camera.cameraY) * PARAMS.BITWIDTH, PARAMS.BITWIDTH, PARAMS.BITWIDTH);

        // draw mouse shadow
        if (this.game.mouse) {
            var mouse = this.game.mouse;
            ctx.drawImage(this.spritesheet, mouse.x * PARAMS.BITWIDTH, mouse.y * PARAMS.BITWIDTH, PARAMS.BITWIDTH, PARAMS.BITWIDTH);
        }
    }
}