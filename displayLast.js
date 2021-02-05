// contains everything that needs to be displayed last (on top) of everything else in the canvas
// In this case, I'm using it for UI day and hour updating.
class DisplayLast {
  constructor(game) {
    Object.assign(this, { game });
    this.elapsedTime = 0;

  }


  update() {
    this.elapsedTime += this.game.clockTick;
    //this.updateDayAndHoursOnUI();
  }

  draw(ctx) {
    //ctx.font = PARAMS.BLOCKWIDTH / 4 + 'px "Press Start 2P"';
    //ctx.fillStyle = "White";
    //ctx.fillText(this.score, this.x + (this.score < 1000 ? PARAMS.BLOCKWIDTH / 8 : 0) - this.game.camera.x, this.y);
    /*ctx.font = "80px Arial";
    ctx.fillStyle = "White";
    ctx.fillText("Hello World", 100, 700);
    */
  }

 /* updateDayAndHoursOnUI() {
    this.ctx.font = "80px Arial";
    this.ctx.fillStyle = "White";
    this.ctx.fillText("Hello World", 100, 700);
  }*/
}
