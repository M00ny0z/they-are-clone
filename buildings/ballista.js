class Ballista {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ballista.png");
        this.radius = 30;
        this.visualRadius = 600;

        this.fireRate = 1;

        this.hitpoints = 100;

        this.facing = 0

        this.elapsedTime = 0;
    };

    update() {
        this.elapsedTime += this.game.clockTick;

        if (this.hitpoints <= 0) {
            this.removeFromWorld = true;
        }

        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if ((ent instanceof InfectedChubby || ent instanceof InfectedUnit || ent instanceof InfectedVenom) && canSee(this, ent) && this.elapsedTime > this.fireRate) {
                this.elapsedTime = 0;
                this.game.addEntity(new FireBolt(this.game, this.x, this.y, ent, true));
            }
        }
    };

    draw(ctx) {
        var x = this.x - 32; // 32 is the offset
        var y = this.y - 32; // 32 is the offset
        this.size = 64;

        ctx.drawImage(this.spritesheet, 132, 60, 64, 64, x, y, this.size, this.size);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Green";
            ctx.strokeRect(x, y, 64, 64);

            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.visualRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([]);
        }
    };
};
