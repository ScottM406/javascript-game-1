import { Jumping, Sitting, Running, Falling, Rolling, Diving, Hit } from "./playerState.js";
import { CollisionAnimation } from "./collisionAnimation.js";
import { FloatingMessage } from "./floatingMessages.js";
export class Player {
  constructor(game){
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.vy = 0;
    this.weight = 1;
    this.image = document.getElementById("player")
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame;
    this.fps = 10;
    this.frameIntreval = 1000/this.fps;
    this.frameTimer = 0;
    this.speed = 0;
    this.maxSpeed = 3;
    this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];
  }
  update(input, deltaTime){
    this.checkCollision();
    this.currentState.handleInput(input);
    //horizontal movement
    this.x += this.speed;
    if (this.x >= 1000) this.x = 1000; //limit horizontal position to increse difficulty
    if (input.includes('d') && this.currentState !== this.states[6]) this.speed = this.maxSpeed
    else if (input.includes('a') && this.currentState !== this.states[6]) this.speed = -this.maxSpeed;
    else this.speed = 0;
    //horizonal boundries
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
    //vertical movement
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
    //verticle boundries
    if (this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;
    //sprite animation
    if (this.frameTimer > this.frameIntreval){
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }
  draw(context){
    if (this.game.debug){ 
      context.strokeStyle = 'red';
      context.strokeRect(this.x, this.y, this.width, this.height);
      context.strokeStyle = 'black';
    }
    context.drawImage(this.image, this.frameX * this.width , this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
  }
  onGround(){
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }
  setState(state, speed){
    this.currentState = this.states[state]
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }
  checkCollision(){
    this.game.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ){
        enemy.markedForDeletion = true;
        this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
        if (this.currentState === this.states[4] || this.currentState === this.states[5]){
          this.game.floatingMessages.push(new FloatingMessage('POW!', enemy.x, enemy.y, enemy.x - 200, enemy.y + 20));
          this.game.floatingMessages.push(new FloatingMessage('+1', enemy.x, enemy.y, 120, 30));
          this.game.score++;
        } else {
          this.setState(6, 0)
          this.game.floatingMessages.push(new FloatingMessage('Oofta!', enemy.x, enemy.y, enemy.x + 10, enemy.y + 10));
          this.game.playerLives--;
        }
      }
    });
  }
};