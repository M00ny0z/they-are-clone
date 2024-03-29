class GameOverText {
    constructor(game, win) {
        Object.assign(this, { game, win });
        this.priority = MISCELLANEOUSPRIORITY;

        if(win) {
            this.txt = "You survived.";
        } else {
            this.txt = "You failed to survive.";
        }
    }

    update() {

    }

    draw() {
        // Draw an opaque rectangle to fill the screen
        // this.game.ctx.globalAlpha = 0.3;  
        // this.game.ctx.fillRect(0, 0, PARAMS.BLOCKWIDTH * PARAMS.MAPWIDTH, PARAMS.BLOCKWIDTH * PARAMS.MAPWIDTH)
        this.game.ctx.globalAlpha = 1; 

        //Draw text
        this.game.ctx.font = "100px Serif";
        this.game.ctx.fillStyle = "red";
        this.game.ctx.textAlign = "center";
        this.game.ctx.fillText(this.txt, 
        PARAMS.CAMERAWIDTH * PARAMS.BLOCKWIDTH / 2,
        PARAMS.CAMERAHEIGHT * PARAMS.BLOCKWIDTH / 2);
        this.game.ctx.fillStyle = "black";
        this.game.ctx.textAlign = "start"; // resets text allign back to what it was before for the UI text allignment.
    }

    drawMinimap() {

    }
    
}