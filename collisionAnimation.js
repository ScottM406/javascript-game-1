export class CollisionAnimation {
  constructor(game, x, y){
    this.game = game;
    this.image = document.getElementById('collisionAnimation');
    this.spriteWidth = 100;
    this.spriteHeight = 90;
    this.sizeModifier = Math.random() + .8;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.frameX = 0;
    this.maxFrame = 4;
    this.markedForDeletion = false;
    this.fps = Math.random() * 10 - 4;
    this.frameInerval = 1000/this.fps;
    this.frameTimer = 0;
  }
  update(deltaTime){
    this.x -= this.game.speed;
    if (this.frameTimer > this.frameInerval){
      this.frameX++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    if (this.frameX > this.maxFrame) this.markedForDeletion = true;
  }
  draw(context){
    context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}