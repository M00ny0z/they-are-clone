class CannonBall {
    constructor(game, x, y, target, heatSeeking) {
        Object.assign(this, { game, x, y, target, heatSeeking});
        this.radius = 8;
        this.smooth = false;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/cannonball.png");

        var dist = distance(this, this.target);
        this.maxSpeed = 200; // pixels per second
        
        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

        this.elapsedTime = 0;
    };

    update() {
        this.elapsedTime += this.game.clockTick;

        if (this.heatSeeking) {
            var dist = distance(this, this.target);
            this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
        }

        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;

        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if ((ent instanceof InfectedUnit || ent instanceof InfectedHarpy || ent instanceof InfectedVenom || ent instanceof InfectedChubby) && collide(this, ent)) {
                ent.hitpoints -= 100;
                this.removeFromWorld = true;
            }
        }

        if(this.target.removeFromWorld == true){
            this.removeFromWorld = true;
        }
    };

    draw(ctx) {
        let xOffset = 8;
        let yOffset = 8;
        ctx.drawImage(this.spritesheet, 94, 2, 46, 46, this.x - xOffset - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 16, 16);


        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
    };
};