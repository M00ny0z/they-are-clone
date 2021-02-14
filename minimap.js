class Minimap {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 4 * PARAMS.BLOCKWIDTH;
        this.height = 4 * PARAMS.BLOCKWIDTH;

    };

    update() {

    };

    //Helper function to deep copy paths
    copyPath(originalPath) {
        let copiedPath = [];
        for(let i = 0; i < originalPath.length; i++) {
            copiedPath[i] = { x : originalPath[i].x, y : originalPath[i].y }
        }
        return copiedPath;
    }

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
    };
}