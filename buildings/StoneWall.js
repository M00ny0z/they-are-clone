class StoneWall {
    constructor(game) {
        Object.assign(this, { game });
        this.health = 100;
        this.x = null;
        this.y = null;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buildings.png");
    };

    collide(other) {
        return distance(this, other) < this.radius + other.radius;
    };

    update() {
        //collision detection
        for (const ent of this.game.entities) {
            if ((ent instanceof InfectedUnit || 
                 ent instanceof InfectedHarpy || 
                 ent instanceof InfectedVenom || 
                 ent instanceof InfectedChubby) && this.collide(ent)) {
                ent.state = 3;
            }
        }
    };

    draw(ctx) {
        const width = 32;
        const height = 32;
        const startY = 0;
        const startX = 128;

        if (this.game.mouse && this.followMouse) {
            var mouse = this.game.mouse;
            ctx.drawImage(this.spritesheet, startX, startY, width, height, mouse.x * PARAMS.BLOCKWIDTH, mouse.y * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }

        if (!this.followMouse) {
            console.log(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH));
            ctx.drawImage(this.spritesheet, startX, startY, width, height, this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }
    };
};