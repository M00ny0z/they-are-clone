class CreditsMenu {

    TITLE_POS = { X: 470, Y: 150 };
    SEOUNGDEOK_POS = { X: 355, Y: 300 };
    GARY_POS = { X: 485, Y: 450 };
    GREG_POS = { X: 337, Y: 600 };
    MANNY_POS = { X: 425, Y: 750 };
    BACK_POS = { X: 10, Y: 65 };
    constructor(game) {
        Object.assign(this, {game});

        this.priority = MISCELLANEOUSPRIORITY;
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

        ctx.fillText("CREDITS", this.TITLE_POS.X, this.TITLE_POS.Y);

        ctx.fillStyle = "black";
        fontsize = 125;
        ctx.font = fontsize + 'px "Charcoal"';

        ctx.fillText("Seoungdeok Jeon", this.SEOUNGDEOK_POS.X, this.SEOUNGDEOK_POS.Y);
        ctx.fillText("Gary Kono", this.GARY_POS.X, this.GARY_POS.Y);
        ctx.fillText("Gregory Hablutzel", this.GREG_POS.X, this.GREG_POS.Y);
        ctx.fillText("Manny Munoz", this.MANNY_POS.X, this.MANNY_POS.Y);

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