class ControlsMenu {

    TITLE_POS = { X: 400, Y: 150 };
    BACK_POS = { X: 10, Y: 65 };
    constructor(game) {
        Object.assign(this, {game});
        this.priority = 1;
    };

    update() {
        if (this.game.mouse != null) {
            if ((this.game.mouse.offsetX >= 10 && this.game.mouse.offsetX <= 225) && (this.game.mouse.offsetY >= 20 && this.game.mouse.offsetY <= 65)
            && (this.game.click)) {
                this.game.camera.loadStartMenu();
            }
        }

    };

    draw(ctx) {

        ctx.fillStyle = "darkslategray";
        var fontsize = 150;
        ctx.font = fontsize + 'px "Charcoal"';

        ctx.fillText("CONTROLS", this.TITLE_POS.X, this.TITLE_POS.Y);

        ctx.fillStyle = "White";
        fontsize = 125;
        ctx.font = fontsize + 'px "Charcoal"';

        // add controls

        if (this.game.mouse != null) {
            this.drawGoBack(ctx);
        }

    };

    drawGoBack(ctx) {
        var fontsize = 75;
        ctx.font = fontsize + 'px "Charcoal"';
        if ((this.game.mouse.offsetX >= 10 && this.game.mouse.offsetX <= 225) && (this.game.mouse.offsetY >= 20 && this.game.mouse.offsetY <= 65)) {
            ctx.fillStyle = "White";
            ctx.fillText("Go Back", this.BACK_POS.X, this.BACK_POS.Y);
        }
        else {
            ctx.fillStyle = "Gray";
            ctx.fillText("Go Back", this.BACK_POS.X, this.BACK_POS.Y);
        }

    };
}