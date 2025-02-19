import { Player } from './player.js';
import { InputHandler } from './input.js'
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js';
import { UI } from './ui.js'


window.addEventListener('load', () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext('2d');
  canvas.height = 500;
  canvas.width = 1200;

  class Game {
    constructor(width, height){
      this.width = width;
      this.height = height;
      this.groundMargin = 80;
      this.speed = 0;
      this.maxSpeed = 1.5;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.ui = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.floatingMessages = [];
      this.maxParticles = 200;
      this.enemyTimer = 0;
      this.enemyInterval = 1500;
      this.score = 0;
      this.playerLives = 5;
      this.fontColor = 'firebrick'
      this.debug = false;
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
      this.time = 0;
      this.maxTime = 60000;
      this.gameOver = false;
    }
    update(deltaTime){
      this.time += deltaTime;
      if (this.time > this.maxTime) this.gameOver = true;
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      //spawn/despwan enemies
      if (this.enemyTimer > this.enemyInterval){
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach(enemy => {
        enemy.update(deltaTime);
        if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
      })
      //handle particles
      this.particles.forEach((particle, index) => {
        particle.update();
        if (particle.markedForDeletion) this.particles.splice(index, 1);
      });
      if (this.particles.length > this.maxParticles) {
        this.particles.length = this.maxParticles;
      }
      //handle collision animation
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime)
        if (collision.markedForDeletion) this.collisions.splice(index, 1)
      })
      // handle floating messages
      this.floatingMessages.forEach((message) => {
        message.update();
      })
      this.floatingMessages = this.floatingMessages.filter((message) => !message.markedForDeletion)
      //handle out of lives
      if (this.playerLives === 0){
        this.gameOver = true;
      }
    }
    draw(context){
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach(enemy => {
        enemy.draw(context);
      });
      this.particles.forEach((particle) => {
        particle.draw(context);
      });
      this.collisions.forEach((collision) => {
        collision.draw(context)
      })
      this.floatingMessages.forEach((message) => {
        message.draw(context);
      })
      this.ui.draw(context);
    }
    addEnemy(){
      if (this.speed > 0 && Math.random() > 0.61){
        this.enemies.push(new GroundEnemy(this))
      }
      if (this.speed > 0 && Math.random() > 0.7){
        this.enemies.push(new ClimbingEnemy(this));
      }
      this.enemies.push(new FlyingEnemy(this))
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
    if (!game.gameOver) requestAnimationFrame(animate);
  }
  animate(0);
});