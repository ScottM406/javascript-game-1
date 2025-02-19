export class UI {
  constructor(game){
    this.game = game;
    this.fontSize = 40;
    this.fontWeight = 900;
    this.fontFamily = 'Copperplate';
  }
  draw(context){
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'blanchedalmond';
    context.shadowBlur = 0;
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'left';
    context.fillStyle = this.game.fontColor;
    context.fillText('Score: ' + this.game.score, 20, 50);
    context.fillText('Time: ' + ((this.game.maxTime * .001).toFixed(1) - this.game.time * 0.001).toFixed(1), 28, 90);
    //Game over/win messages
    if (this.game.gameOver && this.game.score > 50){
      context.textAlign = 'left';
      context.font = this.fontSize * 3 + 'px ' + this.fontFamily;
      context.fillText('YOU WIN!', this.game.width * 0.25, this.game.height * 0.5);
    } else if ( this.game.gameOver && this.game.score < 50){
      context.textAlign = 'left';
      context.font = this.fontSize * 3 + 'px ' + this.fontFamily;
      context.fillText('YOU LOSE!', this.game.width * 0.25, this.game.height * 0.5);
    }
    context.restore();
  }
}