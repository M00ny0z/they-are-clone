class FireBolt {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.radius = 12;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/firebolt.png");

        this.maxSpeed = 200; // pixels per second

        this.velocity = { x: 0, y: 0 };

        this.cache = [];

        this.animations = [];
        this.animations.push(new Animator(this.spritesheet, 0, 1120, 60, 30, 0, 0.2, 0, false, true));

        this.facing = 0;

        this.elapsedTime = 0;
    };

    drawAngle(ctx, angle) {
        if (angle < 0 || angle > 359) return;


        if (!this.cache[angle]) {
            let radians = angle / 360 * 2 * Math.PI;
            let offscreenCanvas = document.createElement('canvas');

            offscreenCanvas.width = 32;
            offscreenCanvas.height = 32;

            let offscreenCtx = offscreenCanvas.getContext('2d');

            offscreenCtx.save();
            offscreenCtx.translate(16, 16);
            offscreenCtx.rotate(radians);
            offscreenCtx.translate(-16, -16);
            offscreenCtx.drawImage(this.spritesheet, 0, 1120, 60, 30, 0, 0, 32, 32);
            offscreenCtx.restore();
            this.cache[angle] = offscreenCanvas;
        }

        var xOffset = 16;
        var yOffset = 16;
        ctx.drawImage(this.cache[angle], this.x - xOffset, this.y - yOffset);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(this.x - xOffset, this.y - yOffset, 32, 32);
        }
    };

    update() {
        this.elapsedTime += this.game.clockTick;
        this.velocity = { x: Math.cos(this.elapsedTime), y: Math.sin(this.elapsedTime) };

        this.facing = getFacing(this.velocity);
    };

    draw(ctx) {

        let angle = Math.atan2(this.velocity.y, this.velocity.x);
        if (angle < 0) angle += Math.PI * 2;
        let degrees = Math.floor(angle / Math.PI / 2 * 360);

        this.drawAngle(ctx, degrees);


        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
    };
};
