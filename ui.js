export class UI {
  constructor(game){
    this.game = game;
    this.fontSize = 40;
    this.fontWeight = 900;
    this.fontFamily = 'Copperplate';
  }
  draw(context){
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'left';
    context.fillStyle = this.game.fontColor;
    context.fillText('Score: ' + this.game.score, 20, 50);
  }
}