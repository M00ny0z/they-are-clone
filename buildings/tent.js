class Tent {
    constructor(game) {
        Object.assign(this, { game });
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tent.png");
        this.followMouse = true;
        this.hitpoints = 100;
    };

    update() {

    };

    draw(ctx) {
        const width = 64;
        const height = 64;

        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            ctx.drawImage(this.spritesheet, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }

        if(!this.followMouse){
            console.log(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH));
            ctx.drawImage(this.spritesheet, (this.x - this.game.camera.cameraX) * PARAMS.BLOCKWIDTH, (this.y - this.game.camera.cameraY) * PARAMS.BLOCKWIDTH, width, height);
        }
    };
};