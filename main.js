import { Player } from './player.js';
import { InputHandler } from './input.js'

window.addEventListener('load', () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext('2d');
  canvas.height = 500;
  canvas.width = 1000;

  class Game {
    constructor(width, height){
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler();
    }
    update(deltaTime){
      this.player.update(this.input.keys, deltaTime);
    }
    draw(context){
      this.player.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height)
  let lastTime = 0;

  const animate = (timeStamp) => {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update(deltaTime);
    game.draw(ctx)
    requestAnimationFrame(animate);
  }
  animate(0);
});