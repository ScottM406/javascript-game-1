class Enemy {
  constructor(){
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameIntrevel = 1000/this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }
  update(deltaTime){
    //movement
    this.x -= this.speedX + this.game.speed;
    this.y +=this.speedY;
    if (this.frameTimer > this.frameIntrevel){
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    //check if enemy is off screen
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(context){
    context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
  }
}

export class FlyingEnemy extends Enemy {
  constructor(game){
    super()
    this.game = game;
    this.width = 60;
    this.height = 44;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = Math.random() + 1;
    this.speedY = 0;
    this.maxFrame = 5;
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1;
    this.image = document.getElementById('enemy-fly')
  }
  update(deltaTime){
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class GroundEnemy extends Enemy {

}

export class ClimbingEnemy extends Enemy {

}