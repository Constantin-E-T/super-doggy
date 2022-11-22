import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from "./enemies.js";
import { UI } from "./UI.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1600;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 50;
      this.speed = 0;
      this.maxSpeed = 4;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      // Enemy add
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      // end
      // particles
      this.particles = [];
      this.maxParticles = 50;
      // collisions
      this.collisions = [];
      // end
      // floatingMessages
      this.floatingMessages = [];
      // debug box
      this.debug = false;
      // end
      // score on collision
      this.score = 0;
      this.winningScore = 10;
      // font color for score
      this.fontColor = 'red';
      // lives
      this.lives = 5;
      
      // end
      // add timer for the game play
      this.time = 0;
      this.maxTime = 2000000;
      this.gameOver = false;
      // end
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }
    update(deltaTime) {
      // add timer for the game play
      this.time += deltaTime;
      if (this.time > this.maxTime) this.gameOver = true;
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      // handleEnemies
      if (this.enemyTimer > this.enemyInterval){
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach(enemy => {
        enemy.update(deltaTime);
        // remove enemy from array after passing left side of the display
        if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
      });
      // handle floatingMessages
      this.floatingMessages.forEach(message => {
        message.update();
      });
      // handle particle
      this.particles.forEach((particle, index) => {
        particle.update();
      });
      if (this.particles.length > this.maxParticles) {
        this.particles.length = this.maxParticles;
      }
      // handle collisions sprites
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime);
      });
      // floatingMessages
      this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
      this.particles = this.particles.filter(particle => !particle.markedForDeletion);
      this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
      this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);
    }
    draw(context){
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach(enemy => {
        enemy.draw(context);
      });
      this.particles.forEach(particle => {
        particle.draw(context);
      });
      this.collisions.forEach(collision => {
        collision.draw(context);
      });
      this.floatingMessages.forEach(message => {
        message.draw(context);
      });
      this.UI.draw(context);
    }
    addEnemy(){
      // ground enemy
      if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
      // end
      // climbing enemy
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
      // end
      // flying enemy
      this.enemies.push(new FlyingEnemy(this))
      // console.log(this.enemies);
      // end
    }
  }
  const game = new Game(canvas.width, canvas.height);
  // console.log(game);

  //! animate sprite by frames
  let lastTime = 0
  //! end
  function animate(timeStamp) {
    //! animate sprite by frames
    const deltaTime = timeStamp - lastTime;
    // console.log(deltaTime);
    lastTime = timeStamp;
    //! end
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update(deltaTime);
    game.draw(ctx);
    if (!game.gameOver) requestAnimationFrame(animate);
  }

  animate(0);
});
